var express = require("express");
var router = express.Router();
var Coffeespot = require("../models/coffeespot");
var middleware = require("../middleware");

// INDEX - Show new coffeespots
router.get("/", function(req, res){
    // get all coffeespots from DB
    Coffeespot.find({}, function(err, allCoffeespots){
        if (err){
            console.log(err);
        } else {
            res.render("coffeespots/index", {coffeespots:allCoffeespots});
        }
    });
});

// CREATE - Add new coffeespots to database
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCoffeespot = {name: name, image: image, description: desc, author:author};
    // create a new coffeespot and save to DB
    Coffeespot.create(newCoffeespot, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/coffeespots");
        }
    });
});

// NEW - Show form to create new coffeespots
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("coffeespots/new");    
});

// SHOW - shows more info about one coffeespots
router.get("/:id", function(req, res){
    // find the coffeespot with provided ID
    Coffeespot.findById(req.params.id).populate("comments").exec(function(err, foundCoffeespot){
       if(err){
           console.log(err);
       } else {
           console.log(foundCoffeespot);
           // render the show template with that coffeespot
           res.render("coffeespots/show", {coffeespot: foundCoffeespot});
       }
    });
});

// EDIT COFFEESPOT ROUTE
router.get("/:id/edit", middleware.checkCoffeespotOwnership, function(req, res){
    Coffeespot.findById(req.params.id, function(err, foundCoffeespot){
        res.render("coffeespots/edit", {coffeespot: foundCoffeespot});
    });
});

// UPDATE COFFEESPOT ROUTE
router.put("/:id", middleware.checkCoffeespotOwnership, function(req, res){
    // find and update the correct coffeespot
    Coffeespot.findByIdAndUpdate(req.params.id, req.body.coffeespot, function(err, updatedCoffeespot){
        if(err){
            res.redirect("/coffeespots");
        } else {
            res.redirect("/coffeespots/" + req.params.id);
        }
    });
});

// DESTROY COFFEESPOT ROUTE
router.delete("/:id", middleware.checkCoffeespotOwnership, function(req, res){
    Coffeespot.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/coffeespots");
        } else {
            res.redirect("/coffeespots");
        }
    });
});

module.exports = router;