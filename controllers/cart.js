'use strict';

var Book = require('../models/bookModel');
var Category=require('../models/categoryModel');


module.exports = function (router) {


    router.get('/', function (req, res) {
        
        // Get Cart From Session
        var cart = req.session.cart;
        // var displayCart={title:[],items:[],total:[],qty:[],price:[]};
        var displayCart={items:[],total:0};
        var total=0;
        var qty=0;

        for(var item in cart){
            if(cart.hasOwnProperty(item)) {
        item = cart[item];
        console.log(item);
            // displayCart.items.push(item["item"]);
            // displayCart.total.push((item["qty"]*item["price"]));
            // displayCart.title.push(item["title"]);
            // displayCart.price.push(item["price"]);
            //  displayCart.qty.push(item["qty"]);
            var t=item["qty"]*item["price"];
            var a ={
                "items":item["item"],
                "total":t,
                "title":item["title"],
                "price":item["price"],
                "qty":item["qty"]
            };
            total+=t;
            displayCart.items.push(a);

        }
        }
        console.log(displayCart);
         displayCart.total=total;
            // displayCart.qty=qty;
        // Render Cart

        res.render('cart/index',{
            cart:displayCart
        });
    });



    router.get('/:id', function (req, res) {
        Book.findOne({
        	_id:req.params.id
        },function(err,book){
        	if(err){
        		console.log('error')
        	}
        	var model={
        		book:book
        	};
        	res.render('books/details',model)
        });
        
    });

router.post('/:id', function (req, res) {
       req.session.cart = req.session.cart || {};
       var cart =req.session.cart;

       Book.findOne({_id:req.params.id},function(err,book){
        if(err){
            console.log(err);
        }
        if(cart[req.params.id]){
            cart[req.params.id].qty++;

        }
        else{
            cart[req.params.id]={
                item:book._id,
                title:book.title,
                price:book.price,
                qty:1
            }
        }
        res.redirect('/cart');

       });

    });




};