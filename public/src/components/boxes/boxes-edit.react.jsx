import React, {Component, PropTypes} from 'react';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import serialize from 'form-serialize';
import {Form, Input, Button} from 'react-validation';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class BoxesEditUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div>
            <h3>Add/Edit Box</h3>

            <button className='close-button' type='button' onClick={DialogActions.close}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>;
    }
}

BoxesEditUnwrapped.propTypes = {};

BoxesEditUnwrapped.defaultProps = {};

const BoxesEdit = BoxesEditUnwrapped;

export default BoxesEdit;