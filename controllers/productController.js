const Product = require('../models/product');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const Joi = require('Joi');
const product = require('../models/product');

exports.createProduct = (req , res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }
        let product = new Product(fields);
        if ( files.photo) {
            if (files.photo.size > Math.pow(10, 6)) {
                return res.status(400).json({
                    error : 'Image should be less than 1MB in size !'

                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;   
        }
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required(),
          });
          const { error } = schema.validate(fields);
      
          if (error) {
            return res.status(400).json({
              error: error.details[0].message,
            });
          }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err : 'Product not persisted !'
                })
            }
            res.json({
                product
            })
        })
    })

}

exports.updateProduct = (req , res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }
        let product = req.product;
        product = _.extend(product, fields);

        if ( files.photo) {
            if (files.photo.size > Math.pow(10, 6)) {
                return res.status(400).json({
                    error : 'Image should be less than 1MB in size !'

                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;   
        }
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required(),
          });
          const { error } = schema.validate(fields);
      
          if (error) {
            return res.status(400).json({
              error: error.details[0].message,
            });
          }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err : 'Product not updated !'
                })
            }
            res.json({
                product
            })
        })
    })

}

exports.productById = (req, res, next, id)  => {
    Product.findById(id).exec((err, product) => {
        if (err || !product ) {
            return res.status(404).json({
                error: 'Product Not Found !'
            })
        }
        req.product = product;
        next();
    })
}

exports.showProduct = (req, res) => {
    req.product.photo = undefined;
    res.json({
        product: req.product
    });
}
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, product) => {
        if (err) {
            return res.status(404).json({
                error: 'Product Not Found !'
            })
        }
        res.status(204).json({})

    })
}