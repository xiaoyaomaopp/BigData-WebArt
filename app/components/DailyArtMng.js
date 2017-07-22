import React from 'react';
import {
    Link
    } from 'react-router';

import Navbar from './Navbar';

class DailyArtMng extends React.Component {
    constructor(props) {
        super(props);
        this.url = '';
        if(!!props.params){
            if('art'==props.params.type){
                this.url = '/mng/dailypub';
            }
        }
    }

    componentDidMount() {
        let boxHeight = $(window).height()- 70 - 57 - 60 - 24 -20-23;
        if(boxHeight<=730) boxHeight = 730;
        $(".pc-center-box").css("height", boxHeight+20);
        $("#dailyMngIframe").css("height", boxHeight);
    }

    componentWillReceiveProps(nextProps){
    }


    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 content-box">
                        <div className="pc-center-box">
                             <iframe src={this.url} id="dailyMngIframe" scrolling="no" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DailyArtMng;