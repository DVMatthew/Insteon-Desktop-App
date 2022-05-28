var InsteonDevice = require("../Models/Device");
var $ = require("jquery");

var DB_URI = "mongodb://127.0.0.1:27017/insteon";

async function listDevices() {
  const filter = {};
  const devices = await InsteonDevice.find();

  for (let i = 0; i < devices.length; i++) {
    const deviceID = devices[i].deviceID;
    const deviceName = devices[i].deviceName;
    console.log(deviceID);
    const status = devices[i].status;
    $("#device-row").append(
      $(`<div class="col-md-6">`).append(
        $(`<div id="device-card">`).append(
          $(
            `<h5>${deviceName}<h5> <p id="dev-id">${deviceID}</p> <button id="on-btn" onclick="deviceControl('${deviceID}', null, 'ON');">On</button> <button onclick="deviceControl('${deviceID}', null, 'OFF');" id="off-btn">Off</button>`
          )
        )
      )
    );
  }
}

function removeDevice(dataID) {}

function updateDevice(dataID) {}

listDevices();
