import {HTTPWrapper} from './../HTTPWrapper.js';
import AsyncActions from './../../../actions/async/async.actions.js';

const DATA = {
    mock: true
};

let mockInstance = new HTTPWrapper();

mockInstance.request = () => {
    let promise = new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve(DATA);
        });
    });

    promise
        .then(() => {
            AsyncActions.toggle.defer(false);
        })
        .catch(() => {
            AsyncActions.toggle.defer(false);
        });

    AsyncActions.toggle.defer(true);

    return promise;
};

export default mockInstance;