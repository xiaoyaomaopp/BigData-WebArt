import alt from '../alt';
import AuthorListActions from '../actions/AuthorListActions';

class AuthorStore {
	constructor() {
		this.bindActions(AuthorListActions);
		this.data = [];
	}

	onSuccess(data) {
		this.data = data;
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(AuthorStore);