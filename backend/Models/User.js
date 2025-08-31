const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['donor', 'recipient'],
        required: true
    },
    bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true  // now required for everyone
},

    phone: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
