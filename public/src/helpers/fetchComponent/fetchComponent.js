import AsyncActions from './../../actions/async/async.actions.js';

export default () => {
    let loaded = false;

    return {
        before: () => {
            if (!loaded) {
                AsyncActions.toggle(true);
            }
        },
        after: () => {
            if (!loaded) {
                AsyncActions.toggle(false);
                loaded = true;
            }
        }
    };
}