const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    jobtitlename : {type : String , required : true},
    firstname : {type : String , required : true},
    lastname : {type : String , required : true},
    location: {type : String , required : true},
    phono: {type : Number , required : true},
    email: {type : String , required:true},
});
let Product = mongoose.model('product', ProductSchema);
module.exports = Product;
