import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
