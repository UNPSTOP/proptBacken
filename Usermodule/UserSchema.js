// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    subject: String,
    meassage: String
});

// export default mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;