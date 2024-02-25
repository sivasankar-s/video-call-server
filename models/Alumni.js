import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    yearOfPassing: Number,
    dept: String,
    company: String,
    role: String,
    type: String,

})

const Alumni = mongoose.model("Alumni", alumniSchema);

export default Alumni