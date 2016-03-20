import {WebResource} from './../WebResource/WebResource.js';
import AsyncActions from './../../actions/async/async.actions.js';

export class HTTPWrapper extends WebResource {
    constructor() {
        super(...arguments);
    }

    request() {
        let promise = super.request(...arguments);

        promise
            .then(HTTPWrapper.always)
            .catch(HTTPWrapper.always);

        AsyncActions.toggle.defer(true);

        return promise;
    }

    static always() {
        AsyncActions.toggle.defer(false);
    }
}