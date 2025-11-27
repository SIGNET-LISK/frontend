import { useState } from 'react';
import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';
import {
    getNonce,
    encodeRegisterContent,
    buildForwardRequest,
    signForwardRequest
} from '../utils/blockchain';
import { getPHash } from '../lib/api';

export function useGaslessRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ txHash: string; pHash: string } | null>(null);
    const [step, setStep] = useState<string>(''); // To show progress

    const register = async (file: File, title: string, description: string) => {
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
            const userAddress = await signer.getAddress();

            console.log('User address:', userAddress);

            // 2. Check authorization
            setStep('Checking authorization...');
            const publisherCheckResponse = await fetch(
                `${BLOCKCHAIN_CONFIG.API_URL}/api/publisher/${userAddress}`
            );

            if (!publisherCheckResponse.ok) {
                throw new Error('Failed to check publisher status');
            }

            const publisherStatus = await publisherCheckResponse.json();

            if (!publisherStatus.is_authorized) {
                throw new Error('You are not an authorized publisher. Please contact support.');
            }

            // 3. Get pHash from file
            setStep('Generating content hash...');
            const pHash = await getPHash(file);
            console.log('Generated pHash:', pHash);

            // 4. Get nonce
            setStep('Getting nonce...');
            const nonce = await getNonce(userAddress);
            console.log('Current nonce:', nonce);

            // 5. Encode function call
            const encodedData = encodeRegisterContent(pHash, title, description);

            // 6. Build ForwardRequest
            const forwardRequest = buildForwardRequest(userAddress, encodedData, nonce);

            // 7. Sign request
            setStep('Waiting for signature...');
            console.log('Requesting signature...');
            const signature = await signForwardRequest(signer, forwardRequest);
            console.log('Signature:', signature);

            // 8. Submit to backend
            setStep('Submitting to blockchain...');
            const registerResponse = await fetch(
                `${BLOCKCHAIN_CONFIG.API_URL}/api/register-content`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        publisher_address: userAddress,
                        p_hash: pHash,
                        title: title,
                        description: description,
                        signature: signature
                    })
                }
            );

            if (!registerResponse.ok) {
                const errorData = await registerResponse.json();
                throw new Error(errorData.detail || 'Failed to register content');
            }

            const data = await registerResponse.json();
            console.log('Success!', data);

            setResult({
                txHash: data.tx_hash || data.txHash,
                pHash: pHash
            });

            setStep('Done!');
            return data;

        } catch (err: any) {
            console.error('Gasless registration error:', err);
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
        register,
        loading,
        error,
        result,
        step
    };
}
