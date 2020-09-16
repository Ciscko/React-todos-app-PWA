const express = require('express')
const path = require('path')
let app = express()
let port = process.env.PORT || 3000
let publicFolder = path.join(__dirname,'.','build')
app.use(express.static(publicFolder))
app.get("*", (req, res) => {
    res.sendFile(path.join(publicFolder, 'index.html'))
})
app.listen(port, () => {
    console.log(
     'Node app running...'   
    )
})
