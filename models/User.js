const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true,
            trim: true,
            //trimmed
        },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            //validation code from https://mongoosejs.com/docs/validation.html#custom-validators, + my own regex
            validate: {
                validator: function(v) {
                  return /\w+@\w+\.\w{2,}/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
              },
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        // timestamps: false,
    }
)

//virtual property friendCount returns amount of friends a user has on query
userSchema
    .virtual('friendCount')
    .get(function (){
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;