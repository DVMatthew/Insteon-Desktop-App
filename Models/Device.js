var mongoose = require("mongoose");
const { Schema } = mongoose;

const InsteonDevice = new Schema({
  deviceID: String,
  deviceName: String,
  scheduleOn: Number,
  scheduleOff: Number,
  status: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InsteonDevice", InsteonDevice);
