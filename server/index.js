const express = require('express')
const app = express()
const port = 5000

const { User } = require('./models/User')
const bodyParser = require('body-parser')

const config = require('./config/key')

const cookieParser = require('cookie-parser')

const {auth} = require('./middleware/auth')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())

app.use(cookieParser())



//mongodb+srv://hoylee:<password>@boiler-plate-cluster.fqcfe.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('mongoDB connected!!!'))
  .catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('This is index.js page@')
})

app.post('/api/users/register',(req,res)=>{
  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if (err) return res.json({success: false, err})///
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login',(req,res)=>{

  //해당 이메일이 데이타베이스에있는지 확인
  User.findOne({email: req.body.email},(err,user)=>{
    if (!user){
      return res.json({
        loginSuccess: false,
        message: "없는 email 입니다."
      })
    }

    //이메일이 데이터 베이스에있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if (!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"})
      //비밀번호가 맞다면 토큰을 생성하기
      user.generateToken((err,user)=>{
        if (err) return res.status(400).send(err)

        //토큰을 쿠키에 저장
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })

  })


})

app.get('/api/users/auth',auth,(req,res)=>{

  //여기까지 미들웨어를 통과했다는 얘기는 Authentication이 True 라는것
  res.status(200).json({
    //req.user 를 쓸수있는 이유는 auth.js 에서 
    //req.token = token, req.user = user 해주었기때문
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout',auth,(req,res)=>{

  User.findOneAndUpdate({_id: req.user._id},{token: ""},(err,user)=>{
    if (err) return res.json({success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 5000)

app.get('/api/hello',(req,res)=>{
  res.send('안뇨옹~~~!')
})









app.use('/api/video',require('./routes/video'))

app.use('/api/writing',require('./routes/writing'))

app.use('/api/join',require('./routes/join'))
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })	