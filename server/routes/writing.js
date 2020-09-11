const express = require('express');
const router = express.Router();

const {auth} = require("../middleware/auth");
const multer = require("multer");

const {Writing} = require('../models/Writing');

router.post('/uploadWriting',(req, res)=>{
    //글을 서버에 저장한다.
    const writing = new Writing(req.body)
    writing.save((err,writing)=>{
      if (err) return res.json({success: false, err})///
      return res.status(200).json({
        success: true
      })
    })

})

router.get('/getWritings',(req, res)=>{

  Writing.find()
      .populate('writer')
      .exec((err,writings)=>{
          if (err) return res.status(400).send(err);
          res.status(200).json({success: true, writings})
      })
})

router.post('/getWritingDetail',(req, res)=>{

  Writing.findOne({"_id": req.body.writingId})//writingId?
      .populate('writer')
      .exec((err,writingDetail)=>{
          if (err) return res.status(400).send(err)
          return res.status(200).json({success:true, writingDetail})
      })
})

module.exports = router;