import React from 'react';
import {
    Link
    } from 'react-router';

import AuthorStore from '../stores/AuthorStore';
import AuthorListActions from '../actions/AuthorListActions';
import ArtListActions from '../actions/ArtListActions';
import Navbar from './Navbar';
import AuthorEditDialog from './AuthorEditDialog';

class AuthorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = AuthorStore.getState();
        this.onChange = this.onChange.bind(this);
        this.page = 1;
        this.limit = 7;
        this.autoLoadCount = 5;
        this.stop = false;
        this.state.query = {
            authorName : ''
        };
        if(!!props.params && !!props.params.style && 'all'!=props.params.style){
            this.state.query.genre = props.params.style;
        }
        this.showEditAuthorDialog = this.showEditAuthorDialog.bind(this);
        this.pageArtPicWindow = this.pageArtPicWindow.bind(this);
    }

    componentDidMount() {
        let boxHeight = $(window).height()- 70 - 57 - 60 - 24 -20-23;
        $(".pc-center-box").css("height",boxHeight);
        AuthorStore.listen(this.onChange);
        this.setInitEvent();
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps.params.style && 'all'!=nextProps.params.style){
            this.state.query.genre = nextProps.params.style;
        }else{
            this.state.query.genre = '';
        }
        this.page = 1;
        this.setMenuBindEvent();
    }

    setInitEvent(){
        var that = this;
        $(".tip_msg").fadeIn();
        AuthorListActions.getMoreAuthor(that.page, that.limit, that.state.query).then(
            function(data){
                that.setState({
                    data:{
                        data:data.data
                    }
                });
                $(".pc-center-box").mCustomScrollbar({
                    axis:"y",
                    callbacks:{
                        onScroll:function(){
                            let scrollIndex = this.mcs.draggerTop+$(".mCSB_dragger_bar").height();
                            let contentHeight = $(".pc-center-box").height();
                            if(!that.stop && scrollIndex + 80 - contentHeight > 0){
                                that.stop = true;
                                $(".tip_msg").fadeIn();
                                //$(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                // $(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewAuthor(data.data)
                                );
                            }
                        },
                        onTotalScroll:function(){
                            if(!that.stop){
                                that.stop = true;
                                $(".tip_msg").fadeIn();
                                //$(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                //$(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewAuthor(data.data)
                                );
                            }
                        }
                    }

                });
                $(".tip_msg").fadeOut("slow");
            }
        );
        $("#updateAuthor").click(function(){
            let newAuthor = {};
            $("#editAuthorModal .form-control").each(function(){
                newAuthor[$(this).attr("name")] = $(this).val();
            });
            console.log("save:"+JSON.stringify(newAuthor));
            let authorJson = $(".oldAuthor").val();
            let editAuthor = {};
            if(!!authorJson){
                editAuthor = JSON.parse(authorJson);
            }
            if(!!newAuthor && isObjectValueEqual(newAuthor,editAuthor)){
                AuthorListActions.updateAuthor(newAuthor).then(function(data){
                    if(!!data){
                        $(".modal-message").text("提示：保存成功！");
                        let sourceList = that.state.data.data;
                        if(!!sourceList && sourceList.length>0){
                            for(var i=0;i<sourceList.length;i++){
                                if(newAuthor._id === sourceList[i]._id){
                                    setObjectValueEqual(newAuthor,sourceList[i]);
                                    break;
                                }
                            }
                            that.setState({
                                data : {
                                    data : sourceList
                                }
                            });
                        }
                        $("#editAuthorModal").modal("hide");
                    }else{
                        $(".modal-message").text("提示：保存失败！");
                    }
                });
            }else{
                $(".modal-message").text("提示：请先修改内容后，再进行保存操作！");
            }
        });
        function isObjectValueEqual(a, b) {
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            var count = 0;
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if ((a[propName] === b[propName])
                    || (!!!a[propName] && !!!b[propName])) {
                    count++;
                }
            }
            if(count==aProps.length){
                return false;
            }else{
                return true;
            }
        }
        function setObjectValueEqual(a, b) {
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                b[propName] = a[propName];
            }
        }
        $("#editAuthorModal").on('click',".art-box-right",function(){
            if(that.art.group < that.art.maxGroup) {
                that.state.art = that.pageArtPicWindow(++that.art.group);
                that.setState(that.state);
            }
        });
        $("#editAuthorModal").on('click',".art-box-left",function(){
            if(that.art.group > 1){
                that.state.art = that.pageArtPicWindow(--that.art.group);
                that.setState(that.state);
            }
        });
    }

    setMenuBindEvent(){
        var that = this;
        $(".tip_msg").fadeIn();
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
                                $(".tip_msg").fadeIn();
                                //$(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                //$(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewAuthor(data.data)
                                );
                            }
                        },
                        onTotalScroll:function(){
                            if(!that.stop){
                                that.stop = true;
                                $(".tip_msg").fadeIn();
                                //$(".author-list").append("<div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>");
                                //$(".pc-center-box").mCustomScrollbar("update");
                                AuthorListActions.getMoreAuthor(++that.page, that.limit, that.state.query).then(
                                        data => that.addNewAuthor(data.data)
                                );
                            }
                        }
                    }

                });
                $(".tip_msg").fadeOut("slow");
            }
        );
    }

    componentWillUnmount() {
        AuthorStore.unlisten(this.onChange);
        //$(".pc-center-box").mCustomScrollbar("destroy");
    }

    onChange(state) {
        this.setState(state);
    }

    addNewAuthor(news){
        this.setState({
            data: {
                data: this.state.data.data.concat(news)
            }
        });
        $(".tip_msg").fadeOut("slow");
        //$(".spinner").remove();
        $(".pc-center-box").mCustomScrollbar("update");
        this.stop = false;
    }

    setNewAuthor(news){
        this.setState({
            data:{
                data:news
            }
        });
        $(".tip_msg").fadeOut("slow");
        //$(".spinner").remove();
        $(".pc-center-box").mCustomScrollbar("update");
        this.stop = false;
    }

    showEditAuthorDialog(event){
        let authorJson = $(event.currentTarget).attr("data-author");
        if(!!authorJson){
            $(".modal-message").text("");
            $(".oldAuthor").val(authorJson);
            let author = JSON.parse(authorJson);
            $("#editAuthorModal .form-control").each(function(){
                $(this).val(author[$(this).attr("name")]);
            });
            let that = this;
            ArtListActions.getArtByAuthor(author.name).then(function(data){
                that.art = data;
                if(!!that.art && !!that.art.data && that.art.data.length>0){
                    $(".modal-body2").show();
                }else{
                    $(".modal-body2").hide();
                }
                that.state.art = that.pageArtPicWindow(1);
                that.setState(that.state);
            });
            $(".edit-author-img img").attr("src",author.portraitUrl);
            $("#editAuthorModal").modal("show");
        }
    }

    pageArtPicWindow(group){
        let arts = this.art;
        let maxGroup = Math.ceil(arts.count/6);
        let newData = [];
        let artData = arts.data;
        if(group>0 && group<=maxGroup){
            for(let i=(group-1)*6;i<group*6 && i<arts.count;i++){
                newData.push(artData[i]);
            }
            if(group==1){
                $(".art-box-left").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
                if(arts.count<=6){
                    $(".art-box-right").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
                }else{
                    $(".art-box-right").css({"cursor":"pointer","background-color":"#C0C5C8"});
                }
            }else if(group>1){
                $(".art-box-left").css({"cursor":"pointer","background-color":"#C0C5C8"});
                if(group==maxGroup){
                    $(".art-box-right").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
                }else{
                    $(".art-box-right").css({"cursor":"pointer","background-color":"#C0C5C8"});
                }
            }else{
                $(".art-box-right").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
                $(".art-box-left").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
            }
        }else{
            $(".art-box-right").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
            $(".art-box-left").css({"cursor":"not-allowed","background-color":"#EBEBEB"});
        }
        this.art.group=group;
        this.art.maxGroup=maxGroup;
        return {"data":newData,"count":arts.count,"group":group,'maxGroup':maxGroup};
    }

    editAuthorInfo(){
        let arts = this.state.art;
        let artPics = '';
        if(!!arts && !!arts.data && arts.data.length>0){
            let st2 = {
                height : '140px',
                width : '140px',
                display : 'block'
            }
            artPics = arts.data.map(function(art){
                let showImageUrl = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTVkMDEyMDE0ZTUgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNWQwMTIwMTRlNSI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44MDQ2ODc1IiB5PSIxMDUuMSI+MjQyeDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==';
                if(!!art.smallImgUrl) showImageUrl = art.smallImgUrl;
                return (
                    <li key={art._id} className="thumbnail">
                        <img data-src="holder.js/140%x140" alt="140%x140" title={art.name} style={st2}
                        src={showImageUrl}
                        data-holder-rendered="true" />
                    </li>
                );
            });
        }
        function model(id,title,comfirm){
            let st = {
                height : '400px',
                width : '400px',
                display : 'block'
            }
            let st2 = {
                height : '140px',
                width : '140px',
                display : 'block'
            }
            return (
                <div className="modal fade" id={id} role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog edit_author_modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title" id="myModalLabel">{title}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="edit-author-img">
                                    <img data-src="holder.js/400%x400" alt="400%x400" style={st}
                                        src="/images/author_default.jpg"
                                data-holder-rendered="true" />
                            </div>
                            <div className="edit-author-field">
                                <div className="row">
                                    <div className="edit-author-form-group">
                                        <label className="col-sm-2">名字：</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name" className="form-control" id="name" placeholder="" />
                                            <input type="hidden" name="_id" className="form-control" />
                                            <input type="hidden" name="oldAuthor" className="oldAuthor" />
                                        </div>
                                    </div>
                                 </div>
                                <div className="row">
                                    <div className="edit-author-form-group">
                                        <label className="col-sm-2">国籍：</label>
                                         <div className="col-sm-10">
                                             <input type="text" name="nationality" className="form-control" id="nationality" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="edit-author-form-group">
                                        <label className="col-sm-2">领域：</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="field" className="form-control" id="field" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="edit-author-form-group">
                                        <label className="col-sm-2">风格：</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="genre" className="form-control" id="genre" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="edit-author-form-group">
                                        <label className="col-sm-2">导师：</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="teachers" className="form-control" id="teachers" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="edit-author-form-group">
                                        <label className="col-sm-2">出生日期/地点：</label>
                                        <div className="col-sm-10">
                                            <textarea name="born" id="born" className="form-control author-textarea" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body2">
                            <div className="art-title">作品集</div>
                            <div className="art-list">
                                <div className="art-box-left glyphicon glyphicon-chevron-left"></div>
                                <div className="pics-list">
                                <ul>
                                    {artPics}
                                </ul>
                                </div>
                                <div className="art-box-right glyphicon glyphicon-chevron-right"></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <span className="modal-message"></span>
                        <button type="button" className="btn btn-primary" id={comfirm}>保存</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">返回</button>
                    </div>
                </div>
                </div>
            </div>)
        }
        return (
            <div className="authorEdit">
                {model('editAuthorModal','修改作者信息','updateAuthor')}
            </div>
        );
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
            $(".tip_msg").fadeIn("slow");
            AuthorListActions.getMoreAuthor(1, that.limit, that.state.query).then(
                data => that.setNewAuthor(data.data)
            );
        }
        let author_data = (this.state.data);
        let author_list = "";
        if(author_data && author_data.data && author_data.data.length>0){
            author_list = author_data.data.map(function(author){
                let authorJson = JSON.stringify(author);
                let author_pic = '/images/author_default.jpg';
                if(!!author.portraitUrl){
                    author_pic = author.portraitUrl;
                }
                return <div className="authorList_cart" key={author._id}>
                    <div className="authorList_cart-left">
                        <img className="authorList_cart-img"
                             src={author_pic}></img>
                    </div>
                    <div className="authorList_cart-right">
                        <div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">名字：</span>
                                <span className="authorList_cart-name"><span title={author.name}>{author.name}</span></span>
                            </div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">国籍：</span>
                                <span className="authorList_cart-nationality"><span title={author.nationality}>{author.nationality}</span></span>
                            </div>
                        </div>
                        <div>
                            <div className="authorList_cart-right_item authorList_cart-right_item-born authorList_cart-item-line-2">
                                <span className="authorList_cart-title">出生日期/地点：</span>
                                <span className="authorList_cart-item-span-all-line"><span title={author.born}>{author.born}</span></span>
                            </div>
                        </div>
                        <div>
                            <div className="authorList_cart-right_item authorList_cart-right_item-field">
                                <span className="authorList_cart-title">领域：</span>
                                <span className="authorList_cart-field"><span title={author.field}>{author.field}</span></span>
                            </div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">风格：</span>
                                <span className="authorList_cart-genre"><span title={author.genre}>{author.genre}</span></span>
                            </div>
                        </div>
                        <div>
                            <div className="authorList_cart-right_item">
                                <span className="authorList_cart-title">导师：</span>
                                <span className="authorList_cart-teachers"><span title={author.teachers}>{author.teachers}</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="authorList_cart-toolbar">
                        <span className="btn btn-primary authorList_cart-toolbar-edit"
                            data-author={authorJson}
                            onClick={that.showEditAuthorDialog}>编辑</span>
                    </div>
                </div>
            });
        }else{
            author_list = <div>无查询到匹配的数据！</div>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2 hidden">
                        <Navbar updateContent={this.setMenuBindEvent} page={this.page}/>
                    </div>
                    <div className="col-sm-12 content-box">
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
                        <div className="tip_contain">
                            <span className="tip_msg">加载中...</span>
                        </div>
                    </div>
                </div>
                {this.editAuthorInfo()}
            </div>
        );
    }
}

export default AuthorList;