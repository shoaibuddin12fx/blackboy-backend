import jwt from "jsonwebtoken";
const accountSid = "AC9f4366d15f7558140efa32e5e81d8a93";
const authToken = "995d24e80289816deb6dd635cb7fd51c";
const myPhoneNo = "+12058507060";
const client = require("twilio")(accountSid, authToken);

var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const sendSMS = async (phoneNumber, name, id) => {
  try {
    client.messages
      .create({
        body:
          "Welcome to Black Boy Heal dear " +
          name +
          " , Your verification code is " +
          seq,
          messagingServiceSid: 'MG3730ab614dbee9378c4b64c56c839710', 
        to: phoneNumber,
        from: myPhoneNo,
      })
      .then((message) => console.log(message, phoneNumber, name))
      .done();
    return seq;
  } catch (error) {
    console.log(error);
  }
};
export { sendSMS as default };
