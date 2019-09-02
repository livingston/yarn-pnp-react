import React from 'react';
import { hot } from 'react-hot-loader/root'; // eslint-disable-line import/no-extraneous-dependencies
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom';

import List from './List';

function App() {
  return (<Router>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">Users</Link></li>
      </ul>
    </nav>
    <section>
      <Switch>
        <Route path="/list" component={List} />
      </Switch>
    </section>
  </Router>);
}

export default hot(App);
