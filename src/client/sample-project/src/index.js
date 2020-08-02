import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';
import Login from './components/Login';
import Registrar from './components/Registrar';

ReactDOM.render(

  <Router history={createBrowserHistory} >
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/Registrar" component={Registrar}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
