import alt from './../../alt';
import AsyncActions from './../../actions/async/async.actions.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class AsyncStore {
    constructor() {
        this.state = Immutable.Map({
            pending: false
        });
        this.bindActions(AsyncActions);
    }

    onToggle(pending) {
        this.setState(this.state.set('pending', pending));
    }
}

export default alt.createStore(immutable(AsyncStore), 'AsyncStore');