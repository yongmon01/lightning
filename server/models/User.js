const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리 salt

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 20
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

userSchema.pre('save',function(next){
    var user = this

    if (user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err,salt){
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err,hash){
                if (err) return next(err)

                user.password = hash
                next()
            })
        })
    }
    else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if (err) return cb(err)
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this

    var token = jwt.sign(user._id.toHexString(), 'secreteToken')
    user.token = token
    user.save(function(err,user){
        if (err) return cb(err)
        cb(null, user)
    })
}

//static
userSchema.statics.findByToken = function(token, cb){
    var user = this;
    //토큰을 decode 한다
    jwt.verify(token, 'secreteToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token},function(err,user){
            if (err) return cb(err);
            cb(null,user)
        })
    })

}

//스키마를 모델로 감싸주기
const User = mongoose.model('User', userSchema)

//{}는 뭐야 대체
module.exports = {User}