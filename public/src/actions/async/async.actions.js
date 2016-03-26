import alt from './../../alt';

class AsyncActions {
    constructor() {
        this.generateActions(
            'toggle'
        );
    }
}

export default alt.createActions(AsyncActions);