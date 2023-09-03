const connecttomongo = require('./db');
var cors = require('cors');
connecttomongo();

const express = require('express')
const app = express()
const port = 8000


app.use(cors());
app.use(express.json());

app.use('/api/auth',require('../Routes/auth'))
app.use('/api/note',require('../Routes/Notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*',(req,res)=>{
    res.send('page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})