import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICurso } from 'app/shared/model/curso.model';
import { getEntities as getCursos } from 'app/entities/curso/curso.reducer';
import { getEntity, updateEntity, createEntity, reset } from './professor.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfessorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfessorUpdateState {
  isNew: boolean;
  idscurso: any[];
}

export class ProfessorUpdate extends React.Component<IProfessorUpdateProps, IProfessorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscurso: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCursos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { professorEntity } = this.props;
      const entity = {
        ...professorEntity,
        ...values,
        cursos: mapIdList(values.cursos)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/professor');
  };

  render() {
    const { professorEntity, cursos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="projetoFinalTesteReactApp.professor.home.createOrEditLabel">
              <Translate contentKey="projetoFinalTesteReactApp.professor.home.createOrEditLabel">Create or edit a Professor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : professorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="professor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="nome">
                    <Translate contentKey="projetoFinalTesteReactApp.professor.nome">Nome</Translate>
                  </Label>
                  <AvField id="professor-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <Label for="cursos">
                    <Translate contentKey="projetoFinalTesteReactApp.professor.curso">Curso</Translate>
                  </Label>
                  <AvInput
                    id="professor-curso"
                    type="select"
                    multiple
                    className="form-control"
                    name="cursos"
                    value={professorEntity.cursos && professorEntity.cursos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {cursos
                      ? cursos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/professor" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  cursos: storeState.curso.entities,
  professorEntity: storeState.professor.entity,
  loading: storeState.professor.loading,
  updating: storeState.professor.updating,
  updateSuccess: storeState.professor.updateSuccess
});

const mapDispatchToProps = {
  getCursos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorUpdate);
