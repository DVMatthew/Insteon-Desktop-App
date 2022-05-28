var mongoose = require("mongoose");
var axios = require("axios");
var fs = require("fs");
var InsteonDevice = require("../Models/Device");

var DB_URI = "mongodb://127.0.0.1:27017/insteon";
var HUB_URI = "http://192.168.1.12:25105";
var HUB_TOKEN = "TXVnZ2xlc3c6bEZLalFFQWI=";

const deviceData = [];

// Add Button Functionality
window.onload = () => {
  var addButton = document.getElementById("add-button");
  addButton.addEventListener("click", addDevice);
};

// Connect to database using mongoose
mongoose
  .connect(DB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err.reason));

// Add a device to the local database
function addDevice() {
  // Device Values
  var deviceID = document.getElementById("device-id");
  var status = document.getElementById("status");
  var timeOn = document.getElementById("time-on");
  var timeOff = document.getElementById("time-off");
  var deviceName = document.getElementById("device-name");

  InsteonDevice.init();

  // Set the information
  const insteonDevice = new InsteonDevice({
    deviceID: deviceID.value,
    deviceName: deviceName.value,
    scheduleOn: timeOn.value,
    scheduleOff: timeOff.value,
    status: null,
  });

  // Save the information
  insteonDevice.save().then((data) => {
    console.log(data);
  });
}

function deviceControl(deviceID, status, mode) {
  // Hub Links
  var ON_LINK = `${HUB_URI}/3?0262${deviceID}0F11FF=I=3`;
  var OFF_LINK = `${HUB_URI}/3?0262${deviceID}0F13FF=I=3`;

  var options = {
    headers: { Authorization: `Basic ${HUB_TOKEN}` },
  };

  var currentMode = "";

  // Check the mode that is passed through when calling function
  if (mode == "ON") {
    currentMode = ON_LINK;
  }
  if (mode == "OFF") {
    currentMode = OFF_LINK;
  }

  console.log(currentMode);

  // send a POST request to the hub
  axios
    .post(currentMode, {}, options)
    .then((res) => {
      console.log(res);
      return (actionComplete = true);
    })
    .catch((err) => {
      console.log(err);
    });
}

function hubStatus(hubUrl) {}

function deviceStatus(deviceID) {}
