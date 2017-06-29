import React from 'react';
class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<a href="/#/home" className="header-logo"></a>
							<div className="header-login">admin</div>
							<div className="header-logout"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class Copyright extends React.Component {
	render() {
		return (
			<div className="copyright">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<span><a href="http://www.limaodata.com/">Copyright © 七只狸猫·荒野猎人团队</a></span> |
							<span><a href="http://www.miibeian.gov.cn/" target="_blank"> 苏ICP备14030752号</a></span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class App extends React.Component {

	componentDidMount() {
	}
	render() {
		return (
			<div className="container">
				<Header />
				<div className="main">
					{this.props.children}
				</div>
        		<Copyright />
     		</div>
		);
	}
}
export default App;