import { PiAuth } from "@/components/PiAuth";
import { Dashboard } from "@/components/Dashboard";
import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isKYCVerified, setIsKYCVerified] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load Pi SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    script.onload = async () => {
      try {
        await piNetwork.init();
        console.log("Pi SDK initialized successfully");
        
        // Check if user is already authenticated
        const currentUser = piNetwork.getCurrentUser();
        if (currentUser) {
          setIsAuthenticated(true);
          const kycStatus = await piNetwork.isKYCVerified();
          setIsKYCVerified(kycStatus);
        }
      } catch (error) {
        console.error("Failed to initialize Pi SDK:", error);
        toast({
          title: "Error",
          description: "Failed to initialize Pi Network integration",
          variant: "destructive",
        });
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

  const handleAuthenticated = async () => {
    setIsAuthenticated(true);
    const kycStatus = await piNetwork.isKYCVerified();
    setIsKYCVerified(kycStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-purple-800 mb-6 animate-fade-in">
            Cynect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your bridge to Pi Network's AI-powered content creation. Connect your Pi wallet to start creating amazing content with Pi Network's upcoming AI technology.
          </p>
          
          {!isAuthenticated ? (
            <div className="max-w-sm mx-auto mb-16">
              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-purple-800">Get Started</CardTitle>
                  <CardDescription className="text-center">
                    Connect your Pi wallet to access all features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PiAuth onAuthenticated={handleAuthenticated} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-sm mx-auto mb-16">
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-purple-800">
                    {isKYCVerified ? "KYC Verified ✓" : "KYC Status Pending"}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          )}
        </div>

        {/* Features Section */}
        {isAuthenticated && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center text-purple-800 mb-12">
              Explore What's Possible with Cynect
            </h2>
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;