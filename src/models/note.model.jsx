const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const noteSchema = new Schema({
    title: { type: String, required: true, unique: true },
    status: { type: String,  required: true },
    color: { type: String,  required: true },
    text1: { type: String, required: true },
    text2: { type: String },
    text3: { type: String },
    text4: { type: String },
    text5: { type: String },
});

module.exports = model("Note", noteSchema);
