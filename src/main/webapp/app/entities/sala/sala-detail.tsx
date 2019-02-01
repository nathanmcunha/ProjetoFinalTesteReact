import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sala.reducer';
import { ISala } from 'app/shared/model/sala.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SalaDetail extends React.Component<ISalaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { salaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="projetoFinalTesteReactApp.sala.detail.title">Sala</Translate> [<b>{salaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="numero">
                <Translate contentKey="projetoFinalTesteReactApp.sala.numero">Numero</Translate>
              </span>
            </dt>
            <dd>{salaEntity.numero}</dd>
            <dt>
              <Translate contentKey="projetoFinalTesteReactApp.sala.predio">Predio</Translate>
            </dt>
            <dd>{salaEntity.predio ? salaEntity.predio.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/sala" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/sala/${salaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ sala }: IRootState) => ({
  salaEntity: sala.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalaDetail);
