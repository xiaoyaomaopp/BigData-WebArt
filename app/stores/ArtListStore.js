import alt from '../alt';
import ArtListActions from '../actions/ArtListActions';

class ArtListStore {
	constructor() {
		this.bindActions(ArtListActions);
		this.data = {
			data: [],
			count: 0
		};
	}
	onSuccess(data) {
		this.data = data;
	}
	onFailure(error) {
		toastr.error(error);
	}
}

export default alt.createStore(ArtListStore);