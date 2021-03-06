const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    donner:{
        type:Boolean,
    },
    avtar:Buffer,
});

userScheme.pre('save',function(next){
    const user=this;
    if (!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        })
    });
});

userScheme.methods.comparePassword=function(candidatePassword){
    // console.log(1,candidatePassword)
    const user=this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            // console.log(user.password)
            if (err){
                // return reject(err);
                return err;
            }
            if(!isMatch){
                console.log("Password Not Matched");
                return reject(false);
            }
            resolve(true);
        });
    });
}

mongoose.model('User',userScheme);