'use client';

import React, { useState, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import toast from 'react-hot-toast';

export default function Home() {
  const [icNumber, setIcNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if the user is registered
    const storedCredentials = localStorage.getItem('webAuthnCredentials');
    setIsRegistered(!!storedCredentials);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const publicKeyCredentialCreationOptions = {
        challenge: "uxMtaPAgEMm4JlJNeULcaz057QIcx0VpcS_32TiS9YY",
        rp: {
          name: 'Sol Car',
          id: window.location.hostname.toString()
        },
        user: {
          id: icNumber,
          name: icNumber,
          displayName: icNumber
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required'
        },
        timeout: 60000
      };

      const credential = await startRegistration(publicKeyCredentialCreationOptions);

      // Store the credential in local storage
      localStorage.setItem('webAuthnCredentials', JSON.stringify(credential));
      setIsRegistered(true);
      setMessage('Registration successful! You can now sign in.');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const storedCredentials = JSON.parse(localStorage.getItem('webAuthnCredentials'));
      if (!storedCredentials) {
        throw new Error('No credentials found. Please register first.');
      }

      const publicKeyCredentialRequestOptions = {
        userVerification: "required",
        rpId: window.location.hostname.toString(),
        challenge: "uxMtaPAgEMm4JlJNeULcaz057QIcx0VpcS_32TiS9YY",
        // allowCredentials: [{
        //   id: icNumber,
        //   type: 'public-key',
        // }],
        timeout: 60000
      };

      const assertion = await startAuthentication(publicKeyCredentialRequestOptions);

      // In a real-world scenario, you'd verify the assertion on the server
      // For this demo, we'll just check if the rawId matches
      if (assertion.rawId === storedCredentials.rawId) {
        setMessage('Authentication successful!');
        location.href = "/home"
        toast.success("Authenticated Succesfully");
      } else {
        setMessage('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
        <div className="max-w-xl text-center mx-auto">
          <div className="mb-5"></div>
          <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">
          <img src={"/logo.png"} className="w-20 h-20 mx-auto mb-4" />
            Sol Car</h2>
        </div>

        <form onSubmit={isRegistered ? handleAuthentication : handleRegistration}>
          <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="relative w-full">
          <label htmlFor="ic-number" className="sr-only">IC</label>
          <input
                type="text"
                id="ic-number"
                name="ic-number"
                value={icNumber}
                onChange={(e) => setIcNumber(e.target.value)}
                className="py-2 px-2 block w-full border-transparent rounded-lg text-sm focus:border-transparent focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
                placeholder="Enter your IC Number"
                required
              />
    </div>
    <button
              type="submit"  className="w-full sm:w-auto whitespace-nowrap py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200" >
    {isRegistered ? 'Sign In with Passkey' : 'Register Passkey'}
      <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
      
          </div>
        </form>
        {message && (
          <p className="mt-3 text-sm text-center" style={{ color: message.includes('successful') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}