// pages/api/auth/generate-authentication-options.js
import { generateAuthenticationOptions } from '@simplewebauthn/server';

export async function POST(req, res) {

  const { icNumber } = await req.json();

  // TODO: Fetch user data based on IC number from your database
  // For this example, we'll use a mock user
  const mockUser = {
    id: icNumber,
    name: icNumber,
    devices: [
      // TODO: Fetch actual device data from your database
      {
        credentialID: Buffer.from('mockCredentialID'),
        credentialPublicKey: Buffer.from('mockCredentialPublicKey'),
        counter: 0,
      },
    ],
  };

  const options = await generateAuthenticationOptions({
    rpID: process.env.RP_ID || 'localhost',
    userVerification: 'preferred',
    allowCredentials: mockUser.devices.map(device => ({
      id: device.credentialID,
      type: 'public-key',
    })),
  });

  // TODO: Save the challenge in your database or session
  // For this example, we'll just send it back to the client
  Response.json(options);
}