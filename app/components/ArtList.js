import React from 'react';
import {
    Link
} from 'react-router';

import ArtListStore from '../stores/ArtListStore';
import ArtListActions from '../actions/ArtListActions';
import Navbar from './Navbar'


class ArtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArtListStore.getState();
        this.onChange = this.onChange.bind(this);
        this.limit = 10;
        this.page = props.params && props.params.page ? parseInt(props.params.page) : 1;
        this.url = location.href.split('#')[0];
    }

    componentDidMount() {
        ArtListActions.getArt(this.page,this.limit);
        this.initEvent()
    }

    componentWillUnmount() {
        ArtListStore.unlisten(this.onChange);
    }
    componentDidUpdate(prevProps) {
        //const lastPage = prevProps.params && prevProps.params.page ? prevProps.params.page : 1;
        //const page = this.props.params && this.props.params.page ? this.props.params.page : 1;
        //if (lastPage != page) {
        //    ArticleListActions.getArticles(this.props.params.page, this.limit);
        //}

    }
    onChange(state) {
        this.setState(state);

    }
    getPage() {
        return this.props.params && this.props.params.page ? this.props.params.page : 1;
    }
    initEvent(){

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Navbar />
                    </div>
                    <div className="col-sm-10">

                    </div>
                </div>
            </div>
        );
    }
}

export default ArtList;