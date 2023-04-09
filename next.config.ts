import twilio from 'twilio';
import { IncomingMessage, ServerResponse } from 'http';
import { NextConfig } from 'next';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (typeof window === 'undefined') {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
    const message = await client.messages.create({
      to: '+1234567890',
      from: process.env.TWILIO_PHONE_NUMBER!,
      body: 'Hello, World!'
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: message.sid }));
  } else {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'This API route can only be accessed on the server-side.' }));
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false };
    return config;
  },
}

export { nextConfig };
