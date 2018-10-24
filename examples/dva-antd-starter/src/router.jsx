import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route
} from 'dva/router';
import Dynamic from 'dva/dynamic';

function RouterConfig({
  history, app
}) {
  const Index = Dynamic({
    app,
    // models: () => [
    //   import('./models/index')
    // ],
    component: () => import('./routes/index')
  });
  const Page01 = Dynamic({
    app,
    component: () => import('./routes/page01')
  });
  const Page02 = Dynamic({
    app,
    component: () => import('./routes/page02')
  });
  const Page03 = Dynamic({
    app,
    component: () => import('./routes/page03')
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/page01" component={Page01} />
        <Route exact path="/page02" component={Page02} />
        <Route exact path="/page03" component={Page03} />
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
