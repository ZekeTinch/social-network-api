const {schema, model} = require('mongoose');

const userSchema = new schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,

        },
        thoughts: {

        },
        friends: {
            
        }
    }
)