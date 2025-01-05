import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { LoadingScreen } from "@/components/LoadingScreen";
import { UnauthenticatedView } from "@/components/UnauthenticatedView";
import { AuthenticatedView } from "@/components/AuthenticatedView";
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
    return <LoadingScreen />;
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
            <UnauthenticatedView onAuthenticated={handleAuthenticated} />
          ) : (
            <AuthenticatedView userRewards={userRewards} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;