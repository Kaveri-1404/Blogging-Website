var mongoose=require("mongoose");
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String
    });

    var Campground = db.model("Campground",campgroundSchema );
    
     module.exports=Campground;