import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Game from './Pages/Game';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />

      </Switch>
    );
  }
}

export default Routes;

// aqui eu criei o componente pra rotas
