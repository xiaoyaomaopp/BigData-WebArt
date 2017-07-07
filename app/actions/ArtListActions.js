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

	getMoreArt(page, limit, params) {
		return ArtSource.getArt(page, limit, params).then(function(data){
			return data
		});
	}

	getArtById(id){
		return ArtSource.getArtById(id).then(function(data){
			return data
		});
	}

    updateArtById(data){
        return ArtSource.updateArtById(data).then(function(data){
            return data
        });
    }
}

export default alt.createActions(ArtListActions);