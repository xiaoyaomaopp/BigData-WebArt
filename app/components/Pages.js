import React from 'react';
import {
    Link
} from 'react-router';

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.page = 0;
        this.limit = 0;
        this.url = "/";
        this.size = 0;

    }
    componentDidMount() {
        this.count = this.props.count;
        this.page = this.props.page;
        this.limit = this.props.limit;
        this.url = this.props.url;
        this.size = parseInt(this.props.count / this.props.limit);
    }
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        this.count = (nextProps.count);
        this.page = (nextProps.page);
        this.limit = (nextProps.limit);
        this.url = (nextProps.url);
        this.size = parseInt(this.count / this.limit);
    }
    getPage() {
        return this.page;
    }
    getSize() {
        return this.size;
    }

    getPrev() {
        if (this.page > 1) {
            var url = this.url + (this.page - 1);
            return (<a className="newer-posts" href={url}><i className="glyphicon glyphicon-chevron-left"></i></a>)
        }
        return ("");
    }

    getNext() {
        if (this.page < this.size) {
            var url = this.url + (this.page + 1);
            return (<a className="older-posts" href={url}><i className="glyphicon glyphicon-chevron-right"></i></a>)
        }
        return ("");
    }

    render() {


        return (
            <ul className="pagination">
                <nav className="pagination" role="navigation">
                       {this.getPrev()}
                         <span className="page-number">第 {this.getPage()} 页 ⁄ 共 {this.getSize()} 页</span>
                       {this.getNext()}
                        
                </nav>
            </ul>
        );
    }
}

export default Pages;