/* var mongoose=require('mongoose');
var index = require('./index');
// create an schema
var userSchema = new mongoose.Schema({
            _id: Number,
            fname: String,
            lname:String,
            uname: String,
            email:String,
            contact: Number,
            datebirth:Number,
            city:String,
            address:String
        });
var userTable=mongoose.model('users',userSchema);
        
module.exports={
     
     fetchData:function(callback){
        var userData=userTable.find({});
        userData.exec(function(err, data){
            if(err) throw err;
            return callback(data);
        })
        
     }
}

*/