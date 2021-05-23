const Product = require('../models/product');

exports.product_create = function (req, res, next) {
    
    Product.findOne({name: req.body.name}, function (err, p) {
        if (err) return err;
        return p;
    }).exec(function (err, existingProduct) {
        if (existingProduct && existingProduct.name === req.body.name){
            return next(err)
        } else {
            let product = new Product(
                {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,
                    quantity: req.body.quantity,
                }
            );
            console.log(req.body);
            product.save(function (err, object) {
                if (err) {
                    return next(err);
                }
                res.json({id: object.id})
            })
        }
    })

};

exports.product_get_all = function (req, res, next) {
    Product.find({}, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
};


exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.json('Updated Product.');
    });
};

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json('Deleted Product successfully!');
    })
};