import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function sendMessage(
  from: string,
  to: string,
  message: string
): Promise<any> {
  try {
    const twilioResponse = await client.messages.create({
      body: message,
      from,
      to,
    });

    return twilioResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send SMS message');
  }
}
