import React from 'react';
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import loadable from '@share/Loadable';
import { PATH } from '@share/constant/path';

const GamePage = loadable(() => import('@presentation/page/GamePage'));

// zlp-allow-no-looknfeel: routing composition only; this container renders no UI primitive.
export function AppContainer() {
  const baseName = window.__BASE_NAME__ || '/spa/v2';
  const routes = (
    <Switch>
      <Route exact path={PATH.HOME} component={GamePage} />
      <Redirect to={PATH.HOME} />
    </Switch>
  );

  if (process.env.REACT_APP_STANDALONE === 'true' ||
      window.location.protocol === 'file:') {
    return <HashRouter>{routes}</HashRouter>;
  }

  return (
    <BrowserRouter basename={baseName}>
      {routes}
    </BrowserRouter>
  );
}
