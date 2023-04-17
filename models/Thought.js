const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().toDateString(),
    }
  }
);



const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: String,
            default: new Date().toDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return this.reactions.length;
    });

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
