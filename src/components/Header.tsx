
import React from 'react';
import { Scale, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col items-start space-y-1 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              {/* Mobile: Two-line title */}
              <div className="block sm:hidden">
                <h1 className="text-2xl font-bold text-white">Veritas</h1>
                <p className="text-lg font-semibold italic text-white">We Remember Everything</p>
              </div>
              {/* Desktop: Single-line title */}
              <h1 className="hidden sm:block text-2xl font-bold text-white">Veritas | We Remember Everything</h1>
            </div>
            <div className="sm:ml-0">
              <p className="text-slate-400 text-sm">Political Accountability Platform</p>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 sm:hidden">
              <Shield className="w-4 h-4" />
              <span className="text-sm">PROTOTYPE DEMO</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-sm">PROTOTYPE DEMO</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
