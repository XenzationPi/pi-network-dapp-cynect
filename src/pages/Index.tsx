
import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { LoadingScreen } from "@/components/LoadingScreen";
import { UnauthenticatedView } from "@/components/UnauthenticatedView";
import { AuthenticatedView } from "@/components/AuthenticatedView";
import { RecommendationsPanel } from "@/components/RecommendationsPanel";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, CircuitBoard, Coins, Users, Trophy } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [userRewards, setUserRewards] = useState<{ points: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Immediately show features while checking Pi Network in background
    const initializeSDK = async () => {
      try {
        // Check if Pi Network is available
        if (window.Pi) {
          setSdkLoaded(true);
          await piNetwork.init();
          const currentUser = piNetwork.getCurrentUser();
          
          if (currentUser) {
            setIsAuthenticated(true);
            const { data: rewards } = await supabase
              .from('user_rewards')
              .select('points')
              .eq('user_id', currentUser.uid)
              .single();
            
            if (rewards) {
              setUserRewards(rewards);
              toast({
                title: "Welcome back!",
                description: `Connected as ${currentUser.username}`,
              });
            }
          }
        }
      } catch (error) {
        console.error("Pi Network initialization error:", error);
        // Don't show error toast when not in Pi Browser
        if (window.Pi) {
          toast({
            title: "Connection Error",
            description: "Unable to connect to Pi Network. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    initializeSDK();
  }, []);

  // Show loading screen only during actual loading states
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-cyan-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30 animate-gradient" />
      
      <div className="relative z-10">
        <Menu />
        <div className="container mx-auto px-4 py-12">
          {!sdkLoaded || !isAuthenticated ? (
            <UnauthenticatedView onAuthenticated={() => setIsAuthenticated(true)} />
          ) : (
            <div className="space-y-8">
              <AuthenticatedView userRewards={userRewards} />
              <RecommendationsPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
