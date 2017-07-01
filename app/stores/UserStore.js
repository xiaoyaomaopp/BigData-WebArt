import alt from '../alt';
import UserActions from '../actions/UserActions';

class AuthorStore {
	constructor() {
		this.bindActions(UserActions);
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