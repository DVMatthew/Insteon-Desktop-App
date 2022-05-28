var InsteonDevice = require("../Models/Device");
var $ = require("jquery");
var mongoose = require("mongoose");

var DB_URI = "mongodb://127.0.0.1:27017/insteon";

mongoose
  .connect(DB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err.reason));

async function listDevices() {
  const filter = {};
  const devices = await InsteonDevice.find();

  for (let i = 0; i < devices.length; i++) {
    const deviceID = devices[i].deviceID;
    const deviceName = devices[i].deviceName;
    const deviceOnTime = devices[i].scheduleOn;
    const deviceOffTime = devices[i].scheduleOff;
    console.log(deviceID);
    const status = devices[i].status;
    $("#device-row").append(
      $(`<div class="col-md-6">`).append(
        $(`<div id="device-card">`).append(
          $(
            `<h5>${deviceName}</h5> <p id="dev-id">${deviceID}</p> <div class="scheduleDiv"><h6>Turn On: ${deviceOnTime}</h6></div> <div class="scheduleDiv"><h6>Turn Off: ${deviceOffTime}</h6></div>`
          )
        )
      )
    );
  }
}

function updateSchedule(devID, state, updatedTime) {
  var query = { deviceID: devID };

  if (state == "ON") {
    InsteonDevice.findOneAndUpdate(
      query,
      { scheduleOn: updatedTime },
      { upsert: false },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      }
    );
  }
  if (state == "OFF") {
    InsteonDevice.findOneAndUpdate(
      query,
      { scheduleOff: updatedTime },
      { upsert: false },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      }
    );
  }
}

listDevices();
