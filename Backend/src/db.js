const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/Notebook'
const connecttomongo = async()=>{
    try {
       mongoose.connect(url).then(()=>{
            console.log('connection successful')
           })
        
    } catch (error) {
        console.log('error in mongoose connect')
    }
    
}

module.exports = connecttomongo;