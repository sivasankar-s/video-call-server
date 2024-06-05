import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    title: String,
    host: String,
    startTime: Date,
    endTime: Date,
    link: String
})

const Events = mongoose.model("Events", eventsSchema);

export default Events