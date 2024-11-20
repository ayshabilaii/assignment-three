//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let bookModel = mongoose.Schema({
    Brand: String,
    Size: Number,
    Color: String,
    Price: Number
},
{
    collection:"Bio_books"
});
module.exports =mongoose.model('Book',bookModel);
