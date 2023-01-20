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

const posts = {}

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/posts', async (req, res) => {
	const { title } = req.body
	const id = uuidv4()
	posts[id] = { id, title }

	try {
		await axios.post('http://localhost:4005/events', {
			type: 'PostCreated',
			data: { id, title },
		})
	} catch (error) {
		console.log(error)
	}

	res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type)
	res.send({})
})

app.listen(4000, function () {
	console.log('Posts service running on port 4000')
})
