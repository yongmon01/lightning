const express = require('express');
const router = express.Router();
const {Writing} = require('../models/Writing');
const {Join} = require('../models/Join')

router.post('/uploadWriting',(req, res)=>{
    const writing = new Writing(req.body)
    writing.save((err,writing)=>{
      if (err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

router.get('/getWritingsAll',(req, res)=>{
  Writing.find()
      .populate('writer')
      .exec((err,writings)=>{
          if (err) return res.status(400).send(err);
          res.status(200).json({success: true, writings})
      })
})

router.get("/getWritingsSoccer", (req, res) => {
  Writing.find({ 'category': "축구" })
    .populate('writer')
        .exec((err,writings)=>{
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, writings})
        })
});

router.get("/getWritingsSoccerTennis", (req, res) => {
  Writing.find({ 'category': "족구" })
    .populate('writer')
        .exec((err,writings)=>{
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, writings})
        })
});

router.get("/getWritingsSoccer", (req, res) => {
  Writing.find({ 'category': "축구" })
    .populate('writer')
        .exec((err,writings)=>{
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, writings})
        })
});

router.get("/getWritingsBasketball", (req, res) => {
  Writing.find({ 'category': "농구" })
    .populate('writer')
        .exec((err,writings)=>{
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, writings})
        })
});

router.get("/getWritingsBaseball", (req, res) => {
  Writing.find({ 'category': "야구" })
    .populate('writer')
        .exec((err,writings)=>{
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, writings})
        })
});

router.get("/getWritingsRunning", (req, res) => {
  Writing.find({ 'category': "러닝" })
    .populate('writer')
        .exec((err,writings)=>{
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, writings})
        })
});

router.post('/getWritingDetail',(req, res)=>{
  Writing.findOne({"_id": req.body.writingId})//writingId?
      .populate('writer')
      .exec((err,writingDetail)=>{
          if (err) return res.status(400).send(err)
          return res.status(200).json({success:true, writingDetail})
      })
})

router.post("/getJoinedWritings", (req, res) => {
    Join.find({ 'user': req.body.user })
    .exec((err, writings)=> {
        if(err) return res.status(400).send(err);

        let joinedWriting = [];

        writings.map((writing, i)=> {
          joinedWriting.push(writing.meeting)
        })

        Writing.find({ _id: { $in: joinedWriting }})
            .populate('writer')
            .exec((err, writings) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, writings })
            })
    })
});

module.exports = router;