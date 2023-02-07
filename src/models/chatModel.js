const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  nickname: { type: String, required: true },
  avatar: { type: String, required: true },
});

const messageSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    text: { type: String, required: true }
  })

const chatSchema = new Schema({
  chatid: { type: String, required: true },
  messages: [{ userSchema, messageSchema }],
});

const chatModel = model("Chat", chatSchema);

module.exports = chatModel;
