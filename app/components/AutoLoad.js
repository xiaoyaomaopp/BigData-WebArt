import alt from '../alt';
import React from 'react';
import {
    Link
    } from 'react-router';


class AutoLoad extends React.Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.limit = 5;
        this.stop = true;
        this.autoLoadCount = 5;
        this.loadOver = false;//最后一页时加载
    }
    init(node, page, limit, autoCount, callbackfunc) {
        if(!!page) this.page = page;
        if(!!limit) this.limit = limit;
        if(!!autoCount) this.autoLoadCount = autoCount;
        var that = this;
        $(window).scroll(function() {
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if ($(this).scrollTop() + $(window).height() + 50 >= $(document).height() && $(this).scrollTop() > 100) {
                if(that.stop==true){
                    that.stop=false;
                    //加载提示信息
                    $(node).append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                    callbackfunc(++that.page, that.limit);
                }
            }
        });
        $(node).on('click','.pc-click-get-more',function(){
            if(that.stop==true){
                that.stop=false;
                $(".pc-click-get-more").remove();
                //加载提示信息
                $(node).append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                callbackfunc(++that.page, that.limit);
            }
        });
    }

    loadEnd(){
        $(".spinner").remove();
        if(this.autoLoadCount>0){
            this.autoLoadCount--;
        }else if(this.loadOver){
            $(window).unbind('scroll');
        }else{
            $(window).unbind('scroll');
            $(".pc-center-box").append("<div class='pc-click-get-more'><p>点击加载更多</p></div>");
        }
        this.stop=true;
    }

    setLoadEnd(){
        this.loadOver = true;
    }
}

export default alt.createActions(AutoLoad);