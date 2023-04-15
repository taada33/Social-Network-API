const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true,
            //trimmed
        },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            //validate as valid email address
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
)

//virtual property friendCount returns amount of friends a user has on query
userSchema
    .virtual('friendCount')
    .get(function (){
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;