const express = require('express');
const router = express.Router();
const urlmodel=require('../model/url')
router.get('/', async(req, res)=>{
    if(!req.user) return res.redirect('/login')
    const allURLS=await urlmodel.find({createdBy: req.user._id})
    return res.render('home', {
        urls:allURLS
    })
})
router.get('/signup', (req,res)=>{
    return res.render('signup')
})
router.get('/login', (req,res)=>{
    return res.render('login', { error: null })
})
module.exports = router;
