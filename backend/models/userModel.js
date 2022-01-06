const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});  

const User = model("User", userSchema);

module.exports = User;