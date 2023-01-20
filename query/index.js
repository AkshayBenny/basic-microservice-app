const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/posts', async (req, res) => {
	const { title } = req.body
	const id = uuidv4()
	posts[id] = { id, title }
	await axios.post('http://localhost:4005/events', {
		type: 'PostCreated',
		data: { id, title }, 
	})
	res.send(posts[id])
})

app.listen(4002, function () {
	console.log('Server is running on port 5000')
})
