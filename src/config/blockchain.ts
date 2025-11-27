export const BLOCKCHAIN_CONFIG = {
    // Contract Addresses
    FORWARDER_ADDRESS: import.meta.env.VITE_FORWARDER_ADDRESS,
    REGISTRY_ADDRESS: import.meta.env.VITE_REGISTRY_ADDRESS,

    // Network
    CHAIN_ID: Number(import.meta.env.VITE_CHAIN_ID),
    CHAIN_NAME: import.meta.env.VITE_CHAIN_NAME,
    RPC_URL: import.meta.env.VITE_RPC_URL,

    // Backend API
    API_URL: import.meta.env.VITE_API_URL
};

// EIP-712 Domain for MinimalForwarder
export const EIP712_DOMAIN = {
    name: 'MinimalForwarder',
    version: '1.0.0',
    chainId: BLOCKCHAIN_CONFIG.CHAIN_ID,
    verifyingContract: BLOCKCHAIN_CONFIG.FORWARDER_ADDRESS as `0x${string}`
};

// EIP-712 Types
export const EIP712_TYPES = {
    ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' }
    ]
};
