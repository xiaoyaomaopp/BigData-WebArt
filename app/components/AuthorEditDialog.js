import React from 'react';
import {
    Link
    } from 'react-router';

import AuthorStore from '../stores/AuthorStore';
import AuthorListActions from '../actions/AuthorListActions';

class AuthorEditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.setState({
            author : this.props.editAuthor
        });
    }

    componentDidMount() {
        //$("#editAuthorModal").modal("show");
    }

    render() {
        let author = this.state.author;
        console.log("editAuthor:"+author);
        function model(id,title,author,comfirm){
            let st = {
                height : '400px',
                width : '400px',
                display : 'block'
            }
            return (
                <div className="modal fade" id={id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog edit_author_modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 className="modal-title" id="myModalLabel">{title}</h4>
                            </div>
                            <div className="modal-body container1">
                                <div className="row">
                                    <div className="edit-author-img">
                                        <img data-src="holder.js/400%x400" alt="400%x400" style={st}
                                        src="https://uploads8.wikiart.org/temp/75c94575-44e2-49d6-8a37-8b16e289cd27.jpg!Portrait.jpg"
                                        data-holder-rendered="true" />
                                    </div>
                                    <div className="edit-author-field">
                                    <div className="row">
                                        <div className="edit-author-form-group">
                                            <label className="col-sm-2">名字：</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="name" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="edit-author-form-group">
                                            <label className="col-sm-2">国籍：</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="name" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="edit-author-form-group">
                                            <label className="col-sm-2">领域：</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="name" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="edit-author-form-group">
                                            <label className="col-sm-2">风格：</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="name" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="edit-author-form-group">
                                            <label className="col-sm-2">导师：</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="name" placeholder="" />
                                            </div>
                                        </div>
                                     </div>
                                    <div className="row">
                                        <div className="edit-author-form-group">
                                            <label className="col-sm-2">出生日期/地点：</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control author-textarea" rows="5"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="modal-body2 artList">
                                    <div className="art-title">作品集</div>
                                    <div className="art-list">

                                    </div>
                                </div>
                            </div>
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
            <div className="authorEdit">
                {model('editAuthorModal','修改作者信息',author,'loginOut')}
            </div>
        );
    }
}

export default AuthorEditDialog;