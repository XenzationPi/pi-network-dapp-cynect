import { PiAuth } from "@/components/PiAuth";
import { Dashboard } from "@/components/Dashboard";
import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { ProfileForm } from "@/components/ProfileForm";
import { WaitlistDisplay } from "@/components/WaitlistDisplay";

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800">
      <Menu />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300 animate-fade-in">
            Cynect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Your bridge to Pi Network's AI-powered content creation. Connect your Pi wallet to start creating amazing content with Pi Network's upcoming AI technology.
          </p>

          {!isAuthenticated ? (
            <div className="space-y-16">
              <div className="max-w-sm mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      Get Started
                    </CardTitle>
                    <CardDescription className="text-center dark:text-gray-300">
                      Connect your Pi wallet to access all features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PiAuth onAuthenticated={handleAuthenticated} />
                  </CardContent>
                </Card>
              </div>

              <WaitlistDisplay />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="AI Technology" 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      AI-Powered Creation
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Leverage advanced AI to generate unique content tailored to your needs
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm" style={{ animationDelay: '0.5s' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                    alt="Community" 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      Community Driven
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Join a thriving community of creators and innovators on the Pi Network
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm" style={{ animationDelay: '0.6s' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                    alt="Rewards" 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      Earn Rewards
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Get rewarded for your contributions and creativity
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
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