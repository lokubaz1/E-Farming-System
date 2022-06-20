var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var router = express.Router();
var path = require('path');
var express = require('express');
var ejs = require('ejs');

//var fetchController= require('./fetch-controller');
//router.get('/fetch-data',fetchController.fetchData);
//module.exports = router;
const app = express();

app.engine('ejs', require('ejs').__express);
app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting database"))
db.once('open',()=>console.log("Connected to database"))

/*app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
  });
  
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
  });  */
  app.get("/farm.mp4", (req, res) => {
    res.sendFile(path.join(__dirname, "./videos/farm.mp4"));
  });

  router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

 router.get('/seller', function(req,res) {
     res.send(publicPath +'/seller.html');
     });

     router.get('/user', function(req,res) {
        res.sendFile(publicPath +'/user.html');
        }); 
        
        router.get('/seller_in', function(req,res) {
            res.send(publicPath +'/seller_in.html');
            });

            router.get('/add_item', function(req,res) {
                res.sendFile(publicPath +'/add_item.html');
                });
                router.get('/buyer_login', function(req,res) {
                    res.send(publicPath +'/buyer_login.html');
                    });

                    router.get('/contact', function(req,res) {
                        res.sendFile(publicPath +'/add_item.html');
                        });
                        router.get('/admin', function(req,res) {
                            res.send(publicPath +'/admin.html');
                            });
                           
                                router.get('/item_success', function(req,res) {
                                    res.send(publicPath +'/item_success.html');
                                    });

                                    router.get('/buyer', function(req,res) {
                                        res.sendFile(publicPath +'/buyer.html');
                                        });

                                        router.get('/complain', function(req,res) {
                                            res.send(publicPath +'/complain.html');
                                            });

                                            router.get('/about', function(req,res) {
                                                res.sendFile(publicPath +'/about.html');
                                                }); 
                                                
                                                router.get('/products', function(req,res) {
                                                    res.send(publicPath +'/products.html');
                                                    }); 

                                                    router.get('/payment', function(req,res) {
                                                        res.sendFile(publicPath +'/payment.html');
                                                        }); 
                                       
                                                        router.get('/order', function(req,res) {
                                                            res.send(publicPath +'/order.html');
                                                            }); 
// create an schema for farmers
var userSchema = {
    _id: String,
    fname: String,
    lname:String,
    uname: String,
    email:String,
    contact: Number,
    datebirth:Number,
    city:String,
    address:String
};
var userTable = mongoose.model('users',userSchema);
                                   
router.get('/view_farmer', (req,res) => {
    userTable.find({}, function(err, user) {
        res.render('view_farmer', {
            userData: user
        })
    });

})
      
  // DELETE USER
router.delete("/:_id", function(req, res) {
    userTable.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/view_farmer");
        } else {
            res.render("view_farmer");
        }
    });
});

// create an schema for crops
var userSchema = {
   
    cname: String,
    crop: String,
    rname:String,
    id: String,
    fd: String,
    r: Number,
   
};
var cropTable = mongoose.model('crops',userSchema, 'crops');
                                   
router.get('/crop_recieve', (req,res) => {
    cropTable.find({}, function(err, crop) {
        res.render('crop_recieve', {
            cropData: crop
        })
    });

})
// create schema for crops to be seen
var userSchema = {
   
    cname: String,
    crop: String,
    rname:String,
    id: String,
    fd: String,
    r: Number,
   
};
var cropTable = mongoose.model('crop',userSchema, 'crops');
                                   
router.get('/view_item', (req,res) => {
    cropTable.find({}, function(err, crop) {
        res.render('view_item', {
            cropData: crop
        })
    });

})

// create schema for crops to be buyed
var userSchema = {
   
    cname: String,
    crop: String,
    rname:String,
    id: String,
    fd: String,
    r: Number,
   
};
var cropTable = mongoose.model('item',userSchema, 'crops');
                                   
router.get('/buy', (req,res) => {
    cropTable.find({}, function(err, crop) {
        res.render('buy', {
            cropData: crop
        })
    });

})
// create an schema for buyers
var userSchema = {
    _id: String,
    fname: String,
    lname:String,
    uname: String,
    email:String,
    contact: Number,
    address:String
};
var buyerTable = mongoose.model('buyers',userSchema);
                                   
router.get('/view_buyer', (req,res) => {
    buyerTable.find({}, function(err, user) {
        res.render('view_buyer', {
            buyerData: user
        })
    });

})

// create an schema for complains
var userSchema = {
    
    fname:String,
    id:String,
    c:String,
    cd:String
};
var complainTable = mongoose.model('complains',userSchema);
                                   
