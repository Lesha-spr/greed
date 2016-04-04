import alt from './../../alt';

class DialogActions {
    constructor() {
        this.generateActions(
            'open',
            'close'
        );
    }
}

export default alt.createActions(DialogActions);