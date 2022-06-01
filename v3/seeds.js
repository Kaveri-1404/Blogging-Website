var mongoose = require("mongoose");
var Campground = require("./models/camp");
var Comment = require("./models/comments");

var data = [
    {
        name: "Cloud's rest",
        image: "https://pixabay.com/get/g1c65db70a9929b3ccc11bfb5054a4b0db9f43f2dcbf88da34ec4f316cac5295896f9ce875e33a22c672c3fb9d1f090bc_340.jpg",
        description: "best camp",
        
    },
    { name: "b", image: "https://pixabay.com/get/ge37b3fe2c63d4592238f626fc815b433621ba34560989f9576c755f95b30742f1f90123f1adc5e32756f6e27bac7ab45_340.jpg " },
    {
        name: "hehe camp",
        image: "https://pixabay.com/get/g1c65db70a9929b3ccc11bfb5054a4b0db9f43f2dcbf88da34ec4f316cac5295896f9ce875e33a22c672c3fb9d1f090bc_340.jpg",
        description: "good"
    }
]

function seedDb() {
    //remove all campgrounds

    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }

        console.log("removed");
        //add few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, passedCampground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added");
                    //add comments
                    Comment.create(
                        {
                            text: "this is a great place",
                            author: "homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                
                                passedCampground.comments.push(comment);
                                passedCampground.save();
                                console.log("created comment");
                            }
                        }

                    );

                }
            });

        });


    });

}



module.exports = seedDb;

