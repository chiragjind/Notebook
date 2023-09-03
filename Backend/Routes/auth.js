const express = require('express')
const router = express.Router();
const userSchema = require('../modals/User')
const {body,validationResult} = require('express-validator')
const JWT_SCERET='mynameischiragjindal'
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser'); 
const auth = require('../middleware/auth')

router.use(cookieParser())

router.post('/Createuser',[
    body('Email','write valid email').isEmail(),
    body('Name','name must be five character').isLength({min:4}),
    body('Password','password must be 5 character').isLength({min:5}),
],async(req,res)=>{
    try {
        let success =false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({errors: errors.array()})
        }
        const userexit = await userSchema.findOne({Email:req.body.Email});
        if(userexit){
            return res.status(404).json('User already exit')
        }
        const user = new userSchema(req.body)
        const data={
            user:{
                id:user._id
            }
        }
        const token = await jwt.sign(data,JWT_SCERET)
        res.cookie("authtoken",token,{
            expires:new Date(Date.now() + 3000000),
            httpOnly:true
           });
        const result =await user.save();
        success=true;
        res.json({ success,token });

    } catch (error) {
        res.status(404).send(`Error in user post method 1${error}`)
    }
})


router.post('/Loginuser',[
    body('Email','write valid email').isEmail(),
    body('Password','password must be 5 character').isLength({min:5}),
],async(req,res)=>{
   try {
    let success = false;
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({errors: errors.array()})
        }
   
     const {Email,Password} = req.body;
    const Result = await userSchema.findOne({Email:Email})
    
    if(!Result){
      return  res.status(400).json('User Not exist')
    }
    const passwordcompare = await bcrypt.compare(Password,Result.Password)
    if(!passwordcompare){
        return res.status(400).json('password Not compare')
    }
    const data={
        user:{
            id:Result._id
        }
    }
    const token = await jwt.sign(data,JWT_SCERET)
    res.cookie("authtoken",token,{
        expires:new Date(Date.now() + 3000000),
        httpOnly:true
       });

       success=true;
       res.json({ success,token });
   } catch (error) {
     res.status(404).json(`error in loginuser${error}`)
   }
})


router.get('/Userdetail',auth,async (req,res)=>{
    try {
        const response = await userSchema.findById(req.user.id)
        res.status(201).json(`success${response}`)
    } catch (error) {
        res.status(404).json(`error in userdetail ${error}`)
    }
})



module.exports = router;