import React from 'react';
import {
	Link
} from 'react-router';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		//this.url = location.href.split('#')[0];
	}
	componentDidMount() {
		this.initEvent()
	}
	initEvent(){
		$('#nav li').click(function (e) {
			//e.preventDefault()
			//$(".active").removeClass("active");
			//$(this).tab('show')
		})
	}
	render() {
		return (
			<div className="nav " id='nav'>
				<li ><Link to='/art/1'>作品</Link></li>
				<li ><Link to='/author/1'>作者</Link></li>
			</div>
		);
	}
}

export default Navbar;