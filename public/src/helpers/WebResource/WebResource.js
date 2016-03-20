import qs from 'qs';
import parseRoute from 'parse-route';

export class WebResource {
    constructor(api, defaults = {query: {}, params: {}}) {
        this.api = api;
        this.defaults = defaults;
    }

    request(options = {}) {
        let query = Object.assign({}, this.defaults.query, options.query);
        let params = Object.assign({}, this.defaults.params, options.params);
        let input = parseRoute(this.api, params);

        input = Object.keys(query).length ? `${input}?${qs.stringify(query)}` : input;

        return fetch(input, options.init);
    }
}