var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({encoded:true}));
//creating array of objects temporarily
var campgrounds =[
    {name:"a", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"b", image:"https://pixabay.com/get/gcd1cd86fb6831e034f2d52da707d3699e588c588cb8f0f65ae77f2fa2c08449d1a284d636f340b23fedb69dc433ba715_340.jpg "},
    {name:"c", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"a", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"b", image:"https://pixabay.com/get/gcd1cd86fb6831e034f2d52da707d3699e588c588cb8f0f65ae77f2fa2c08449d1a284d636f340b23fedb69dc433ba715_340.jpg "},
    {name:"c", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"a", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"b", image:"https://pixabay.com/get/gcd1cd86fb6831e034f2d52da707d3699e588c588cb8f0f65ae77f2fa2c08449d1a284d636f340b23fedb69dc433ba715_340.jpg "},
    {name:"c", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "}  
];

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
  
  res.render("campgrounds",{cg:campgrounds});

});

app.post("/campgrounds", function(req,res){
    res.send("hello");
    
//add data from form and add to campgrounds array
//redirect to campgrounds page

});

app.get("/campgrounds/new",function(req,res){
res.render("new.ejs");
});

app.listen(80,"127.0.0.1",function(){
    console.log("The YelpCamp server has started");
});