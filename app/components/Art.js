import React from 'react';
import {
    Link
    } from 'react-router';

import ArtListStore from '../stores/ArtListStore';
import ArtListActions from '../actions/ArtListActions';

class Art extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArtListStore.getState();
        this.onChange = this.onChange.bind(this);
        this._id = props.params && props.params.id ? props.params.id:'';
    }

    componentDidMount() {
        ArtListActions.getArtById(this._id).then((data)=>this.onChange({
            data : data
        }));
        this.initEvent();
    }

    componentWillUnmount() {
        ArtListStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        $(".art-input").attr("disabled","disabled");
        this.setStateValue();
    }

    initEvent(){
        let that = this;
        $(window).scroll(function() {
            if ($(this).scrollTop() > 500) {
                $(".to-top").fadeIn("slow");
            } else {
                $(".to-top").fadeOut("slow");
            }
        });
        $(".artDetail").on("click",".edit-art",function(){
            $(".art-input").removeAttr("disabled");
            $(".art-author").attr("disabled","true");
            $(".edit-art").hide();
            $(".edit-button").show();
        });
        $(".artDetail").on("click",".save-art",function(){
            that.saveArtData();
        });
        $(".artDetail").on("click",".cancel-art",function(){
            that.setStateValue();
            $(".art-input").attr("disabled","disabled");
            $(".edit-art").show();
            $(".edit-button").hide();
        });
        $(".artDetail").on('click',".artDetail-img",function(){
            $(".art-large-img").viewer("show");
        });
    }

    saveArtData(){
        let art = this.state.data;
        let that = this;
        $(".edit-art-form-group .art-input").each(function(){
            art[$(this).attr("name")] = $(this).val();
        });
        ArtListActions.updateArtById(art).then(function(data){
            if(!!data && 'success'==data){
                that.state.data = art;
                $(".art-input").attr("disabled","disabled");
                $(".edit-art").show();
                $(".edit-button").hide();
                $(".art-message").text("");
            }else{
                $(".art-message").text("提示：保存失败！");
            }
        });
    }

    setStateValue(){
        let art = this.state.data;
        if(!!!art) art = {};
        $(".edit-art-form-group .art-input").each(function(){
            $(this).val(art[$(this).attr("name")]);
        });
    }

    onChange(state) {
        state.query = this.state.query;
        this.setState(state);
    }

    toTop(){
        $("html,body").animate({scrollTop: 0}, 10);
    }

    artBaseInfo(){
        return (<field>
            <div className="row">
                <div className="col-sm-2 art-message"></div>
                <div className="edit-art-toolbar col-sm-10">
                    <button className="btn btn-primary edit-art">编辑</button>
                    <button className="btn btn-primary save-art edit-button">保存</button>
                    <button className="btn btn-default cancel-art edit-button">返回</button>
                </div>
            </div>
            <div className="row">
                <div className="edit-art-form-group">
                    <label className="col-sm-2">名称：</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control hidden art-input" name="_id" />
                        <input type="text" className="form-control art-input" name="title"  />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="edit-art-form-group">
                    <label className="col-sm-2">作者：</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control art-input art-author" name="author" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="edit-art-form-group">
                    <label className="col-sm-2">尺寸：</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control art-input" name="dimensions" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="edit-art-form-group">
                    <label className="col-sm-2">风格：</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control art-input" name="style"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="edit-art-form-group">
                    <label className="col-sm-2">介质：</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control art-input" name="media" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="edit-art-form-group">
                    <label className="col-sm-2">日期/地点：</label>
                    <div className="col-sm-10">
                        <textarea className="form-control author-textarea art-input" name="date" rows="5"/>
                    </div>
                </div>
            </div>
        </field>);
    }

    render() {
        let art = this.state.data;
        if(!!!art) art={};
        let imgModel = <img src="/images/author_default.jpg" alt="默认图片" />;
        if(!!art.smallImgUrl){
            imgModel = <img src={art.smallImgUrl} alt={art.name||'' +' '+ art.author||''} title={art.name +' '+ art.author} />;
        }
        return (<div className="container artDetail">
            <div className="row">
                <div className="artDetail-row-left">
                    <div className="artDetail-img">
                        {imgModel}
                    </div>
                </div>
                <div className="artDetail-row-right">
                    {this.artBaseInfo()}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 art-detail">
                </div>
            </div>
            <div className="to-top" onClick={this.toTop}>
                <span></span>
            </div>
            <div className="art-large-img hidden">
                <img src={art.largeImgUrl} title={art.title + ' ' + art.author} alt={art.title + ' ' + art.author} />
            </div>
        </div>);
    }
}

export default Art;