const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: function() {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            };
            return this._createdAt.toLocaleString('en-IN', options);
        }
    },
    editedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('note', noteSchema);