import React from 'react';
import {
    Link
} from 'react-router';

import ArtListStore from '../stores/ArtListStore';
import ArtListActions from '../actions/ArtListActions';

class ArtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArtListStore.getState();
        this.onChange = this.onChange.bind(this);
        this.limit = 15;
        this.page = 1;//props.params && props.params.page ? parseInt(props.params.page) :
        this.url = location.href.split('#')[0];
        this.stop = false;
        this.state.query = {
            artName : ''
        };
        this.masonry = null;
    }

    componentDidMount() {
        ArtListActions.getMoreArt(this.page,this.limit,this.state.query).then((data)=>this.onChange({
            data : data
        }));
        this.initEvent();

        var $container = $('#masonry');
       this.masonry =  $container.masonry({
            columnWidth: 265,
            percentPosition: true,
            itemSelector: '.box',
            gutter: 20,
            isAnimated: true
        });
    }

    componentWillUnmount() {
        ArtListStore.unlisten(this.onChange);
    }
    componentDidUpdate(prevProps) {
        var $container = $('#masonry');
        var that = this;
        if(!!this.state.data && this.state.data.data.length>0){
            $container.imagesLoaded(function() {
                that.masonry.masonry('reloadItems');
                that.masonry.masonry('layout');
                $(".spinner").remove();
                that.stop = false;
            })
        }else{
            $("#masonry").css("height","540px");
            $(".spinner").remove();
            that.stop = false;
        }
    }
    onChange(state) {
        state.query = this.state.query;
        this.setState(state);
    }
    getPage() {
        return this.props.params && this.props.params.page ? this.props.params.page : 1;
    }
    initEvent(){
        $(".art-box").on('click',"img",function(){
            let imgKey = $(this).attr("data-img");
            $("."+imgKey).viewer("show");
        });
        let that = this;
        $(window).scroll(function() {
            if($(this).scrollTop() > 500){
                $(".to-top").fadeIn("slow");
            }else{
                $(".to-top").fadeOut("slow");
            }
            if ($(this).scrollTop() + $(window).height() + 50 >= $(document).height() && $(this).scrollTop() > 100) {
                if(that.stop==false){
                    that.currentScroll = $(this).scrollTop();
                    that.stop=true;
                    $(".art-box").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                    ArtListActions.getMoreArt(++that.page,that.limit,that.state.query).then(function(data){
                        if(!!data && !!data.data && data.data.length>0){
                            that.setState({
                                data: {
                                    data: that.state.data.data.concat(data.data),
                                    query: that.state.query
                                }
                            });
                            if(that.page >= Math.ceil(data.count/that.limit)){$(".spinner").remove();
                                that.stop = true;
                            }else{
                                //$(".spinner").remove();
                                //that.stop = false;
                            }
                        }else{
                            that.page--;
                            $(".spinner").remove();
                            that.stop = false;
                        }

                    });
                }
            }
        });
    }

    searchBar(){
        //$(".searchToolBarPanel").fadeIn("slow");
    }

    toTop(){
        $("html,body").animate({scrollTop: 0}, 10);
    }

    render() {
        let that = this;
        let arts = this.state.data.data;
        let childElements = '';
        let imgList = '';
        if(!!arts && arts.length>0){
            childElements = arts.map(function(art){
                let author = art.author;
                //if(!!author) author = art.author.replace(/-/g," ");
                let date = art.date;
                if(!!date) date = art.date.split(";")[0];
                let imgKey = "img-"+art._id;
                let artUrl = "/mng/home#/artDetail/"+art._id;
                let dot = " . ";
                if(!!!art.date){
                    dot = "";
                }
                return (
                    <div key={art._id} className="box">
                        <img data-img={imgKey} src={art.smallImgUrl} title={art.title + ' - ' + author} />
                        <div className="art-img-info">
                          <p className="title">
                              <span title={art.title} ><a href={artUrl} target="_blank">{art.title}</a></span>
                          </p>
                          <p>
                              <span className="author" title={author}><a href={artUrl} target="_blank">{author}</a></span>
                              <span>{dot}</span>
                              <span className="time" title={art.date}>{date}</span></p>
                        </div>
                    </div>
                );
            });
            imgList = arts.map(function(art){
                let author = art.author;
                //if(!!author) author = art.author.replace(/-/g," ");
                let imgKey = "tt img-"+art._id;
                return (
                    <li key={art._id}>
                        <img className={imgKey} src={art.largeImgUrl} alt={art.title + ' - ' + author} />
                    </li>
                );
            });
        }else{
            childElements = <p>未查询到匹配的数据！</p>;
        }
        let searchArtName = function(){
            let artName = $("#artName").val();
            if(!!artName){
                that.state.query.artName = artName;
            }else{
                that.state.query.artName = '';
            }
            $(".tip_msg").fadeIn("slow");
            ArtListActions.getMoreArt(1, that.limit, that.state.query).then(
                    data => that.onChange({
                        data : data
                    })
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 art-box">
                        <div className="search-toobar">
                            <div className="search-button-group hidden">
                                <div className="search-button-icon" title="高级筛选" onClick={this.searchBar}></div>
                            </div>
                            <div className="input-group search-input-group">
                                <input type="text" id="artName" className="form-control" placeholder="Search for..."  />
                                  <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={searchArtName}>搜索</button>
                                  </span>
                            </div>
                        </div>
                        <div id="masonry" className="container-fluid">
                            <div>
                                {childElements}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <ul className="images">
                            {imgList}
                        </ul>
                    </div>
                </div>
                <div className="to-top" onClick={this.toTop}>
                    <span></span>
                </div>
            </div>
        );
    }
}

export default ArtList;