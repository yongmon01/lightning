const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JoinSchema = mongoose.Schema({
    meeting: {
        type: Schema.Types.ObjectId,
        ref: 'Writing'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
    //만든날짜 업데이트날짜 기록가능
    { timestamps: true })



//스키마를 모델로 감싸주기
const Join = mongoose.model('Join', JoinSchema)

//{}는 뭐야 대체
module.exports = {Join}