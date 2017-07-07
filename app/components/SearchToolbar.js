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
        $(".searchToolBar-box").mCustomScrollbar({
            axis:"y",
            callbacks:{
                onScroll:function(){

                },
                onTotalScroll:function(){

                }
            }

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
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                                <li>
                                    <p className="filter-name"><span>国家：</span></p>
                                    <p className="filter-value filter-select-single-value">
                                        <span>中国</span>
                                        <span>美国</span>
                                        <span>德国</span>
                                        <span>澳大利亚</span>
                                        <span>印度</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }

        return (<div className="searchToolBarPanel1">
            {model()}
        </div>);
    }
}

export default SearchToolbar;