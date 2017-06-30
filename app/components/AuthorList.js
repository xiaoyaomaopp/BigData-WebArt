import React from 'react';
import {
    Link
    } from 'react-router';

import AuthorStore from '../stores/AuthorStore';
import AuthorListActions from '../actions/AuthorListActions';
import Navbar from './Navbar';

class AuthorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = AuthorStore.getState();
        this.onChange = this.onChange.bind(this);
        this.styleQuery = 'all';
        this.page = 1;
        this.limit = 4;
        this.autoLoadCount = 5;
        this.stop = false;
        this.state.query = {
            authorName : ''
        };
        if(!!props.params.style && 'all'!=props.params.style){
            this.state.query.genre = props.params.style;
        }
        console.log(this.state.query);
    }

    componentDidMount() {
        //$(".active").removeClass("active");
        //$(".nav_author").addClass("active");
        let boxHeight = $(window).height()- 70 - 57 - 60 - 24 -20-23;
        $(".pc-center-box").css("height",boxHeight);
        AuthorStore.listen(this.onChange);
        this.setInitEvent();
    }

    setInitEvent(){
        var that = this;
        console.log(that.props.style)
        AuthorListActions.getMoreAuthor(that.page, that.limit, that.state.query).then(
            function(data){
                that.setState({
                    data:{
                        data:data.data
                    }});
                $(".pc-center-box").mCustomScrollbar({
                    axis:"y",
                    callbacks:{
                        onScroll:function(){
                            let scrollIndex = this.mcs.draggerTop+$(".mCSB_dragger_bar").height();
                            let contentHeight = $(".pc-center-box").height();
                            if(!that.stop && scrollIndex + 80 - contentHeight > 0){
                                that.stop = true;
                                $(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                $(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewArticle(data.data)
                                );
                            }
                        },
                        onTotalScroll:function(){
                            if(!that.stop){
                                that.stop = true;
                                $(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                $(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewArticle(data.data)
                                );
                            }
                        }
                    }

                })
            }
        );
    }

    setMenuBindEvent(){
        alert("切换加载正在调试中，暂时不可用使用，数据可以通过F5进行刷新");
        return;
        var that = this;
        console.log(that);
        AuthorListActions.getMoreAuthor(that.page, that.limit, that.state.query).then(
            function(data){
                that.setState({
                    data:{
                        data:data.data
                    }});
                $(".pc-center-box").mCustomScrollbar({
                    axis:"y",
                    callbacks:{
                        onScroll:function(){
                            let scrollIndex = this.mcs.draggerTop+$(".mCSB_dragger_bar").height();
                            let contentHeight = $(".pc-center-box").height();
                            if(!that.stop && scrollIndex + 80 - contentHeight > 0){
                                that.stop = true;
                                $(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                $(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewArticle(data.data)
                                );
                            }
                        },
                        onTotalScroll:function(){
                            if(!that.stop){
                                that.stop = true;
                                $(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                $(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewArticle(data.data)
                                );
                            }
                        }
                    }

                })
            }
        );
    }


    componentWillUnmount() {
        AuthorStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        this.styleQuery = prevProps.params.style;
        console.log(this.styleQuery);
        if(!!this.styleQuery && 'all'!=this.styleQuery){
            this.state.query.genre = this.styleQuery;
            //this.onChange(newState);
            console.log('ddd:'+this.state.query.genre);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    addNewArticle(news){
        this.setState({
            data:{
                data:this.state.data.data.concat(news)
            }});
        $(".spinner").remove();
        $(".pc-center-box").mCustomScrollbar("update");
        this.stop = false;
    }

    setNewArticle(news){
        this.setState({
            data:{
                data:news
            }});
        $(".spinner").remove();
        $(".pc-center-box").mCustomScrollbar("update");
        this.stop = false;
    }

    render() {
        var that = this;
        let searchAuthorName = function(){
            let authorName = $("#authorName").val();
            if(!!authorName){
                that.state.query.authorName = authorName;
            }else{
                that.state.query.authorName = '';
            }
            AuthorListActions.getMoreAuthor(1, that.limit, that.state.query).then(
                data => that.setNewArticle(data.data)
            );
        }
        let author_data = (this.state.data);
        let author_list = "";
        if(author_data && author_data.data){
            author_list = author_data.data.map(function(author){
                return <div className="authorList_cart" key={author._id}>
                    <div className="authorList_cart-left">
                        <img className="authorList_cart-img"
                             src={author.portraitUrl}></img>
                    </div>
                    <div className="authorList_cart-right">
                        <div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">名字：</span>
                                <span className="authorList_cart-name" title={author.name}>{author.name}</span>
                            </div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">国籍：</span>
                                <span className="authorList_cart-nationality" title={author.nationality}>{author.nationality}</span>
                            </div>
                        </div>
                        <div>
                            <div className="authorList_cart-right_item authorList_cart-right_item-born">
                                <span className="authorList_cart-title">出生日期/地点：</span>
                                <span className="authorList_cart-born" title={author.born}>{author.born}</span>
                            </div>
                            <div className="authorList_cart-right_item authorList_cart-right_item-field">
                                <span className="authorList_cart-title">领域：</span>
                                <span className="authorList_cart-field" title={author.field}>{author.field}</span>
                            </div>
                        </div>
                        <div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">风格：</span>
                                <span className="authorList_cart-genre" title={author.genre}>{author.genre}</span>
                            </div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">导师：</span>
                                <span className="authorList_cart-teachers" title={author.teachers}>{author.teachers}</span>
                            </div>
                        </div>

                    </div>
                </div>
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Navbar updateContent={this.setMenuBindEvent} page={this.page}/>
                    </div>
                    <div className="col-sm-10 content-box">
                    <div className="search-toobar">
                        <div className="input-group search-input-group">
                            <input type="text" id="authorName" className="form-control" placeholder="Search for..."  />
                              <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={searchAuthorName}>搜索</button>
                              </span>
                        </div>
                    </div>
                        <div className="pc-center-box">
                            <div className="author-list">
                                {author_list}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorList;