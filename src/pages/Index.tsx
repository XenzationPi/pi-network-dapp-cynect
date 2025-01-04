import { PiAuth } from "@/components/PiAuth";
import { Dashboard } from "@/components/Dashboard";
import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { ProfileForm } from "@/components/ProfileForm";
import { WaitlistDisplay } from "@/components/WaitlistDisplay";
import { Loader2, Coins, Sparkles, Exchange } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRewards, setUserRewards] = useState<{ points: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        await piNetwork.init();
        const currentUser = piNetwork.getCurrentUser();
        if (currentUser) {
          setIsAuthenticated(true);
          // Fetch user rewards
          const { data: rewards, error } = await supabase
            .from('user_rewards')
            .select('points')
            .eq('user_id', currentUser.uid)
            .single();
          
          if (error) throw error;
          setUserRewards(rewards);
          
          toast({
            title: "Welcome back!",
            description: `Connected as ${currentUser.username}`,
          });
        }
      } catch (error) {
        console.error("Pi Network initialization error:", error);
        toast({
          title: "Connection Error",
          description: "Unable to connect to Pi Network. Please try again.",
          variant: "destructive",
        });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };

    checkAuthStatus();
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto" />
          <p className="text-purple-800 dark:text-purple-200 animate-pulse">
            Connecting to Pi Network...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800">
      <Menu />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent mb-6 transition-all duration-300">
            Cynect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Your bridge to Pi Network's AI-powered content creation. Connect your Pi wallet to start earning tokens and creating amazing content.
          </p>

          {!isAuthenticated ? (
            <div className="space-y-16">
              <div className="max-w-sm mx-auto">
                <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      Get Started
                    </CardTitle>
                    <CardDescription className="text-center dark:text-gray-300">
                      Connect your Pi wallet to access all features and start earning tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PiAuth onAuthenticated={handleAuthenticated} />
                  </CardContent>
                </Card>
              </div>

              <WaitlistDisplay />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                  <CardHeader className="space-y-4">
                    <div className="mx-auto bg-purple-100 dark:bg-purple-800 p-3 rounded-full w-fit">
                      <Coins className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      Earn Native Tokens
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Earn tokens daily by participating in our community and using the platform
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                  <CardHeader className="space-y-4">
                    <div className="mx-auto bg-purple-100 dark:bg-purple-800 p-3 rounded-full w-fit">
                      <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      AI-Powered Creation
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Use your earned tokens to generate unique content with our upcoming AI features
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                  <CardHeader className="space-y-4">
                    <div className="mx-auto bg-purple-100 dark:bg-purple-800 p-3 rounded-full w-fit">
                      <Exchange className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      Token Exchange
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Exchange your earned tokens for Pi coins in the future
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                    Connected ✓
                  </CardTitle>
                  {userRewards && (
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <Coins className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                      <span className="text-lg font-semibold text-purple-600 dark:text-purple-300">
                        {userRewards.points} Tokens
                      </span>
                    </div>
                  )}
                  <CardDescription className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Visit daily to earn more tokens for upcoming AI features and Pi coin exchanges
                  </CardDescription>
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