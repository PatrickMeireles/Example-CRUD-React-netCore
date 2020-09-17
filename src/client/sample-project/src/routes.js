import React, { Fragment } from 'react';
import { history } from './helpers';
import { BrowserRouter as Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';
import Login from './components/Login';
import Registrar from './components/Registrar';
import Home from './components/Home';
import { store } from './store';
import { Provider } from 'react-redux';
import { isAuthenticated } from './api/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
    <Provider store={store} >
        <Router history={history} >
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/Registrar" component={Registrar} />
                <PrivateRoute path='/home' component={Home} />
                <Route path='*' component={() => <h1>Page not found</h1>} />
            </Switch>
        </Router>
    </Provider>
);

export default Routes;