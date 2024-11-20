var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Book = require('../model/shoe.js');
const book = require('../model/shoe.js');
let bookController = require('../controllers/shoe.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const BookList = await Book.find();
    res.render('shoe/list',{
        title:'Shoes',
        BookList:BookList
    })}
    catch(err){
        console.error(err);
        res.render('shoe/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Shoe/add',{
            title: 'Add Shoe'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('shoe/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newBook = Book({
            "Brand":req.body.Brand,
            "Size":req.body.Size,
            "Color":req.body.Color,
            "Price":req.body.Price
        });
        Book.create(newBook).then(()=>{
            res.redirect('/bookslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('shoe/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const bookToEdit= await Book.findById(id);
        res.render('shoe/edit',
            {
                title:'Edit Shoe',
                Book:bookToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedBook = Book({
            "_id":id,
            "Brand":req.body.Brand,
            "Size":req.body.Size,
            "Color":req.body.Color,
            "Price":req.body.Price
        });
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/bookslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('shoe/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect('/bookslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('shoe/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;