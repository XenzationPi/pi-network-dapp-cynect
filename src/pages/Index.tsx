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
        {/* Hero Section with animation */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <h1 className="text-6xl font-bold text-purple-800 mb-6 hover:scale-105 transition-transform duration-300">
            Cynect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-[fade-in_0.6s_ease-out]">
            Your bridge to Pi Network's AI-powered content creation. Connect your Pi wallet to start creating amazing content with Pi Network's upcoming AI technology.
          </p>

          {!isAuthenticated ? (
            <div className="space-y-16 animate-[fade-in_0.8s_ease-out]">
              <div className="max-w-sm mx-auto">
                <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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

              {/* Features Preview with staggered animations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-[fade-in_1s_ease-out]">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="AI Technology" 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">AI-Powered Creation</CardTitle>
                    <CardDescription>
                      Leverage advanced AI to generate unique content tailored to your needs
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-[fade-in_1.2s_ease-out]">
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                    alt="Community" 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Community Driven</CardTitle>
                    <CardDescription>
                      Join a thriving community of creators and innovators on the Pi Network
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-[fade-in_1.4s_ease-out]">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                    alt="Rewards" 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Earn Rewards</CardTitle>
                    <CardDescription>
                      Get rewarded for your contributions and creativity
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
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