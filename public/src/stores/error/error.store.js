import alt from './../../alt';
import ErrorActions from './../../actions/error/error.actions.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class ErrorStore {
    constructor() {
        this.state = Immutable.Map({
            error: null
        });
        this.bindActions(ErrorActions);
    }

    onShow(error) {
        this.setState(this.state.set('error', error));
    }

    onHide() {
        this.setState(this.state.set('error', null));

        history.replaceState(null, null, window.location.pathname);
    }
}

export default alt.createStore(immutable(ErrorStore), 'ErrorStore');