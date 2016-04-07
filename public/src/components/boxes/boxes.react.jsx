import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class BoxesUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div className='boxes'>
            <h3>Boxes</h3>
        </div>;
    }
}

let Boxes = BoxesUnwrapped;

export default Boxes;