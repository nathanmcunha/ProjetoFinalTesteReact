import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPredio } from 'app/shared/model/predio.model';
import { getEntities as getPredios } from 'app/entities/predio/predio.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sala.reducer';
import { ISala } from 'app/shared/model/sala.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISalaUpdateState {
  isNew: boolean;
  predioId: string;
}

export class SalaUpdate extends React.Component<ISalaUpdateProps, ISalaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      predioId: '0',
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

    this.props.getPredios();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { salaEntity } = this.props;
      const entity = {
        ...salaEntity,
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
    this.props.history.push('/entity/sala');
  };

  render() {
    const { salaEntity, predios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="projetoFinalTesteReactApp.sala.home.createOrEditLabel">
              <Translate contentKey="projetoFinalTesteReactApp.sala.home.createOrEditLabel">Create or edit a Sala</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : salaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="sala-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numeroLabel" for="numero">
                    <Translate contentKey="projetoFinalTesteReactApp.sala.numero">Numero</Translate>
                  </Label>
                  <AvField id="sala-numero" type="text" name="numero" />
                </AvGroup>
                <AvGroup>
                  <Label for="predio.id">
                    <Translate contentKey="projetoFinalTesteReactApp.sala.predio">Predio</Translate>
                  </Label>
                  <AvInput id="sala-predio" type="select" className="form-control" name="predio.id">
                    <option value="" key="0" />
                    {predios
                      ? predios.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/sala" replace color="info">
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
  predios: storeState.predio.entities,
  salaEntity: storeState.sala.entity,
  loading: storeState.sala.loading,
  updating: storeState.sala.updating,
  updateSuccess: storeState.sala.updateSuccess
});

const mapDispatchToProps = {
  getPredios,
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
)(SalaUpdate);
