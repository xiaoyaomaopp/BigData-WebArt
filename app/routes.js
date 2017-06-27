import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
  Link,
  Redirect
} from 'react-router';

import App from './components/App';
import Home from './components/Home';
import AuthorList from './components/AuthorList';
import ArtList from './components/ArtList';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home}/>
    	<Redirect from="home" to="art/1" />
   		<Route path="art/:page" component={ArtList} />
   		<Route path="author/:page" component={AuthorList} />
    </Route>
  </Router>
)