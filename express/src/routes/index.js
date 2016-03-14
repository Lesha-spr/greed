import express from 'express';
import serviceRouter from './services.js';
import authorization from './../helpers/auth';

let router = express.Router();

router.use('/services', serviceRouter);

router.use('/admin*', authorization, (req, res, next) => {
    res.render('admin', {title: 'Admin'});
});

/* SPA bitch! */
router.get('*', (req, res, next) => {
    res.render('index', {title: 'Greed'});
});

export default router;