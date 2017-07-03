import React from 'react';
import {
	Link
} from 'react-router';
import AuthorList from './AuthorList';

class Home extends React.Component {
	render() {
		return (
			<AuthorList/>
		);
	}
}

export default Home;