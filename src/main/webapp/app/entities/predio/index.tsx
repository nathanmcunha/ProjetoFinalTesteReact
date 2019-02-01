import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Predio from './predio';
import PredioDetail from './predio-detail';
import PredioUpdate from './predio-update';
import PredioDeleteDialog from './predio-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PredioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PredioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PredioDetail} />
      <ErrorBoundaryRoute path={match.url} component={Predio} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PredioDeleteDialog} />
  </>
);

export default Routes;
