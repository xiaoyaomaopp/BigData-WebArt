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
        this.page = 1;
        this.limit = 5;
        this.stop = true;
        this.autoLoadCount = 3;
    }

    componentDidMount() {
        AuthorStore.listen(this.onChange);
        AuthorListActions.getAuthor(this.page, this.limit);
        var that = this;
        $(window).scroll(function() {
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if ($(this).scrollTop() + $(window).height() + 50 >= $(document).height() && $(this).scrollTop() > 100) {
                if(that.stop==true){
                    that.stop=false;
                    //加载提示信息
                    $(".pc-center-box").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                        AuthorListActions.getMoreAuthor(++that.page, that.limit).then(
                            data => that.addNewArticle(data.data)
                    );
                }
            }
        });
        $(".pc-center-box").on('click','.pc-click-get-more',function(){
            if(that.stop==true){
                that.stop=false;
                $(".pc-click-get-more").remove();
                //加载提示信息
                $(".pc-center-box").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                    AuthorListActions.getMoreAuthor(++that.page, that.limit).then(
                        data => that.addNewArticle(data.data)
                );
            }
        });
    }

    componentWillUnmount() {
        AuthorStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
    }

    onChange(state) {
        this.setState(state);
    }

    addNewArticle(news){
        $(".spinner").remove();
        this.setState({
            data:{
                data:this.state.data.data.concat(news)
            }});
        if(this.autoLoadCount>0){
            this.autoLoadCount--;
        }else{
            $(window).unbind('scroll');
            $(".pc-center-box").append("<div class='pc-click-get-more'><p>点击加载更多</p></div>");
        }
        this.stop=true;
    }

    render() {
        let author_data = (this.state.data);
        let author_list = "";
        if(author_data && author_data.data){
            author_list = author_data.data.map(function(author){
                return <div className="authorList_cart">
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
                        <Navbar />
                    </div>
                    <div className="col-sm-10 pc-center-box">
                        {author_list}
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorList;