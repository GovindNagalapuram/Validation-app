const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    subject:{
        type: String,
        required: true,
        default: 'Maths'
    },
    isconfirmed:{
        type:Boolean,
        defualt: false
    }
})

module.exports = mongoose.model('student', studentSchema)