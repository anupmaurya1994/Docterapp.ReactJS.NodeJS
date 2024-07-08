const express = require('express')
var cors = require('cors')
const app = express()
const router = require('./router/router')
const port = 3004
const db = require('./model')
app.use(express.json())
app.use(cors())
app.use('/api',router)
db.mongoose.connect(db.mongodb,{}).then(()=>{
    console.log('Database connected!!!')
}).catch((err)=>{
    console.log("Database not connected! ",err)
})
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})