import React from 'react';
import {
	Link
} from 'react-router';
import ArtList from './ArtList';

class Home extends React.Component {
	render() {
		return (
			<ArtList/>
		);
	}
}

export default Home;