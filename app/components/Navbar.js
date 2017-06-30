import React from 'react';
import {
	Link
} from 'react-router';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.url = location.href.split('#')[0];
        this.updateContent = props.updateContent || function(){};
	}
	componentDidMount() {
        this.updateMenu();
		this.initEvent();
	}

    componentDidUpdate(prevProps) {
        this.updateMenu();
    }

    updateMenu(){
        let urlparams = location.href.split('#/');
        if(!!urlparams && urlparams.length>1){
            let urlparam = urlparams[1].split("?_k=")[0];
            $(".active").removeClass("active");
            $(".nav_"+urlparam.replace("/","_")).addClass("active");
        }
    }
	initEvent(){
        var that = this;
		$('.menu_li').click(function (e) {
			//e.preventDefault()
			//$(".active").removeClass("active");
			//$(this).tab('show')
            console.log('click:')
            that.updateContent();
		})
	}
	render() {
		return (
			<div className="nav" id='nav'>
				<li className="nav_title">作品</li>
				<li className="menu_li nav_art active"><Link to='/art/1'>全部</Link></li>
				<li className="nav_title">作者</li>
				<li className="menu_li nav_author_all"><Link to='/author/all'>全部</Link></li>
				<li className="menu_li nav_author_abstract"><Link to='/author/abstract'>抽象派</Link></li>
				<li className="menu_li nav_author_cityscape"><Link to='/author/cityscape'>城市风</Link></li>
			</div>
		);
	}
}

export default Navbar;