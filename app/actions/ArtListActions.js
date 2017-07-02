import alt from '../alt';
import ArtSource from '../sources/ArtSource';
class ArtListActions {
	constructor() {
		this.generateActions(
			'onSuccess',
			'onFailure'
		);
	}
	getArt(page, limit) {
		ArtSource.getArt(page, limit).then((data) => this.onSuccess(data));
	}
    getArtByAuthor(authorName){
        return ArtSource.getArtByAuthor(authorName).then(function(data){
            return data;
        });
    }
}

export default alt.createActions(ArtListActions);