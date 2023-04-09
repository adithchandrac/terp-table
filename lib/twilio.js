const twilio = require('twilio');

let client;
if (process.env.NODE_ENV === 'production') {
  // Running in production, so use the Twilio REST API
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  client = twilio(accountSid, authToken);
} else {
  // Running in development, so use the Twilio Simulator
  const accountSid = 'AC00000000000000000000000000000000';
  const authToken = '00000000000000000000000000000000';
  const twilioPhoneNumber = '+15005550006';
  const MessagingResponse = twilio.twiml.MessagingResponse;
  client = {
    messages: {
      create: async ({ to, body }) => {
        const twiml = new MessagingResponse();
        twiml.message(body);
        const response = {
          to,
          body: twiml.toString(),
          from: twilioPhoneNumber,
        };
        console.log(`Sending SMS: ${JSON.stringify(response)}`);
        return response;
      },
    },
  };
}

module.exports = { sendMessage: async (from, to, body) => client.messages.create({ from, to, body }) };
