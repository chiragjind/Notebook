const express = require('express')
const router = express.Router();
const noteSchema = require('../modals/Notes')
const auth = require('../middleware/auth')
const {body,validationResult} = require('express-validator')
const cookieParser = require('cookie-parser'); 
const cors = require('cors')
router.use(cookieParser())
router.use(cors());

router.post('/addnotes',auth,[
    body('Title').isLength({ min: 5 }),
    body('Description').isLength({ min: 5 })
],async (req,res)=>{
    try {
        console.log('recieve request')
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {Title,Description,Tag}=req.body;
        const note = new noteSchema({
            Title:Title,
            Description:Description,
            user:req.user.id,
            Tag:Tag
        })
        const result = await note.save();
        res.status(201).json(result)
        
    } catch (error) {
        res.status(404).json(`error in addnote ${error}`)
    }
})
router.get('/fetchnotes',auth,async (req,res)=>{
    try {
        const user = req.user.id;
        const Result = await noteSchema.find({user:user})
        if(!Result){
            return  res.status(201).json("no data found")
        }
        if (Result.length === 0) {
            return res.status(404).json("No data found");
        }
        res.status(201).json(Result)
        
    } catch (error) {
        res.status(404).json(`error in fetch note ${error}`)
    }
})
router.put('/updatenotes/:id',auth,async (req,res)=>{
    try {
       
        const user = req.user.id;
        const note =await noteSchema.findById(req.params.id)
        if(!note){
            return res.status(400).json('no note found')
        }
       if(note.user.toString() !== user){
        return  res.status(400).json('user not match with note')
       }
      const  upnote = await noteSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
        const result = await upnote.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(`error in update note ${error}`)
    }
})
router.delete('/deletenotes/:id',auth,async (req,res)=>{
    try {
        const user = req.user.id;
        const note =await noteSchema.findById(req.params.id)
        if(!note){
            return res.status(400).json('no note found')
        }
       if(note.user.toString() !== user){
        return  res.status(400).json('user not match with note')
       }
        const  upnote = await noteSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(` delete successfull`);
    } catch (error) {
        res.status(404).json(`error in Delete note ${error}`)
    }
})



module.exports = router;