const mongoose = require('mongoose')

const diarySchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
}, {
    timestamps: true
})

const Diary = mongoose.model('Diary', diarySchema)

module.exports = Diary