const { Schema, model } = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: { 
        type: mongoose.ObjectId, 
        default: new mongoose.Types.ObjectId(),
    },
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
        type: Date,
        default: Date.now,
        //needs getter to format timestamp on query
    }
  }
);


const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            //needs getter to format timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
