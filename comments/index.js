const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const pid = req.params.id
    res.send(commentsByPostId[pid] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const { comment } = req.body
    const pid = req.params.id
    const commentId = uuidv4()

    const comments = commentsByPostId[pid] || []
    comments.push({ id: commentId, comment })

    commentsByPostId[pid] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: { id: commentId, comment, postId: pid },
    })

    res.send({
        message: 'Comment created successfully',
        comments,
    })
})

app.listen(5001, function () {
    console.log('Server is running on port 5001')
})
