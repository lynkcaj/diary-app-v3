const express = require('express')
const User = require('../models/user')
const session = require('express-session')

const router = new express.Router()

router.get('/users/login', (req, res)=>{
    return res.render('login', {message: req.flash('message')});
})

router.get('/users', (req, res)=>{
    return res.render('user', {message: req.flash('message')});
})

router.post('/users', async (req, res) => {

    const confirm_password = req.body.confirm_password;
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        birthDate: req.body.birthDate,
        email: req.body.email,
        password: req.body.password
    })

    if (user.password == confirm_password){
        try {
            await user.save()
            //const token = await user.generateAuthToken()
            // res.status(201).send({ user, token })
            res.redirect('/users/login');
        } catch (e) {
            res.status(400).send(e)
        }
    }else{
        return res.status(400).send("Password don't match!");
    }
})

router.post('/users/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email!='' && password!=''){ 
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            //const token = await user.generateAuthToken()
            //res.send({ user, token })
            res.redirect('/diaryList');
        } catch (e) {
            req.flash('message', 'Unable to login, invalid email or password!')
            res.redirect('/users/login');
        }
    }
})

router.get('/logout', (req, res)=>{
    return res.render('login', {message: req.flash('message')});
})

module.exports = router