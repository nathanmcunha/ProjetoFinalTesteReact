import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Professor from './professor';
import Curso from './curso';
import Disciplina from './disciplina';
import Sala from './sala';
import Predio from './predio';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/professor`} component={Professor} />
      <ErrorBoundaryRoute path={`${match.url}/curso`} component={Curso} />
      <ErrorBoundaryRoute path={`${match.url}/disciplina`} component={Disciplina} />
      <ErrorBoundaryRoute path={`${match.url}/sala`} component={Sala} />
      <ErrorBoundaryRoute path={`${match.url}/predio`} component={Predio} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
