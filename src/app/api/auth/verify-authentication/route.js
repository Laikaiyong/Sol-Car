// pages/api/auth/verify-authentication.js
import { verifyAuthenticationResponse } from '@simplewebauthn/server';

export default async function POST(req) {

  const { icNumber, authenticationResponse } = await req.json();

  // TODO: Fetch user and device data based on IC number from your database
  // For this example, we'll use mock data
  const mockUser = {
    id: icNumber,
    name: icNumber,
    devices: [
      {
        credentialID: Buffer.from('mockCredentialID'),
        credentialPublicKey: Buffer.from('mockCredentialPublicKey'),
        counter: 0,
      },
    ],
  };

  try {
    const verification = await verifyAuthenticationResponse({
      response: authenticationResponse,
      expectedChallenge: 'mockChallenge', // TODO: Retrieve the actual challenge from your database or session
      expectedOrigin: process.env.EXPECTED_ORIGIN || 'http://localhost:3000',
      expectedRPID: process.env.RP_ID || 'localhost',
      authenticator: mockUser.devices[0],
    });

    const { verified, authenticationInfo } = verification;

    if (verified) {
      // TODO: Update the device's counter in your database
      // mockUser.devices[0].counter = authenticationInfo.newCounter;

      Response.json({ verified: true });
    } else {
      Response.json({ verified: false });
    }
  } catch (error) {
    console.error('Verification error:', error);
    Response.json({ error: 'Verification failed' });
  }
}