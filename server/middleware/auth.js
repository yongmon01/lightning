const {User} = require('../models/User');

let auth = (req,res,next) =>{
    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    User.findByToken(token, (err,user)=>{
        if (err) throw err;
        if (!user) return res.json({isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };