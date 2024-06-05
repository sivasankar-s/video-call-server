import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    regNo: String,
    email: String,
    password: String,
    phone: Number,
    yearOfPassing: Number,
    dept: String,
    type: String,

})

const Student = mongoose.model("Student", studentSchema);

export default Student;