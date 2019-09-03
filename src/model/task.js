const mongose = require('mongoose')
const Schema = mongose.Schema

const taskSchema = Schema({
    title:String,
    deadline:Date,
    status:Boolean,  
    createdAt:Date,
    deletedAt:Date
})

module.exports = mongose.model('Task', taskSchema)