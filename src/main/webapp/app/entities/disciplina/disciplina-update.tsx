import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISala } from 'app/shared/model/sala.model';
import { getEntities as getSalas } from 'app/entities/sala/sala.reducer';
import { ICurso } from 'app/shared/model/curso.model';
import { getEntities as getCursos } from 'app/entities/curso/curso.reducer';
import { getEntity, updateEntity, createEntity, reset } from './disciplina.reducer';
import { IDisciplina } from 'app/shared/model/disciplina.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDisciplinaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDisciplinaUpdateState {
  isNew: boolean;
  salaId: string;
  cursoId: string;
}

export class DisciplinaUpdate extends React.Component<IDisciplinaUpdateProps, IDisciplinaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      salaId: '0',
      cursoId: '0',
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

    this.props.getSalas();
    this.props.getCursos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { disciplinaEntity } = this.props;
      const entity = {
        ...disciplinaEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/disciplina');
  };

  render() {
    const { disciplinaEntity, salas, cursos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="projetoFinalTesteReactApp.disciplina.home.createOrEditLabel">
              <Translate contentKey="projetoFinalTesteReactApp.disciplina.home.createOrEditLabel">Create or edit a Disciplina</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : disciplinaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="disciplina-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="nome">
                    <Translate contentKey="projetoFinalTesteReactApp.disciplina.nome">Nome</Translate>
                  </Label>
                  <AvField id="disciplina-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <Label id="turnoLabel">
                    <Translate contentKey="projetoFinalTesteReactApp.disciplina.turno">Turno</Translate>
                  </Label>
                  <AvInput
                    id="disciplina-turno"
                    type="select"
                    className="form-control"
                    name="turno"
                    value={(!isNew && disciplinaEntity.turno) || 'MANHA'}
                  >
                    <option value="MANHA">
                      <Translate contentKey="projetoFinalTesteReactApp.Turno.MANHA" />
                    </option>
                    <option value="NOITE">
                      <Translate contentKey="projetoFinalTesteReactApp.Turno.NOITE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sala.id">
                    <Translate contentKey="projetoFinalTesteReactApp.disciplina.sala">Sala</Translate>
                  </Label>
                  <AvInput id="disciplina-sala" type="select" className="form-control" name="sala.id">
                    <option value="" key="0" />
                    {salas
                      ? salas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/disciplina" replace color="info">
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
  salas: storeState.sala.entities,
  cursos: storeState.curso.entities,
  disciplinaEntity: storeState.disciplina.entity,
  loading: storeState.disciplina.loading,
  updating: storeState.disciplina.updating,
  updateSuccess: storeState.disciplina.updateSuccess
});

const mapDispatchToProps = {
  getSalas,
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
)(DisciplinaUpdate);
