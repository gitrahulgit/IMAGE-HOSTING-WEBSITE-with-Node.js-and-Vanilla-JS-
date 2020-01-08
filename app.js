var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
// //new PACKAGES IMPORTED for authentication
// var LocalStratergy = require("passport-local");
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var passportLocalMongoose = require("passport-local-mongoose");
//authentication files inclusion ended
mongoose.connect("mongodb://localhost/yelp");
app.set("view engine", "ejs");


// Schema setup//
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: String,
    author: String
});
//modelling schema
var Campground = mongoose.model("Campgrounds", campgroundSchema);

// Campground.create({

//             name: "MOUNTAIN",

//             image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",

//             description: "This is a beautiful Campground",
//             comments: "Wao..this is an amazing campground",
//             author: "Roman"
//         }, {

//             name: "GRANITE",

//             image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",

//             description: "This is a beautiful Campground",
//             comments: "Beautiful picture!!",
//             author: "Tusker"
//         }, {

//             name: "SALMON",

//             image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",

//             description: "This is a beautiful Campground",
//             comments: "Wao..this is an amazing campground",
//             author: "Rob"
//         }, {

//             name: "FREAK",

//             image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",

//             description: "This is a beautiful Campground",
//             comments: "Wao..this is an amazing campground",
//             author: "Samriddh"
//         },


// function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         //console.log("NEWLY CREATED CAMPGROUNDS");
//         //console.log(campground);
//     }
// });

// var campgrounds = [
//     { name: "SALMON", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { name: "GRANITE", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { name: "MOUNTAIN", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { name: "FREAK", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     {name:  "LACORT", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
// ];




//routes below
app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX--show  all the campgrounds
app.get("/campgrounds", function(req, res) {
    // get all campgrounds from database 
    Campground.find({}, function(err, allcampgrounds) {
        if (err) {
            console.log("error");
        } else {
            res.render("index", { campgrounds: allcampgrounds }); // {NAME : DATA(which we are passing)}
        }
    });
});

// CREATE--add new campgrounds to db
app.post("/campgrounds", function(req, res) {

    //get data from form and add it to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };

    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);

        } else {

            //redirecting back to campground page
            res.redirect("/campgrounds");
        }
    });
})


//SHOW-- form to submit any image
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//SHOW--showing info. on clicking on any image
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided id 
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: foundCampground });
        }
    });
})




//Authentication routes
app.get("/register", function(req, res) {
    res.render("register");

});

app.get("/campgrounds/:id/comments", function(req, res) {

    Campground.findById(req.params.id, function(err, comments) {
        if (err) {
            res.redirect("/campgrounds/:id");

        } else {
            //console.log("fine");
            res.render("comments", { words: comments });

        }
    })

});



// 








































































app.listen(7000, function(req, res) {
    console.log("i am on");
});