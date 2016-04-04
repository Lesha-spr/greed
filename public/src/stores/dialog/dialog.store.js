import alt from './../../alt';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class DialogStore {
    constructor() {
        this.state = Immutable.Map({
            isOpen: false,
            content: null
        });

        this.bindActions(DialogActions);
    }

    onOpen(content) {
        this.setState(this.state.set('isOpen', true).set('content', content));
    }

    onClose() {
        this.setState(this.state.set('isOpen', false).set('content', null));
    }
}

export default alt.createStore(immutable(DialogStore), 'DialogStore');