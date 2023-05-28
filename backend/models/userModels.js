const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema(
    {
        username:{
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true,
        }
    }
)

module.exports = Mongoose.model('User',userSchema)