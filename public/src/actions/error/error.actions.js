import alt from './../../alt';

class ErrorActions {
    constructor() {
        this.generateActions(
            'show',
            'hide'
        );
    }
}

export default alt.createActions(ErrorActions);