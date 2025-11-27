export const BLOCKCHAIN_CONFIG = {
    // Contract Addresses
    FORWARDER_ADDRESS: import.meta.env.VITE_FORWARDER_ADDRESS || '0x153afc99a1Bc4441eb98931271dDAB904680Df94',
    REGISTRY_ADDRESS: import.meta.env.VITE_REGISTRY_ADDRESS || '0x290B22603f4eFF89C86c2467A6355cE377FCf11A',

    // Network
    CHAIN_ID: Number(import.meta.env.VITE_CHAIN_ID) || 4202,
    CHAIN_NAME: import.meta.env.VITE_CHAIN_NAME || 'Lisk Sepolia',
    RPC_URL: import.meta.env.VITE_RPC_URL || 'https://rpc.sepolia-api.lisk.com',

    // Backend API
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
};

// Debug logging in development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
    console.log('🔧 BLOCKCHAIN_CONFIG Loaded:', BLOCKCHAIN_CONFIG);
    console.log('📝 Environment Variables:', {
        VITE_FORWARDER_ADDRESS: import.meta.env.VITE_FORWARDER_ADDRESS,
        VITE_REGISTRY_ADDRESS: import.meta.env.VITE_REGISTRY_ADDRESS,
        VITE_CHAIN_ID: import.meta.env.VITE_CHAIN_ID,
        VITE_API_URL: import.meta.env.VITE_API_URL
    });
}

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
