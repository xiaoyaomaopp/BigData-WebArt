import React from 'react';
class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<a href="/#/home" className="header-logo"></a>
							<div className="header-login"></div>
							<div className="header-logout"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
class HeaderTop extends React.Component {
    render() {
        return (
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <a href="/#/home">七只狸猫·荒野猎人团队</a>
                        </div>
                        <div className="col-sm-4 header-top-user">
                            <span>您好！欢迎来到七只狸猫·艺术管理平台！</span>
                            <span className="userName" title="admin">admin</span>
                            <span> | </span>
                            <span className="loginOut" title="退出登录"> 退出 </span>
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
			<div className="container0">
				<HeaderTop />
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