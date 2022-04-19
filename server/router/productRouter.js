const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/*
    INFO : GET all the products
    URL : http://127.0.0.1:5000/api/products/
	METHOD : GET
	Fields : no-fields
	express function : router.get();

 */
router.get('/products', async (request , response) => {
    try {
        let products = await Product.find();
        response.status(200).json(products);
    }
    catch (error) {
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : GET a single Product
    URL : http://127.0.0.1:5000/api/products/:id
	METHOD : GET
	Fields : no-fields
	express function : router.get();
 */
router.get('/products/:id', async (request , response) => {
    let productId = request.params.id;
    try {
        let product = await Product.findById(productId); // select * from products where id=''
        response.status(200).json(product);
    }
    catch (error) {
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : Create a Product
    URL : http://127.0.0.1:5000/api/products/
	METHOD : POST

	express function : router.post();
 */
router.post('/products', async (request , response) => {
    try {
        let newProduct = {
            jobtitlename : request.body.jobtitlename,
            firstname : request.body.firstname,
            lastname : request.body.lastname,
            location : request.body.location,
            phonenumber : request.body.phno,
            email:request.body.email
        };
        //check the product is exists or not
        let product = await Product.findOne({name : newProduct.name});
        if(product){
            return response.status(400).json({
                result : 'Failed',
                message : 'Product is already exists'
            });
        }
        product = new Product(newProduct);
        product = await product.save(); // INSERT data to database
        response.status(200).json(product);
    }
    catch (error) {
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : Update a Product
    URL : http://127.0.0.1:5000/api/products/:id
	METHOD : PUT
	
	express function : router.put();
 */
router.put('/products/:id', async (request , response) => {
    let productId = request.params.id;
    try {
        let updatedProduct = {
            jobtitlename : request.body.jobtitlename,
            firstname : request.body.firstname,
            lastname : request.body.lastname,
            location : request.body.location,
            phonenumber : request.body.phno,
            email:request.body.email
        };
        let product = await Product.findById(productId);
        if(product){
            product = await Product.findByIdAndUpdate(productId , {
                $set : updatedProduct
            }, {new : true});
            response.status(200).json(product);
        }
        else{
            return response.status(400).json({
                result : 'failed',
                message : 'No Product is found to update'
            });
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            error : error
        });
    }
});

/*
    INFO : Delete a Product
    URL : http://127.0.0.1:5000/api/products/:id
	METHOD : DELETE
	Fields : no-fields
	express function : router.delete();
 */
router.delete('/products/:id', async (request , response) => {
    let productId = request.params.id;
   try {
        let product = await Product.findByIdAndDelete(productId);
        response.status(200).json(product)
   }
   catch (error) {
       response.status(500).json({
           error : error
       });
   }
});

module.exports = router;
