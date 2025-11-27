import { useState } from 'react';
import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';
import {
    getNonce,
    encodeAddPublisher,
    buildForwardRequest,
    signForwardRequest
} from '../utils/blockchain';

export function useGaslessAdmin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ txHash: string } | null>(null);
    const [step, setStep] = useState<string>('');

    const addPublisher = async (publisherAddress: string) => {
        setLoading(true);
        setError(null);
        setResult(null);
        setStep('Initializing...');

        try {
            // 1. Connect to wallet
            setStep('Connecting to wallet...');
            if (!window.ethereum) {
                throw new Error('Please install MetaMask!');
            }

            const provider = new ethers.BrowserProvider(window.ethereum as any);
            const signer = await provider.getSigner();
            const ownerAddress = await signer.getAddress();

            console.log('Owner address:', ownerAddress);

            // 2. Get nonce
            setStep('Getting nonce...');
            const nonce = await getNonce(ownerAddress);
            console.log('Current nonce:', nonce);

            // 3. Encode function call
            const encodedData = encodeAddPublisher(publisherAddress);

            // 4. Build ForwardRequest
            const forwardRequest = buildForwardRequest(ownerAddress, encodedData, nonce);

            // 5. Sign request
            setStep('Waiting for signature...');
            console.log('Requesting signature...');
            const signature = await signForwardRequest(signer, forwardRequest);
            console.log('Signature:', signature);

            // 6. Submit to backend
            setStep('Submitting to blockchain...');
            const response = await fetch(
                `${BLOCKCHAIN_CONFIG.API_URL}/api/add-publisher`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        owner_address: ownerAddress,
                        publisher_address: publisherAddress,
                        signature: signature
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to add publisher');
            }

            const data = await response.json();
            console.log('Success!', data);

            setResult({
                txHash: data.tx_hash || data.txHash
            });

            setStep('Done!');
            return data;

        } catch (err: any) {
            console.error('Gasless admin error:', err);
            let errorMessage = err.message || 'An error occurred';

            if (err.code === 'ACTION_REJECTED') {
                errorMessage = 'You rejected the transaction signature.';
            }

            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
            setStep('');
        }
    };

    return {
        addPublisher,
        loading,
        error,
        result,
        step
    };
}
