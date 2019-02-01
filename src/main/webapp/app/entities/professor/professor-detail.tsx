import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professor.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfessorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfessorDetail extends React.Component<IProfessorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { professorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="projetoFinalTesteReactApp.professor.detail.title">Professor</Translate> [<b>{professorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="projetoFinalTesteReactApp.professor.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{professorEntity.nome}</dd>
            <dt>
              <Translate contentKey="projetoFinalTesteReactApp.professor.curso">Curso</Translate>
            </dt>
            <dd>
              {professorEntity.cursos
                ? professorEntity.cursos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === professorEntity.cursos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/professor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/professor/${professorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ professor }: IRootState) => ({
  professorEntity: professor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorDetail);
