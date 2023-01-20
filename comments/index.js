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

	res.status(201).send({
		comments,
	})
})

app.listen(4001, function () {
	console.log('Comments service running on port 4001')
})
