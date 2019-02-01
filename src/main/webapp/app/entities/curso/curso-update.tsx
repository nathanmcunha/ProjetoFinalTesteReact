import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDisciplina } from 'app/shared/model/disciplina.model';
import { getEntities as getDisciplinas } from 'app/entities/disciplina/disciplina.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
import { getEntities as getProfessors } from 'app/entities/professor/professor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './curso.reducer';
import { ICurso } from 'app/shared/model/curso.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICursoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICursoUpdateState {
  isNew: boolean;
  idsdisciplina: any[];
  professorId: string;
}

export class CursoUpdate extends React.Component<ICursoUpdateProps, ICursoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsdisciplina: [],
      professorId: '0',
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

    this.props.getDisciplinas();
    this.props.getProfessors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { cursoEntity } = this.props;
      const entity = {
        ...cursoEntity,
        ...values,
        disciplinas: mapIdList(values.disciplinas)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/curso');
  };

  render() {
    const { cursoEntity, disciplinas, professors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="projetoFinalTesteReactApp.curso.home.createOrEditLabel">
              <Translate contentKey="projetoFinalTesteReactApp.curso.home.createOrEditLabel">Create or edit a Curso</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cursoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="curso-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="nome">
                    <Translate contentKey="projetoFinalTesteReactApp.curso.nome">Nome</Translate>
                  </Label>
                  <AvField id="curso-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <Label for="disciplinas">
                    <Translate contentKey="projetoFinalTesteReactApp.curso.disciplina">Disciplina</Translate>
                  </Label>
                  <AvInput
                    id="curso-disciplina"
                    type="select"
                    multiple
                    className="form-control"
                    name="disciplinas"
                    value={cursoEntity.disciplinas && cursoEntity.disciplinas.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {disciplinas
                      ? disciplinas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/curso" replace color="info">
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
  disciplinas: storeState.disciplina.entities,
  professors: storeState.professor.entities,
  cursoEntity: storeState.curso.entity,
  loading: storeState.curso.loading,
  updating: storeState.curso.updating,
  updateSuccess: storeState.curso.updateSuccess
});

const mapDispatchToProps = {
  getDisciplinas,
  getProfessors,
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
)(CursoUpdate);
