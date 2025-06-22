
import React from 'react';
import { Scale, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-inter">Veritas</h1>
                <p className="text-xs text-slate-300 italic font-inter">We Remember Everything</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <Shield className="w-3 h-3" />
              <span className="text-xs font-inter">DEMO</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white font-inter">Veritas | We Remember Everything</h1>
          </div>
          
          <div className="flex items-center space-x-2 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-inter">PROTOTYPE DEMO</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
