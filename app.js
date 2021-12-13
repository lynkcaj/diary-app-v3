const express = require('express')
const db = require('./db/mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const session = require('express-session')
const flush = require('connect-flash')
const flash = require('req-flash')
const diaryRouter = require('./routers/diary')
const userRouter =  require('./routers/user')

db();
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.use(session({
    secret: 'secret',
    cookie: {maxAge : 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(flush());


app.use(diaryRouter)
app.use(userRouter)

module.exports = app;
