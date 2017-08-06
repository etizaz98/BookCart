'use strict';

var mongoose = require('mongoose');


var bookModel=function(){
var bookSchema =mongoose.Schema({
title:String,
category:String,
description:String,
author:String,
publisher:String,
price:Number,
cover:String


});
// function to limit description
bookSchema.methods.truncText= function(Length)
{
	console.log(Length);
	var a="";
	a=this.description;
	console.log(typeof(a));
	console.log("Test hai bahi test hai".substring(0,50));

 
	return a.substring(0, Length);


}



return mongoose.model('Book',bookSchema);

}

module.exports=new bookModel();