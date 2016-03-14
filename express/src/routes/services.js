import express from 'express';
import mongoose from 'mongoose';
import {Item} from './../models/item';

let serviceRouter = express.Router();

serviceRouter.get('/items', (req, res, next) => {
    Item.find().then(items => {
        res.json(items);
    });
});

export default serviceRouter;