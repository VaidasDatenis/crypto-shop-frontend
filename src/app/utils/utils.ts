export const supportedStablecoins = {
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'USDC',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'USDT',
}

export function isStablecoin(address: string): boolean {
  return address in supportedStablecoins;
}

export const networkMapUtil: {[key: string]: string} = {
  '1': 'Ethereum Mainnet',
  '3': 'Ropsten Testnet',
  '4': 'Rinkeby Testnet',
  '5': 'Goerli Testnet',
  '42': 'Kovan Testnet',
  '11155111': 'Sepolia Testnet',
  '59140': 'Linea Testnet',
  '59144': 'Linea Mainnet',
  // Add other network IDs as needed
};
