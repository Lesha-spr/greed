import React, {Component, PropTypes} from 'react';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import DialogStore from './../../stores/dialog/dialog.store.js';
import Modal from 'react-modal';
import modalStyles from './modalStyles.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';
import classNames from 'classnames';

export class DialogUnwrapped extends Component {
    static getStores(props) {
        return [DialogStore];
    }

    static getPropsFromStores(props) {
        return DialogStore.getState().toJS();
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <Modal onRequestClose={DialogActions.close} isOpen={this.props.isOpen} style={modalStyles}>
            {this.props.content}
        </Modal>;
    }
}

DialogUnwrapped.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    content: PropTypes.element
};

const Dialog = connectToStores(DialogUnwrapped);

export default Dialog;