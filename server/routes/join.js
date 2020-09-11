const express = require('express');
const router = express.Router();
const {Join} = require('../models/Join');

router.post("/joinedNumber",(req,res)=>{
    Join.find({'meeting': req.body.meeting})
    .exec((err,join)=>{//join
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true, joinedNumber: join.length})
    })
})

router.post("/joined",(req,res)=>{
    Join.find({'meeting': req.body.meeting, 'user':
    req.body.user})
    .exec((err,join)=>{
        if(err) return res.status(400).send(err)
        let result = false
        if (join.length !== 0){
            result = true
        }
        res.status(200).json({success:true, joined: result})
    })
})

router.post("/cancelJoin",(req,res)=>{
    Join.findOneAndDelete({
        meeting: req.body.meeting, user: req.body.user
    }).exec((err,doc)=>{
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, doc})
    })
})

router.post("/join",(req,res)=>{
    const join = new Join(req.body)

    join.save((err, doc)=>{
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true})
    })
})

// router.post("/getJoinedMeetings", (req, res) => {
//     console.log('??')
//     Join.find({ 'user': req.body.user })
//     .exec((err, joiner)=> {
//         if(err) return res.status(400).send(err);
  
//         let joinedMeetings = [];
  
//         joiner.map((join, i)=> {
//             joinedMeetings.push(join.meeting)
//         })
  
//         //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
//         Join.find({ meeting: { $in: joinedMeetings }})
//             .populate('meeting')
//             .exec((err, meetings) => {
//                 if(err) return res.status(400).send(err);
//                 res.status(200).json({ success: true, meetings })
//             })
//     })
//   });


module.exports = router;