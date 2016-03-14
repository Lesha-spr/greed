import auth from 'basic-auth';

export default (req, res, next) => {
    let user = auth(req);

    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');

        return res.sendStatus(401);
    }

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    // TODO: get from Model
    if (user.name === 'foo' && user.pass === 'bar') {
        return next();
    } else {
        return unauthorized(res);
    }
};