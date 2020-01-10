const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// Student model
// auth is middleware to get the private route

const Student = require('../models/Student')

router.get('/', auth, async(req,res) => {
    try {
        const students = await Student.find({user: req.user.id})
        res.json(students)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post('/', auth, 
    [
        check('name', 'Please provide name').not().isEmpty(),
        check('phone', 'Please provide phone').not().isEmpty()
    ],
    async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    const {name, phone, subject, isconfirmed } = req.body
    try {
        let student = new Student({
            user: req.user.id,
            name,
            phone,
            subject,
            isconfirmed
        })
        student = await student.save() 
        res.json(student)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
        if(!student){
            return res.status(404).json({msg: 'Student not found'})
        }
        await Student.findByIdAndRemove(req.params.id)
        res.send('student removed')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async(req, res) => {
    const {name, phone, subject, isconfirmed} = req.body
    const updatedStudent = {name, phone, subject, isconfirmed}
    try {
        let student = await Student.findById(req.params.id)
        if(!student){
            return res.status(404).json({msg: 'Student not found'})
        } 
        student = await Student.findByIdAndUpdate(req.params.id, {$set: updatedStudent}, {new: true})
        res.send(student)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router