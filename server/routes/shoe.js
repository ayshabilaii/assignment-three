var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Shoe = require('../model/shoe.js');
const shoe = require('../model/shoe.js');
let shoeController = require('../controllers/shoe.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const ShoeList = await Shoe.find(); // retrieve all documents from the Shoe collection
    res.render('shoe/list',{
        title:'Shoes',
        ShoeList:ShoeList // passes list of shoes to view
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
        // create new shoe object with the form data
        let newShoe = Shoe({
            "Brand":req.body.Brand,
            "Size":req.body.Size,
            "Color":req.body.Color,
            "Price":req.body.Price
        });
        Shoe.create(newShoe).then(()=>{
            res.redirect('/shoeslist');
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
        const id = req.params.id; // extracts the shoe ID from the URL
        const shoeToEdit= await shoe.findById(id);
        res.render('shoe/edit',
            {
                title:'Edit Shoe',
                Shoe:shoeToEdit
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
        let updatedShoe = Shoe({
            "_id":id,
            "Brand":req.body.Brand,
            "Size":req.body.Size,
            "Color":req.body.Color,
            "Price":req.body.Price
        });
        Shoe.findByIdAndUpdate(id,updatedShoe).then(()=>{
            res.redirect('/shoeslist')
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
        Shoe.deleteOne({_id:id}).then(()=>{
            res.redirect('/shoeslist')
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