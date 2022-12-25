import jwt from "jsonwebtoken";
const accountSid = 'AC9f4366d15f7558140efa32e5e81d8a93'; 
const authToken = '[Redacted]'; 
const client = require('twilio')(accountSid, authToken); 

var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
const sendSMS = async (phoneNumber, name, id) => {
    client.messages 
          .create({ 
             body: 'Welcome to Black Boy Heal dear '+name+' , Your verification code is '+seq,  
             messagingServiceSid: 'MG3730ab614dbee9378c4b64c56c839710',      
             to: phoneNumber 
           }) 
          .then(message => console.log(message.sid)) 
          .done();
    return seq;
}
export { sendSMS as default }

