const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// user model   
const User = require('../models/User')

router.post('/',
    [
        check('name', 'Please provide a name').not().isEmpty(),
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Please provide 6 charcter long password').isLength({ min: 6 })
    ], 
    async (req,res) => {
        // res.send('user registered')
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()})
        }
        // res.send('success')
        const { name, email, password } = req.body
        try{
            let user = await User.findOne({email})
            if(user){
                return res.status(400).json({msg: 'User already exists'})
            }
            user = new User({
                name,
                email,
                password
            })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, process.env.SECRET,{
                expiresIn: 36000
            }, (err, token) => {
                if(err) throw err
                res.send({ token })
            })

        } catch (err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
})

module.exports = router