const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const { title } = req.body
    const id = uuidv4()
    posts[id] = { id, title }
    console.log(posts)
    res.send({ message: 'Post created successfully', post: { id, title } })
})

app.listen(5000, function () {
    console.log('Server is running on port 5000')
})
