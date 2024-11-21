//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let shoeModel = mongoose.Schema({
    Brand: String,
    Size: Number,
    Color: String,
    Price: Number
},
{
    collection:"Shoe collection"
});
module.exports =mongoose.model('Shoe',shoeModel);