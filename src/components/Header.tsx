
import React from 'react';
import { Scale, Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="text-center space-y-3">
            {/* Icon and Title */}
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Veritas</h1>
                <p className="text-sm font-semibold italic text-white">We Remember Everything</p>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-slate-400 text-sm">Political Accountability Platform</p>
            
            {/* Prototype Badge */}
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">PROTOTYPE DEMO</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Veritas | We Remember Everything</h1>
            </div>
            <p className="text-slate-400 text-sm">Political Accountability Platform</p>
          </div>
          
          <div className="flex items-center space-x-2 text-slate-400">
            <Shield className="w-4 h-4" />
            <span className="text-sm">PROTOTYPE DEMO</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
