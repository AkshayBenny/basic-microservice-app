const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const cors = require('cors')
var morgan = require('morgan')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.get('/events', async (req, res) => {
	const { type, data } = req.body
	if (type === 'CommentCreated') {
		const status = data.comment.includes('orange') ? 'rejected' : 'approved'
		try {
			await axios.post('http://localhost:4005/events', {
				type: 'CommentModerated',
				data: {
					id: data.id,
					postId: data.postId,
					status,
					comment: data.comment,
				},
			})
		} catch (error) {}
	}

	req.send({})
})

app.listen(4003, function () {
	console.log('Moderation service running on port 4003')
})
