const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({


    article: {
        type: Schema.Types.Mixed,
        default: {}
       
    },

    reply:{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    },

    name: {
        type: String,
        default: "Anonymous"
    },

    body: {
        type: String,
        required: true
    },

    date: {
        type: Date, 
        default: Date.now()
    }


});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);
