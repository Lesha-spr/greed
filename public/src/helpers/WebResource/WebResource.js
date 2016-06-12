import qs from 'qs';
import parseRoute from 'parse-route';

export class WebResource {
    constructor(api, defaults = {query: {}, params: {}}) {
        this.api = api;
        this.defaults = defaults;
    }

    static checkStatus(response) {
        if (!response.ok) {
            return Promise.reject(response);
        } else {
            return response;
        }
    }

    request(options = {}) {
        let query = Object.assign({}, this.defaults.query, options.query);
        let params = Object.assign({}, this.defaults.params, options.params);
        let init = Object.assign({
            credentials: 'same-origin'
        }, options.init || {});
        let input = parseRoute(this.api, params);

        input = Object.keys(query).length ? `${input}?${qs.stringify(query)}` : input;

        return fetch(input, init).then(WebResource.checkStatus);
    }
}