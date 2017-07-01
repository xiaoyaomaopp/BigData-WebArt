import alt from '../alt';
import UserSource from '../sources/UserSource';
class UserActions {
    constructor() {
        this.generateActions(
            'onSuccess',
            'onFailure'
        );
    }

    getCuurentUser() {
        return UserSource.getCuurentUser().then(function(data){
            return data
        });
    }

}

export default alt.createActions(UserActions);