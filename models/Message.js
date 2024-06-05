import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: String,
  avatar: String,
  text: String,
  group: String,
  userType: String,
  timestamp: { type: Date, default: Date.now },

})

const Message = mongoose.model("Message", messageSchema);

export default Message;