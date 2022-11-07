const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const pid = req.query.params
    res.send(commentsByPostId[pid] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const { comment } = req.body
    const pid = req.params.id
    const commentId = uuidv4()

    const comments = commentsByPostId[pid] || []
    comments.push({ id: commentId, comment })

    commentsByPostId[pid] = comments

    res.send({
        message: 'Comment created successfully',
        comments,
    })
})

app.listen(6000, function () {
    console.log('Server is running on port 6000')
})
