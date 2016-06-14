import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './_footer.scss';

export class FooterUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <footer className='footer'>
            <div className='row'>
                <div className='columns'>
                    {this.props.children}
                    <div className='row'>
                        <div className='column'>
                            <div className='footer__copy medium-text-left'><b>An &amp; Kat &amp; Pat</b> &copy;</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>;
    }
}

FooterUnwrapped.propTypes = {};

const Footer = FooterUnwrapped;

export default Footer;