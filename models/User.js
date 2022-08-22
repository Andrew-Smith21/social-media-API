const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); //delete after copying into other file

// Creating User model
const UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// getting count of user's friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create User model using schema
const User = model('User', UserSchema);

// export User model
module.exports = User;