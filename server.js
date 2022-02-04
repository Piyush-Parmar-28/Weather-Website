const express= require('express')
const port= process.env.PORT || 3000

const path= require('path')

const app= express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`)
})