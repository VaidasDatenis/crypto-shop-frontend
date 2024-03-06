interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  request: (request: { method: string, params?: any[] }) => Promise<any>;
  // Define additional properties and methods you expect from the provider as needed
}
