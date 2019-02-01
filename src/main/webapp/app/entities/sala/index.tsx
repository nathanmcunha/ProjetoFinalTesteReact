import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Sala from './sala';
import SalaDetail from './sala-detail';
import SalaUpdate from './sala-update';
import SalaDeleteDialog from './sala-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SalaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SalaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SalaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Sala} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SalaDeleteDialog} />
  </>
);

export default Routes;
