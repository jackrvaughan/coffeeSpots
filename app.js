var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    User                = require("./models/user");
    
// Requiring Routes
var commentRoutes       = require("./routes/comments"),
    coffeespotRoutes    = require("./routes/coffeespots"), 
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/coffee_spots"
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Here's a secret msg",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/coffeespots/:id/comments", commentRoutes);
app.use("/coffeespots", coffeespotRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CoffeeSpots server has innitialized");
});