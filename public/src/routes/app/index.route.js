import fetchComponent from './../../helpers/fetchComponent/fetchComponent.js';

const fetch = fetchComponent();

export default (nextState, cb) => {
    fetch.before();

    require.ensure([], require => {
        fetch.after();

        cb(null, require('./../../components/auth/auth.react.jsx').default);
    });
};