'use strict';

module.exports = class ModelWrapper {
    constructor(Model) {
        this.Model = Model;
    }

    query(method) {
        let args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

        return this.Model[method].apply(this.Model, args);
    }
};