router.get('/view_complain', (req,res) => {
    complainTable.find({}, function(err, user) {
        res.render('view_complain', {
            complainData: user
        })
    });

})


var userSchema = {
    _id: String,
    status: String,
    
};
var statusTable = mongoose.model('confirm',userSchema);
                                   
router.get('/result', (req,res) => {
    statusTable.find({}, function(err, user) {
        res.render('result', {
            statusData: user
        })
    });

})

app.post("/sign_up",(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var uname = req.body.uname;
    var password = req.body.password;
    var datebirth = req.body.datebirth;
    var email= req.body.email;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var contact = req.body.contact;
    

    var data = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "uname": uname,
        "password": password,
        "datebirth": datebirth,
        "address": address,
        "city": city,
        "state": state,
        "contact": contact
        
    }
   



    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('success.html')
})

app.post("/buy_sign",(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var uname = req.body.uname;
    var email= req.body.email;
    var address = req.body.address;
    var contact = req.body.contact;
    

    var data = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "uname": uname,
        "address": address,
        "contact": contact
    }
   



    db.collection('buyers').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('buyer_login.html')
})

//payment 
app.post("/payment",(req,res)=>{
    var cardname = req.body.cardname;
    var cardnumber = req.body.cardnumber;
    var expmonth = req.body.expmonth;
    var expyear= req.body.expyear;
    var cvv = req.body.cvv;

    

    var data = {
        "cardname": cardname,
        "cardnumber": cardnumber,
        "expmonth": expmonth,
        "expyear": expyear,
        "cvv": cvv
       
    }
   



    db.collection('payment').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('order.html')
})
 app.post("/login",(req,res)=>{
    var psw = req.body.psw;
    var uname = req.body.uname;
    

    var data = {
        "psw": psw,
        "uname": uname,
         }
         db.collection('items').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('seller_in.html')
    }) 
    app.post("/confirms",(req,res)=>{
        var status = req.body.status;
       
        
    
        var data = {
            "status": status,
           
             }
             db.collection('confirms').insertOne(data,(err,collection)=>{
                if(err){
                    throw err;
                }
                console.log("Record Inserted Successfully");
            });
        
            return res.redirect('result')
        }) 

    app.post("/new",(req,res)=>{
        var psw = req.body.psw;
        var uname = req.body.uname;
        
    
        var data = {
            "psw": psw,
            "uname": uname,
             }
             db.collection('items').insertOne(data,(err,collection)=>{
                if(err){
                    throw err;
                }
                console.log("Record Inserted Successfully");
            });
        
            return res.redirect('buyer.html')
        }) 
    
 app.post("/admin",(req,res)=>{
    var psw = req.body.psw;
    var uname = req.body.uname;
    

    var data = {
        "psw": psw,
        "uname": uname,
         }
         db.collection('items').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('admin.html')
    })  

    app.post("/action_page",(req,res)=>{
        var cname = req.body.cname;
        var crop = req.body.crop;
        var id = req.body.id;
        var rname = req.body.rname;
        var fd = req.body.fd;
        var r = req.body.r;
        
    
        var data = {
            "cname": cname,
            "crop": crop,
            "id": id,
            "rname": rname,
            "fd": fd,
            "r": r,
             } 

             db.collection('crops').insertOne(data,(err,collection)=>{
                if(err){
                    throw err;
                }
                console.log("Record Inserted Successfully");
            });
        
            return res.redirect('item_success.html')
        })

       

        app.post("/complain_page",(req,res)=>{
            var fname = req.body.fname;
            var id = req.body.id;
            var c = req.body.c;
            var cd = req.body.cd;
           
            
        
            var data = {
                "fname": fname,
                "id": id,
                "c": c,
                "cd": cd,
                 } 
    
                 db.collection('complains').insertOne(data,(err,collection)=>{
                    if(err){
                        throw err;
                    }
                    console.log("Record Inserted Successfully");
                });
            
                return res.redirect('complain-success.html')
            })
/* app.get("/",(req,res)=>{
    res.set({ "Allow-access-Allow-Origin": '*'
})

    return res.redirect('index.html');

}).listen(3000);

console.log("Listening on PORT 3000"); */
app.post("/contact_page",(req,res)=>{
  
    var fname = req.body.fname;
    var lname = req.body.lname;
    var ename = req.body.ename;
    var country = req.body.country;
    var subject = req.body.subject;
    

    var data = {
        "fname": fname,
        "lname": lname,
        "ename": ename,
        "country": country,
        "subject": subject,
         } 

         db.collection('contact').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('contact-success.html')
    })

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');