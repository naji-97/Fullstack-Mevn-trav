const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Midleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

const posts = require('./routes/api/post')
const port = process.env.PORT ||5000

app.use('/api/posts', posts)
// Handle Production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname+ '/public/'))

    // Handle SPA 
    app.get(/.*/, (req, res)=>res.sendFile(__dirname+ '/public/index.html'))
}

app.listen(port, ()=>console.log(`Server strated on port ${port}`))