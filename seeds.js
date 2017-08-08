var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest", 
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Bacon ipsum dolor amet brisket corned beef flank shoulder tri-tip pig, meatball beef ribs. Prosciutto shank kielbasa jerky sirloin. Ball tip kielbasa ham hock beef, doner bacon fatback ham drumstick tongue flank pork chop short ribs pork loin. Tongue kevin porchetta frankfurter strip steak shoulder bacon biltong landjaeger pork chop jerky sausage. Leberkas doner jerky frankfurter prosciutto pork chop tenderloin pork andouille hamburger drumstick capicola. Landjaeger jowl kevin, ball tip jerky rump corned beef bacon pork belly sirloin. Chicken kevin rump jowl. Corned beef kevin tongue pastrami cupim burgdoggen cow tail sausage shankle ham meatloaf. Ground round sausage venison flank capicola pancetta kielbasa rump spare ribs. Porchetta ham ribeye, salami tail bresaola pig cupim strip steak prosciutto flank kevin. Jerky boudin sirloin chuck kevin, pork loin pastrami. Salami swine jerky, short ribs shank pork burgdoggen leberkas cupim chuck meatloaf. Pancetta prosciutto sirloin frankfurter ham hock, picanha strip steak andouille. Turkey short loin t-bone prosciutto landjaeger ball tip shank tail picanha turducken beef ribs kevin ham beef shankle. Pancetta shoulder shank, swine ball tip beef ribs shankle bresaola frankfurter tenderloin kevin. Pork chop shoulder cupim tail. Venison drumstick tongue frankfurter, jowl corned beef beef ribs chuck strip steak."
    },
    {
        name: "Canyon Valley", 
        image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
        description: "Bacon ipsum dolor amet brisket corned beef flank shoulder tri-tip pig, meatball beef ribs. Prosciutto shank kielbasa jerky sirloin. Ball tip kielbasa ham hock beef, doner bacon fatback ham drumstick tongue flank pork chop short ribs pork loin. Tongue kevin porchetta frankfurter strip steak shoulder bacon biltong landjaeger pork chop jerky sausage. Leberkas doner jerky frankfurter prosciutto pork chop tenderloin pork andouille hamburger drumstick capicola. Landjaeger jowl kevin, ball tip jerky rump corned beef bacon pork belly sirloin. Chicken kevin rump jowl. Corned beef kevin tongue pastrami cupim burgdoggen cow tail sausage shankle ham meatloaf. Ground round sausage venison flank capicola pancetta kielbasa rump spare ribs. Porchetta ham ribeye, salami tail bresaola pig cupim strip steak prosciutto flank kevin. Jerky boudin sirloin chuck kevin, pork loin pastrami. Salami swine jerky, short ribs shank pork burgdoggen leberkas cupim chuck meatloaf. Pancetta prosciutto sirloin frankfurter ham hock, picanha strip steak andouille. Turkey short loin t-bone prosciutto landjaeger ball tip shank tail picanha turducken beef ribs kevin ham beef shankle. Pancetta shoulder shank, swine ball tip beef ribs shankle bresaola frankfurter tenderloin kevin. Pork chop shoulder cupim tail. Venison drumstick tongue frankfurter, jowl corned beef beef ribs chuck strip steak."
    },
    {
        name: "Vintage Cove", 
        image: "https://farm4.staticflickr.com/3397/3662177625_a9c2e794be.jpg",
        description: "Bacon ipsum dolor amet brisket corned beef flank shoulder tri-tip pig, meatball beef ribs. Prosciutto shank kielbasa jerky sirloin. Ball tip kielbasa ham hock beef, doner bacon fatback ham drumstick tongue flank pork chop short ribs pork loin. Tongue kevin porchetta frankfurter strip steak shoulder bacon biltong landjaeger pork chop jerky sausage. Leberkas doner jerky frankfurter prosciutto pork chop tenderloin pork andouille hamburger drumstick capicola. Landjaeger jowl kevin, ball tip jerky rump corned beef bacon pork belly sirloin. Chicken kevin rump jowl. Corned beef kevin tongue pastrami cupim burgdoggen cow tail sausage shankle ham meatloaf. Ground round sausage venison flank capicola pancetta kielbasa rump spare ribs. Porchetta ham ribeye, salami tail bresaola pig cupim strip steak prosciutto flank kevin. Jerky boudin sirloin chuck kevin, pork loin pastrami. Salami swine jerky, short ribs shank pork burgdoggen leberkas cupim chuck meatloaf. Pancetta prosciutto sirloin frankfurter ham hock, picanha strip steak andouille. Turkey short loin t-bone prosciutto landjaeger ball tip shank tail picanha turducken beef ribs kevin ham beef shankle. Pancetta shoulder shank, swine ball tip beef ribs shankle bresaola frankfurter tenderloin kevin. Pork chop shoulder cupim tail. Venison drumstick tongue frankfurter, jowl corned beef beef ribs chuck strip steak."
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds!");    
            // Add a few campogrunds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a campground");
                        // create a comment
                        Comment.create(
                            {
                                text: "I absolutely love this place... but no plugs.. hrmp",
                                author: "BillyBoiiii"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else {
                                    campground.comments.push(comment);
                                    campground.save();      
                                    console.log("new comment");
                                }
                            });
                    }
                });    
            });
        }
    });    

    // Add a few comments
}

module.exports = seedDB;