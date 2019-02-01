import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Disciplina from './disciplina';
import DisciplinaDetail from './disciplina-detail';
import DisciplinaUpdate from './disciplina-update';
import DisciplinaDeleteDialog from './disciplina-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DisciplinaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DisciplinaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DisciplinaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Disciplina} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DisciplinaDeleteDialog} />
  </>
);

export default Routes;
