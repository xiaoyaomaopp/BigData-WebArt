import alt from '../alt';
import AuthorSource from '../sources/AuthorSource';
class AuthorListActions {
	constructor() {
		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}
	getAuthor(page, limit) {
		AuthorSource.getAuthor(page, limit).then((data) => this.onSuccess(data));
	}

	getMoreAuthor(page, limit, params) {
		return AuthorSource.getAuthor(page, limit, params).then(function(data){
			return data
		});
	}

    updateAuthor(author){
		return AuthorSource.updateAuthor(author).then(function(data){
            return data;
        });
	}

}

export default alt.createActions(AuthorListActions);