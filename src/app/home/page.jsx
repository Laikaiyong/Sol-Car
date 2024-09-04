'use client';

import React, { useState, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import Sidebar from '../components/Sidebar';
import { cars } from '../data/carsSample';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";

const subscribeToRoadTax = async (connection, wallet, amount) => {
    if (!wallet.publicKey) throw new Error('Wallet not connected');
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey('BcTcHHKAHJTgApbDMuyJKNBeDgtgoMuD6vGhSUuEPJAK'),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
  
    const signature = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');
    return signature;
  };
  

export default function Home() {
  const [icNumber, setIcNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const { connection } = useConnection();
  const wallet = useWallet();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [ car, setCar ] = useState({});
  const [ carId, setCarId ] = useState(1);


  useEffect(() => {
    // Check if the user is registered
    wallet.select(PhantomWalletName);
    wallet.connect();
    // window.phantom.solana.connect();
    const storedCredentials = localStorage.getItem('webAuthnCredentials');

    setCarId(localStorage.getItem("car"));
    setCar(cars.find(car => car.id == localStorage.getItem("car")));
    setIsRegistered(!!storedCredentials);
  }, [carId]);

  const handleTopUp = async () => {
    if (!wallet.publicKey) {
      alert('Please connect your wallet first');
      return;
    }
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      alert(`Topped up USDC {amount} SOL successfully!`);
      setTopUpAmount('');
    } catch (error) {
      console.error('Error topping up:', error);
      alert('Failed to top up. Please try again.');
    }
  };

  const handleRoadTaxSubscription = async () => {
    if (!wallet.publicKey) {
      alert('Please connect your wallet first');
      return;
    }
    try {
      const signature = await subscribeToRoadTax(connection, wallet, car.roadTax.amount);
      alert(`Road tax subscription successful! Transaction signature: USDC {signature}`);
    } catch (error) {
      console.error('Error subscribing to road tax:', error);
      alert('Failed to subscribe to road tax. Please try again.');
    }
  };

  return (
    <>
        <Sidebar
        walletAddress={wallet?.publicKey?.toString()}
        setCarId={setCarId}
    />
    {
        car != undefined && (

    <div className="w-full lg:ps-64">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 mt-14">
    <div className="flex justify-center items-center h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <h1 className="text-2xl font-bold mb-4">{car.model} Details</h1>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] mb-4">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Car Information</h3>
            <img src={car.image} alt={car.model} className="w-full h-48 object-cover rounded-lg my-4" />
            <p className="mt-2 text-gray-800 dark:text-gray-400">
              <strong>Plate:</strong> {car.plate}<br />
              <strong>Color:</strong> {car.color}<br />
              <strong>Year:</strong> {car.year}<br />
              <strong>Value:</strong> USDC {car.value}<br />
              <strong>Description:</strong> {car.description}
            </p>
          </div>
        </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Car Information */}

        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Road Tax Information</h3>
            <p className="mt-2 text-gray-800 dark:text-gray-400">
              <strong>Last Paid:</strong> {car.roadTax?.lastPaid}<br />
              <strong>Next Due:</strong> {car.roadTax?.nextDue}<br />
              <strong>Amount:</strong> USDC {car.roadTax?.amount}
            </p>
            <button 
              className="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              onClick={handleRoadTaxSubscription}
            >
              Subscribe to Road Tax
            </button>
          </div>
        </div>

        {/* Insurance Details */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Insurance Details</h3>
            <p className="mt-2 text-gray-800 dark:text-gray-400">
              <strong>Provider:</strong> {car.insurance?.provider}<br />
              <strong>Policy Number:</strong> {car.insurance?.policyNumber}<br />
              <strong>Expiry Date:</strong> {car.insurance?.expiryDate}<br />
              <strong>Monthly Premium:</strong> USDC {car.insurance?.monthlyPremium}
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Transactions</h3>
            <ul className="mt-2 text-gray-800 dark:text-gray-400">
              {car.transactions?.map((tx, index) => (
                <li key={index} className="mb-2">
                  <strong>{tx.date}:</strong> {tx.type} - USDC {tx.amount}<br />
                  <span className="text-xs text-gray-500">Tx Hash: {tx.txHash}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wallet Actions */}
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Wallet Actions</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Top up your wallet or connect a new one</p>
            <div className="mt-3">
              <label htmlFor="topup" className="block text-sm font-medium mb-2 dark:text-white">Top Up Amount (USDC )</label>
              <input
                type="text"
                id="topup"
                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-gray-500 focus:ring-gray-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
              />
            </div>
            <button 
              className="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              onClick={handleTopUp}
            >
              Top Up
            </button>
            <div className="mt-3">
              {/* <WalletMultiButton className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
        
      </div>
    </div>
    </div>
    </div>
        )
    }
    </>
  );

}