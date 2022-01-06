const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    pic: {
        type: String, 
        default: "https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1641126171~hmac=4b0cc32c57f4481d95bfd46bdc0b8e03" 
    }
},
{
    timestamps: true
});

const User = model("User", userSchema);

module.exports = User;