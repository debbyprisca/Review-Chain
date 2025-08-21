import React from 'react';
import { Building2, Wallet, LogOut } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

const Header: React.FC = () => {
  const { account, isConnected, connectWallet, disconnectWallet, isLoading } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-300" />
            <div>
              <h1 className="text-2xl font-bold">TrustSeal</h1>
              <p className="text-blue-200 text-sm">Decentralized Review Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              
              

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-sm text-blue-100">Connected</p>
                  <p className="font-medium">{formatAddress(account!)}</p>
                </div>
                <button
                  onClick={disconnectWallet }
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Wallet className="w-5 h-5" />
                <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;