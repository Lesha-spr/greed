import objectSort from 'object-sort';

let matches = (query, value, match, schemaKey, queryKey) => {
    if (match.indexOf(value) === -1) {
        if (typeof value[schemaKey] === 'object') {
            return JSON.stringify(objectSort(value[schemaKey])) === JSON.stringify(objectSort(query[queryKey]))
        }

        return value[schemaKey] === query[queryKey];
    }

    return false;
};

let rec = (query, schema, collection, match) => {
    Object.keys(schema).forEach(schemaKey => {
        Object.keys(query).forEach(queryKey => {
            if (schema[queryKey]) {
                match.push.apply(match, collection.filter(value => {
                    if (match.indexOf(value) === -1) {
                        if (typeof value[schemaKey] === 'object') {
                            return JSON.stringify(objectSort(value[schemaKey])) === JSON.stringify(objectSort(query[queryKey]));
                        }

                        return value[schemaKey] === query[queryKey];
                    }

                    return false;
                }));

                return rec(query[queryKey], schema[schemaKey], collection, match);
            }
        });
    });
};

export default class QuerySearch {
    constructor(schema) {
        this.schema = schema;
    }

    search(query, collection) {
        var ret = [];

        rec(query, this.schema, collection, ret);

        return ret;
    }
}