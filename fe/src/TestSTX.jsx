import React, { useState } from 'react';
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';
import { uintCV, PostConditionMode, Pc } from '@stacks/transactions';

const appConfig = new AppConfig(['store_write']);
const userSession = new UserSession({ appConfig });
// const network = new STACKS_TESTNET();

export default function ContractInterface() {
  const [hectares, setHectares] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Farm Insurance App',
        icon: '/api/placeholder/64/64',
      },
      redirectTo: '/',
      onFinish: () => {
        const userData = userSession.loadUserData();
        setUserAddress(userData.profile.stxAddress.testnet);
      },
      userSession,
    });
  };

  const handlePayPremium = async () => {
    if (!hectares || !userAddress) return;

    setLoading(true);
    try {
      //DeserializationError: Could not read undefined as FungibleConditionCode
      // let postCondition = Pc.origin("ST1AYA1J87KWP7MT2966QSTFVVWZNPFTW9ZZRT8ED").willSendGt(BigInt(100)).ustx()
      const txOptions = {
        contractAddress: 'ST1AYA1J87KWP7MT2966QSTFVVWZNPFTW9ZZRT8ED',
        contractName: 'insurance',
        functionName: 'pay-premium',
        functionArgs: [uintCV(parseInt(hectares))],
        network: STACKS_TESTNET,
        postConditionMode: PostConditionMode.Allow,
        // postConditions:[postCondition],
        onFinish: (data) => {
          console.log('Transaction finished:', data);
          setLoading(false);
          setHectares('');
        },
      };

      await openContractCall(txOptions);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleClaimInsurance = async () => {
    if (!userAddress) return;

    setLoading(true);
    try {
      const txOptions = {
        contractAddress: 'ST1AYA1J87KWP7MT2966QSTFVVWZNPFTW9ZZRT8ED',
        contractName: 'insurance',
        functionName: 'claim-insurance',
        functionArgs: [],
        network: STACKS_TESTNET,
        postConditionMode: PostConditionMode.Allow,
        postConditions: [],
        onFinish: (data) => {
          console.log('Transaction finished:', data);
          setLoading(false);
        },
      };

      await openContractCall(txOptions);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Farm Insurance</h1>

        {!userAddress ? (
          <button
            onClick={connectWallet}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 break-all">
              Connected: {userAddress}
            </p>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hectares
              </label>
              <input
                type="number"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
                min="1"
                max="1000"
                className="w-full border rounded p-2"
                placeholder="Enter number of hectares"
              />
            </div>

            <button
              onClick={handlePayPremium}
              disabled={loading || !hectares}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:bg-gray-300"
            >
              {loading ? 'Processing...' : 'Pay Premium'}
            </button>

            <button
              onClick={handleClaimInsurance}
              disabled={loading}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors disabled:bg-gray-300"
            >
              {loading ? 'Processing...' : 'Claim Insurance'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}