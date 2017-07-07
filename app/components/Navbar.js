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
		this.initEvent();
	}

    componentDidUpdate(prevProps) {
    }

    updateMenu(){
        let urlparams = location.href.split('#/');
        if(!!urlparams && urlparams.length>1){
            let urlparam = urlparams[1].split("?_k=")[0];
			if(!!urlparam){
				$(".nav .active").removeClass("active");
				$(".nav .nav_"+urlparam.replace("/","_")).addClass("active");
			}
        }
    }
	initEvent(){
        //var that = this;
		//$('.menu_li').click(function (e) {
			//e.preventDefault()
			//$(".active").removeClass("active");
			//$(this).tab('show')
            //console.log('click:')
            //that.updateContent();
		//})
		/*
		 <li className="menu_li nav_author nav_author_calligraphy"><Link to='/author/calligraphy'>美术字</Link></li>
		 <li className="menu_li nav_author nav_author_self-portrait"><Link to='/author/self-portrait'>自画像</Link></li>
		 <li className="menu_li nav_author nav_author_cloudscape"><Link to='/author/cloudscape'>云景</Link></li>
		 <li className="menu_li nav_author nav_author_sculpture"><Link to='/author/sculpture'>雕刻</Link></li>
		 */
	}
	render() {
		return (
			<div className="nav" id='nav'>
				<li className="nav_title" title="作品">作品</li>
				<li className="menu_li nav_art_all active"><Link to='/art/all'>全部</Link></li>
				<li className="nav_title" title="作者">作者</li>
				<li className="menu_li nav_author nav_author_all"><Link to='/author/all'>全部</Link></li>
				<li className="menu_li nav_author nav_author_abstract"><Link to='/author/abstract'>抽象概念</Link></li>
				<li className="menu_li nav_author nav_author_cityscape"><Link to='/author/cityscape'>城市景观</Link></li>
				<li className="menu_li nav_author nav_author_design"><Link to='/author/design'>结构</Link></li>
				<li className="menu_li nav_author nav_author_photo"><Link to='/author/photo'>照片</Link></li>
				<li className="menu_li nav_author nav_author_portrait"><Link to='/author/portrait'>人物描写</Link></li>
				<li className="menu_li nav_author nav_author_miniature"><Link to='/author/miniature'>微型画</Link></li>
				<li className="menu_li nav_author nav_author_illustration"><Link to='/author/illustration'>插图</Link></li>
				<li className="menu_li nav_author nav_author_painting"><Link to='/author/painting'>油画</Link></li>
				<li className="menu_li nav_author nav_author_landscape"><Link to='/author/landscape'>乡村风景画</Link></li>
			</div>
		);
	}
}

export default Navbar;