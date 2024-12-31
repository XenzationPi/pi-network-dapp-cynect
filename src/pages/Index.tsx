import { PiAuth } from "@/components/PiAuth";
import { Dashboard } from "@/components/Dashboard";
import { useState, useEffect } from "react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if Pi SDK is loaded
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-pi-dark">
          Pi Network DApp
        </h1>
        
        <div className="max-w-md mx-auto">
          {!isAuthenticated ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600 mb-4">
                Connect your Pi wallet to get started
              </p>
              <PiAuth />
            </div>
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;