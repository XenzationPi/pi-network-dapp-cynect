import { PiAuth } from "@/components/PiAuth";
import { Dashboard } from "@/components/Dashboard";
import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    script.onload = async () => {
      try {
        await piNetwork.init();
        console.log("Pi SDK initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Pi SDK:", error);
      }
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://sdk.minepi.com/pi-sdk.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-4 text-purple-800">
          Cynect
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Your bridge to Pi Network's AI-powered content creation. Connect your wallet to start creating amazing content with Pi Network's upcoming AI technology.
        </p>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {!isAuthenticated && (
            <Card className="border-2 border-purple-200 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-purple-800">Welcome to Cynect</CardTitle>
                <CardDescription className="text-center">
                  Connect your Pi wallet to access AI-powered content creation tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-w-sm mx-auto">
                  <PiAuth onAuthenticated={() => setIsAuthenticated(true)} />
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Always show the Dashboard features */}
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;