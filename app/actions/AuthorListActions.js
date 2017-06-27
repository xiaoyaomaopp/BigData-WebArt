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
}

export default alt.createActions(AuthorListActions);