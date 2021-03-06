import React from 'react';
import {
    Link
    } from 'react-router';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.state.user = {};
    }

    componentDidMount() {
        var that = this;
        UserActions.getCuurentUser().then(function(user){
            if(!!user){
                that.setState({
                    'user' : user
                });
                $(".header-logout").click(function(){
                    $('#loginOutModal').modal('show');
                })
            }else{
                $(".header-logout").attr("title","请登录");
                $(".header-logout").text(" 请登录 ");
                $(".header-logout").click(function(){
                    window.location.href = "/mng/logout";
                });
            }
        });
        $("#loginOut").click(function(){
            $('#loginOutModal').modal('hide');
            window.location.href = "/mng/logout";
        });
        this.updateMenu();
    }

    componentDidUpdate(prevProps) {
        this.updateMenu();
    }

    updateMenu(){
        let urlparams = location.href.split('#/');
        if(!!urlparams && urlparams.length>1){
            let urlparam = urlparams[1].split("?_k=")[0];
            if(!!urlparam){
                $(".header-menu .hactive").removeClass("hactive");
                $(".header-menu .nav_"+urlparam.replace("/","_")).addClass("hactive");
            }else{
                $(".header-menu .nav_art_all").addClass("hactive");
            }
        }
    }

	render() {
        function model(id,title,text,comfirm){
            return (
                <div className="modal fade" id={id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 className="modal-title" id="myModalLabel">{title}</h4>
                </div>
                <div className="modal-body">{text}</div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" id={comfirm}>确认</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                </div>
                </div>
                </div>
                </div>
            )
        }
		return (
			<div className="header">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<a href="/#/home" className="header-logo"></a>
                            <div className="header-logout" title="退出">退出</div>
							<div className="header-login" title={this.state.user.account}>您好，{this.state.user.account}</div>
						    <div className="header-menu">
                                <ul>
                                    <li className="nav_art_all">
                                        <Link to='/art/all'>作品</Link>
                                    </li>
                                    <li className="nav_author_all">
                                        <Link to='/author/all'>作者</Link>
                                    </li>
                                    <li className="nav_daily_art">
                                        <Link to='/daily/art'>每日艺术</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
					</div>
				</div>
                {model('loginOutModal','确认','确认要退出登录？','loginOut')}
			</div>
		);
	}
}
class HeaderTop extends React.Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.state.user = {};
    }

    componentDidMount() {
        var that = this;
        UserActions.getCuurentUser().then(function(user){
            if(!!user){
                that.setState({
                    'user' : user
                });
                $(".loginOut").click(function(){
                    $('#loginOutModal').modal('show');
                })
            }else{
                $(".loginOut").attr("title","请登录");
                $(".loginOut").text(" 请登录 ");
                $(".loginOut").click(function(){
                    window.location.href = "/mng/logout";
                });
            }
        });
        $("#loginOut").click(function(){
            $('#myModal').modal('hide');
            window.location.href = "/mng/logout";
        });
    }

    render() {
        function model(id,title,text,comfirm){
            return (
                <div className="modal fade" id={id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 className="modal-title" id="myModalLabel">{title}</h4>
                </div>
                <div className="modal-body">{text}</div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" id={comfirm}>确认</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                </div>
                </div>
                </div>
                </div>
            )
        }
        return (
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <a href="/#/home">七只狸猫·荒野猎人团队</a>
                        </div>
                        <div className="col-sm-4 header-top-user">
                            <span>您好！欢迎来到七只狸猫·艺术管理平台！</span>
                            <span className="userName" title={this.state.user.account}>{this.state.user.account}</span>
                            <span> | </span>
                            <span className="loginOut" title="退出登录"> 退出 </span>
                        </div>
                    </div>
                </div>
                {model('loginOutModal','确认','确认要退出登录？','loginOut')}
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