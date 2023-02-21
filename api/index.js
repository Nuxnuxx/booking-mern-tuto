const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const user = require('./models/User.jsx')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: 'http://localhost:5173'
}))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)

app.post('/register', async (req, res) => {
	const { name, password, email } = req.body
	try {
		const UserDoc = await user.create({
			name,
			password: bcrypt.hashSync(password, bcryptSalt),
			email
		})
		res.json(UserDoc)
	} catch (e) {
		res.status(422).json(e)
	}
})

app.post('/login', async (req, res) => {
	const {password, email } = req.body
	const userCredit = await user.findOne({email})
	if (userCredit){
		const isMatch = bcrypt.compareSync(password, userCredit.password)
		if (isMatch){
			jwt.sign({email:userCredit.email, id:userCredit.id,name:userCredit.name}, jwtSecret, {}, (err,token) => {
				if (err) throw err;
				res.cookie('token', token).json(userCredit)
			})
		} else {
			res.status(422).json('password wrong')
		}
	} else {
		res.json('not found')
	}
})

app.get('/profile', (req,res) => {
	const {token} = req.cookies
	if (token) {
		jwt.verify(token, jwtSecret, {},async (err, userdata) => {
			if (err) throw err;
			const {name,email,_id} = await user.findById(userdata.id)
			res.json({name,email,_id})
		})
	} else {
		res.json(null)
	}
})

app.post('/logout', (req,res) => {
	res.clearCookie('token').json(true)
})

app.listen(3000)
