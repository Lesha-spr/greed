import {Router} from 'express';
import * as routers from './../services';

let router = Router();

router.use('/products', routers.productsRouter);
router.use('/categories', routers.categoriesRouter);

export default router;