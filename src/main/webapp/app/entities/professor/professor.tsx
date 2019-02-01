import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './professor.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfessorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Professor extends React.Component<IProfessorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { professorList, match } = this.props;
    return (
      <div>
        <h2 id="professor-heading">
          <Translate contentKey="projetoFinalTesteReactApp.professor.home.title">Professors</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="projetoFinalTesteReactApp.professor.home.createLabel">Create new Professor</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="projetoFinalTesteReactApp.professor.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="projetoFinalTesteReactApp.professor.curso">Curso</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {professorList.map((professor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${professor.id}`} color="link" size="sm">
                      {professor.id}
                    </Button>
                  </td>
                  <td>{professor.nome}</td>
                  <td>
                    {professor.cursos
                      ? professor.cursos.map((val, j) => (
                          <span key={j}>
                            <Link to={`curso/${val.id}`}>{val.id}</Link>
                            {j === professor.cursos.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${professor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${professor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${professor.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ professor }: IRootState) => ({
  professorList: professor.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Professor);
