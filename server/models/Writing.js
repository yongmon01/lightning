const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const writingSchema = mongoose.Schema({

    writer: {
        //타입을 이렇게 주는이유는 이러면 유저 정보를
        //모두 긁어올수있기때문
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    locations: {
        type: String,
    },
    // filePath : {
    //     type: String,
    // },
    category: String,
    views : {
        type: Number,
        default: 0 
    },
    // duration :{
    //     type: String
    // },
    // thumbnail: {
    //     type: String
    // }
}, 
    //만든날짜 업데이트날짜 기록가능
    { timestamps: true })



//스키마를 모델로 감싸주기
const Writing = mongoose.model('Writing', writingSchema)

//{}는 뭐야 대체
module.exports = {Writing}