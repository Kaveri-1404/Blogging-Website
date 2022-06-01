var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/camp.js");
var Comment=require("./models/comments.js");
var User=require("./models/user.js");

var seedDb=require("./seeds"); 
const user = require("./models/user.js");

seedDb(); 

//passport config
app.use(require("express-session")({
 secret:"hey there",
 resave:false,
 saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/yelp_camp");


/*var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String
    });

    var Campground=mongoose.model("Campground", campgroundSchema);*/


app.use(bodyParser.urlencoded({encoded:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");


//schema set up


/*Campground.create({
             name:"a",
             image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg ",
             description:"this is a beautiful granite....hehe:)"            
            },function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("newly created campground");
                    
                }
            }
            
            );*/
              



//creating array of objects temporarily
/*var campgrounds =[
    {name:"a", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"b", image:"https://pixabay.com/get/gcd1cd86fb6831e034f2d52da707d3699e588c588cb8f0f65ae77f2fa2c08449d1a284d636f340b23fedb69dc433ba715_340.jpg "},
    {name:"c", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"a", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"b", image:"https://pixabay.com/get/gcd1cd86fb6831e034f2d52da707d3699e588c588cb8f0f65ae77f2fa2c08449d1a284d636f340b23fedb69dc433ba715_340.jpg "},
    {name:"c", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"a", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "},
    {name:"b", image:"https://pixabay.com/get/gcd1cd86fb6831e034f2d52da707d3699e588c588cb8f0f65ae77f2fa2c08449d1a284d636f340b23fedb69dc433ba715_340.jpg "},
    {name:"c", image:"https://pixabay.com/get/g1308f6ef318a5a0f76b90ef4dafffb40dbc5b498be1a1dc9b2645af56b9ea269a42032b6bc67750552172311c216e286_340.jpg "}  
];*/



app.get("/",function(req,res){
    res.render("landing");
    
});

app.get("/campgrounds",function(req ,res){
  //get all campgrounds from db
  Campground.find({},function(err,allCampgrounds){
      if(err){
          console.log(err);

      }
      else{
        res.render("campgrounds",{cg:allCampgrounds,currentUser:req.user});
      }
  });
  

});

app.post("/campgrounds", function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var newCampground={name:name, image:image, description:description};
    //create new campground and add to database
    Campground.create(newCampground,function(err,newlyCewated){
 if(err){
     console.log(err);
 }
 else{
    res.redirect("/campgrounds");
 }
    });
    
//add data from form and add to campgrounds array
//redirect to campgrounds page

});





app.post("/campgrounds/:id/comments",isloggedIn,function(req,res){
    
    Campground.findById(req.params.id,function(err,thiscampground){
       if(err){
           console.log(err);
       }
       else{
         Comment.create(req.body.comment,function(err,ct){
             if(err){
                 console.log(err);
             }
             else{
                 console.log(ct);
                 thiscampground.comments.push(ct);
                 thiscampground.save();
                 
                 res.redirect("/campgrounds/"+thiscampground._id);
                 
             }
         });

       }
    });
 
});






app.get("/campgrounds/new",function(req,res){
res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err){
        console.log(err);
    }
    else{
        res.render("show",{cg:foundCampground});
    }
    });
   
});

//===========
//Comments routes

app.get("/campgrounds/:id/comments/new",isloggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
    if(err){
        console.log(err);
    }
    else{
        res.render("newcomment",{cg:campground});
    }
    });
 
});

//auth routes
//show register form
app.get("/register",function(req,res){
res.render("register");
});

//handle sign up logic
app.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
user.register(newUser, req.body.password, function(err,user){
    if(err){
        console.log(err);
        return res.render("register");
    }
    passport.authenticate("local")(req,res,function(){
     res.redirect("/campgrounds");
    });
});
});

//show login form
app.get("/login", function(req,res){
res.render("login");
});

//login logic
app.post("/login", passport.authenticate("local",
{successRedirect:"/campgrounds",
failureRedirect:"/login"
}),function(req,res){
  
});

//logout route
app.get("/logout",function(req,res){
req.logout(function(err){
    if(err){
        console.log(err);
    }
});
res.redirect("/campgrounds");
});


function isloggedIn(req,res,next){
    if(req.isAuthenticated()){
return next();
    }
    res.redirect("/login");
};

app.listen(80,"127.0.0.1",function(){
    console.log("The YelpCamp server has started");
});