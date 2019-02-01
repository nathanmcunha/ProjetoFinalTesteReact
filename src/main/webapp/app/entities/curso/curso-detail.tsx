import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './curso.reducer';
import { ICurso } from 'app/shared/model/curso.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICursoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CursoDetail extends React.Component<ICursoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cursoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="projetoFinalTesteReactApp.curso.detail.title">Curso</Translate> [<b>{cursoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="projetoFinalTesteReactApp.curso.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{cursoEntity.nome}</dd>
            <dt>
              <Translate contentKey="projetoFinalTesteReactApp.curso.disciplina">Disciplina</Translate>
            </dt>
            <dd>
              {cursoEntity.disciplinas
                ? cursoEntity.disciplinas.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === cursoEntity.disciplinas.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/curso" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/curso/${cursoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ curso }: IRootState) => ({
  cursoEntity: curso.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CursoDetail);
