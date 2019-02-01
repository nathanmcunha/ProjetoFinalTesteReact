import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './disciplina.reducer';
import { IDisciplina } from 'app/shared/model/disciplina.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDisciplinaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DisciplinaDetail extends React.Component<IDisciplinaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { disciplinaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="projetoFinalTesteReactApp.disciplina.detail.title">Disciplina</Translate> [<b>{disciplinaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="projetoFinalTesteReactApp.disciplina.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{disciplinaEntity.nome}</dd>
            <dt>
              <span id="turno">
                <Translate contentKey="projetoFinalTesteReactApp.disciplina.turno">Turno</Translate>
              </span>
            </dt>
            <dd>{disciplinaEntity.turno}</dd>
            <dt>
              <Translate contentKey="projetoFinalTesteReactApp.disciplina.sala">Sala</Translate>
            </dt>
            <dd>{disciplinaEntity.sala ? disciplinaEntity.sala.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/disciplina" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/disciplina/${disciplinaEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ disciplina }: IRootState) => ({
  disciplinaEntity: disciplina.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisciplinaDetail);
