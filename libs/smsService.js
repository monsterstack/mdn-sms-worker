'use strict';
const config = require('config');
const AUTH_TOKEN = config.sms.twilio.authToken;
const ACCOUNT_SID = config.sms.twilio.accountSID;

const Promise = require('promise');
const debug = require('debug')('sms-service');

class SmsService {
  constructor() {

  }

  sms(record) {
    let p = new Promise((resolve, reject) => {
      let smsRequest = record;
      //require the Twilio module and create a REST client
      let client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

      //Send an SMS text message
      client.sendMessage({

        to: smsRequest.to, // Any number Twilio can deliver to
        from: smsRequest.from, // A number you bought from Twilio and can use for outbound communication
        body: smsRequest.body // body of the SMS message

      }, (err, responseData) => { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          debug(responseData.from); // outputs "+14506667788"
          debug(responseData.body); // outputs "word to your mother."
          resolve(record);
        } else {
          debug(err);
          reject(err);
        }
      });
    });

    return p;
  }
}

module.exports = SmsService;
