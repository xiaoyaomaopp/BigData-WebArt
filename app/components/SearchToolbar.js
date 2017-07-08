import React from 'react';
import {
    Link
    } from 'react-router';

class SearchToolbar extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        $(".searchToolBar").css("height", $(window).height()+"px");
        //$(".searchToolBar-box").mCustomScrollbar({
        //    axis:"y",
        //    callbacks:{
        //        onScroll:function(){
        //
        //        },
        //        onTotalScroll:function(){
        //
        //        }
        //    }
        //
        //});
        $(".search-box-body").mCustomScrollbar({
            axis:"y",
            callbacks:{
                onScroll:function(){

                },
                onTotalScroll:function(){

                }
            }

        });
        $(".search-box-cancel").click(function(){
            $(".searchToolBarPanel").fadeOut("slow");
        });
        $(".search-box-body").on("click",".search-tips",function(){
            let pNode = $(this).parent;
            debugger;
        });
    }

    componentDidUpdate(prevProps) {
    }


    render() {
        function model(){
            return (
                <div className="modal fade" id="searchBar" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="searchToolBar">
                        <div className="searchToolBar-header">
                            <p className="searchToolBar-title">高级搜索</p>
                            <p className="searchToolBar-line"></p>
                            <p className="searchToolBar-filter">
                                筛选条件：
                            </p>
                            <ul className="searchToolBar-filter">
                                <li><span>demo</span></li>
                            </ul>
                        </div>
                        <div className="searchToolBar-box">
                            <ul>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                        <span>印度</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        function model2(){
            return (
                <div className="row" id="searchBar">
                    <div className="col-sm-12 search-box">
                        <div className="search-box-header">
                            <span className="title">高级查询</span>
                        </div>
                        <div className="search-box-body">
                            <ul>
                                <li>
                                    <span className="search-box-body-left">风格：</span>
                                    <p className="search-box-body-right">
                                        <span className="search-tips select-item" value="">all</span>
                                        <span className="search-tips" value="Symbolism">Symbolism</span>
                                        <span className="search-tips" value="AbstractExpressionism">AbstractExpressionism</span>
                                        <span className="search-tips" value="Expressionism">Expressionism</span>
                                        <span className="search-tips" value="AbstractArt">AbstractArt</span>
                                        <span className="search-tips" value="Cubism">Cubism</span>
                                        <span className="search-tips" value="ArtBrut">ArtBrut</span>
                                        <span className="search-tips" value="ExistentialArt">ExistentialArt</span>
                                        <span className="search-tips" value="Actionpainting">Actionpainting</span>
                                        <span className="search-tips" value="ArtInformel">ArtInformel</span>
                                    </p>
                                </li>
                                <li>
                                    <span className="search-box-body-left">类别：</span>
                                    <p className="search-box-body-right">
                                        <span className="search-tips select-item" value="">all</span>
                                        <span className="search-tips" value="canvas">canvas</span>
                                        <span className="search-tips" value="oil">oil</span>
                                        <span className="search-tips" value="board">board</span>
                                        <span className="search-tips" value="gouache">gouache</span>
                                        <span className="search-tips" value="enamel">enamel</span>
                                        <span className="search-tips" value="lacquer">lacquer</span>
                                        <span className="search-tips" value="paper">paper</span>
                                        <span className="search-tips" value="ink">ink</span>
                                        <span className="search-tips" value="lithography">lithography</span>
                                        <span className="search-tips" value="charcoal">charcoal</span>
                                        <span className="search-tips" value="linen">linen</span>
                                    </p>
                                </li>
                                <li>
                                    <span className="search-box-body-left">年代：</span>
                                    <p className="search-box-body-right">
                                        <span className="search-tips select-item" value="">all</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                        <span className="search-tips" value="1878">1878</span>
                                    </p>
                                </li>
                                <li>
                                    <span className="search-box-body-left">地区：</span>
                                    <p className="search-box-body-right">
                                        <span className="search-tips" value="">all</span>
                                        <span className="search-tips" value="china">china</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="search-box-footer">
                            <span className="search-box-body-left"><b>已选条件：</b></span>
                            <p className="search-box-body-right">
                                <span className="search-tips btn-has-select" value="1878">1878</span>
                                <span className="search-tips btn-has-select" value="1878">1878</span>
                                <span className="search-tips btn-has-select" value="1878">1878</span>
                                <span className="search-tips btn-has-select" value="1878">1878</span>
                                <span className="search-tips btn-has-select" value="1878">1878</span>
                            </p>
                        </div>
                        <div className="search-box-footer-bottom">
                            <div className="edit-art-toolbar col-sm-12">
                                <button className="btn btn-default search-box-cancel">完成</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (<div className="container searchToolBarPanel">
            {model2()}
        </div>);
    }
}

export default SearchToolbar;