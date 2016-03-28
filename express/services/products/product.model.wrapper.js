'use strict';

const Product = require('./product.model');

class ProductModelWrapper {
    create(data) {
        return new Product(data);
    }

    find() {
        return Product.find.apply(Product, arguments);
    }

    findOne() {
        return Product.findOne.apply(Product, arguments);
    }

    remove() {
        return Product.remove.apply(Product, arguments);
    }

    update() {
        return Product.update.apply(Product, arguments)
    }
}

module.exports = new ProductModelWrapper();