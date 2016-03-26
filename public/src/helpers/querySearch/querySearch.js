import objectSort from 'object-sort';

const querySearch = (query, schema, collection) => {
    var ret = [];

    rec(query, schema, collection, ret);

    return ret;
};

const matches = (query, value, match, schemaKey, queryKey) => {
    if (match.indexOf(value) === -1) {
        if (typeof value[schemaKey] === 'object') {
            return JSON.stringify(objectSort(value[schemaKey])) === JSON.stringify(objectSort(query[queryKey]))
        }

        return value[schemaKey] === query[queryKey];
    }

    return false;
};

const rec = (query, schema, collection, match) => {
    Object.keys(schema).forEach(schemaKey => {
        Object.keys(query).forEach(queryKey => {
            if (schema[queryKey]) {
                match.push.apply(match, collection.filter(value => {
                    if (match.indexOf(value) === -1) {
                        if (typeof value[schemaKey] === 'object') {
                            return JSON.stringify(objectSort(value[schemaKey])) === JSON.stringify(objectSort(query[queryKey]));
                        }

                        return value[schemaKey].toLowerCase().indexOf(query[queryKey].toLowerCase()) > -1;
                    }

                    return false;
                }));

                return rec(query[queryKey], schema[schemaKey], collection, match);
            }
        });
    });
};

export default querySearch;