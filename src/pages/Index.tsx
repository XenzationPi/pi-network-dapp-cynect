import { PiAuth } from "@/components/PiAuth";
import { Dashboard } from "@/components/Dashboard";
import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { ProfileForm } from "@/components/ProfileForm";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await piNetwork.init();
        const currentUser = piNetwork.getCurrentUser();
        if (currentUser) {
          setIsAuthenticated(true);
          toast({
            title: "Welcome back!",
            description: `Connected as ${currentUser.username}`,
          });
        }
      } catch (error) {
        console.error("Pi Network initialization error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to Pi Network",
          variant: "destructive",
        });
      }
    };

    checkAuthStatus();
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <Menu />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-purple-800 mb-6">
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
            <div className="space-y-8">
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-purple-800">
                    Connected ✓
                  </CardTitle>
                </CardHeader>
              </Card>
              <ProfileForm />
              <Dashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;