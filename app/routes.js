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
import Art from './components/Art';
import DailyArtMng from './components/DailyArtMng';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home}/>
    	<Redirect from="home" to="art/all" />
   		<Route path="art/:page" component={ArtList} />
   		<Route path="artDetail/:id" component={Art} />
   		<Route path="author/:style" component={AuthorList} />
   		<Route path="daily/:type" component={DailyArtMng} />
    </Route>
  </Router>
)