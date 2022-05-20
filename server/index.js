const express = require('express')
const speakeasy = require('speakeasy')
const uuid = require('uuid')
const mysql = require('mysql')
const cors = require('cors')

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cta'
});

db.connect((err) => {
    if (err) {
        console.log("Error creating connection")
    }
    console.log('MySQL Connected')
})

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/usernames', (req, res) => {
    db.query("SELECT username FROM users", (err, result) => {
        if (err) {
            console.log("Error creating connection")
        }
        res.send(result)
    })
})

app.post('/username/password', (req, res) => {
    const sql = `SELECT password FROM users WHERE username = "${req.body.username}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log("Error creating connection")
        }
        res.send(result)
    })
})

// CREATE USER & TEMP SECRET

app.post('/register', (req, res) => {
    const id = uuid.v4()
    const username = req.body.username
    const password = req.body.password
    const temp_secret = speakeasy.generateSecret()
    db.query("INSERT INTO users VALUES (?,?,?,?,FALSE)", [id, username, password, temp_secret.base32], (err, result) => {
        if (err) {
            console.log("Error creating connection")
        }
        console.log('User entered')
    })
})

// Verify token and make secret permanant

app.post('/api/verify', (req, res) => {
    const {token, userId} = req.body

    try {
        const path = `/user/${userId}`
        const user = db.getData(path)

        const { base32:secret } = user.temp_secret

        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        })

        if (verified) {
            db.push(path, { id: userId, secret: user.temp_secret })
            res.json({ verified: true })
         }
        else {
            res.json({ verified: false })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error finding user' })
    }
})

// Validate token

app.post('/api/validate', (req, res) => {
    const {token, userId} = req.body

    try {
        const path = `/user/${userId}`
        const user = db.getData(path)

        const { base32:secret } = user.secret

        const validates = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token, window: 1
        })

        if (validates) {
            res.json({ validated: true })
        }
        else {
            res.json({ validated: false })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error finding user' })
    }
})

