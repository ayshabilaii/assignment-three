var express = require('express');
var router = express.Router();
let Shoe = require('../model/shoe.js');
const shoe = require('../model/shoe.js');
/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET collection page. 
router.get('/collection', function(req, res, next) { /*router gets requests for /collection path*/
  //const ShoeList = [ /*empty array to hold shoe info*/
 /* ];
  res.render('collection', { title: 'Collection', ShoeList: ShoeList });
});*/

router.get('/collection',async(req,res,next)=>{
  try{
      const ShoeList = await Shoe.find();
      res.render('collection',{
          title:'Collection',
          ShoeList:ShoeList
      })}
      catch(err){
          console.error(err);
          res.render('shoe/list',{
              error:'Error on the server'
          })
      }
      });

/* GET service page. */
router.get('/shoes', function(req, res, next) {
  res.render('index', { title: 'Shoes' });
});
/* GET contactus page. */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

module.exports = router;