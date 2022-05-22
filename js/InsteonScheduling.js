var InsteonDevice = require("./Models/Device");

var actionComplete = true;

async function scheduleDevices(hour, minute, second) {
  const devices = await InsteonDevice.find();

  for (let i = 0; i < devices.length; i++) {
    var scheduleOn = devices[i].scheduleOn;
    var scheduleOff = devices[i].scheduleOff;
    var deviceID = devices[i].deviceID;

    if (scheduleOn == `${hour}` + `${minute}` && actionComplete == false) {
      deviceControl(`${deviceID}`, null, "ON");
      console.log(
        `${deviceID} was turned on at the scheduled time by the scheduler.`
      );
    } else {
      actionComplete = true;
    }
    if (scheduleOff == `${hour}` + `${minute}` && actionComplete == false) {
      deviceControl(`${deviceID}`, null, "OFF");
      console.log(
        `${deviceID} was turned off at the scheduled time by the scheduler.`
      );
    } else {
      actionComplete = true;
    }
  }
}

setInterval(() => {
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();
  var second = new Date().getSeconds();

  // console.log(`${hour}` + `${minute}` + `${second}`);

  scheduleDevices(hour, minute);

  console.log("Scheduler Running...");
}, 700);
