export const MARKETPLACE_ABI = [{
        "inputs": [
            { "internalType": "address", "name": "_treasury", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
            { "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "indexed": false, "internalType": "bool", "name": "mintedNft", "type": "bool" },
            { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "name": "PaymentReceived",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "nextTokenId",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasury",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "internalType": "bool", "name": "mintNft", "type": "bool" }
        ],
        "name": "payForProduct",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_treasury", "type": "address" }],
        "name": "setTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];