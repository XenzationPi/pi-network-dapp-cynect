import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { LoadingScreen } from "@/components/LoadingScreen";
import { UnauthenticatedView } from "@/components/UnauthenticatedView";
import { AuthenticatedView } from "@/components/AuthenticatedView";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Neurons } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Neural network background overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/lovable-uploads/d7099fbe-fdfd-43ba-99d2-dcf6b7c2fb07.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "contrast(120%) brightness(150%)",
        }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 animate-gradient" />
      
      {/* Glowing orbs effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Menu />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 space-y-6 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300 mb-6 filter drop-shadow-lg animate-scale-up">
                Cynect
              </h1>
              <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-purple-300 animate-pulse" />
            </div>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 shadow-2xl animate-slide-in">
              Your bridge to Pi Network's AI-powered content creation. Connect your Pi wallet to start earning tokens and creating amazing content.
            </p>

            <div className="relative z-10 backdrop-blur-sm">
              {!isAuthenticated ? (
                <UnauthenticatedView onAuthenticated={handleAuthenticated} />
              ) : (
                <AuthenticatedView userRewards={userRewards} />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Neural connection lines */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 200">
          <path
            className="text-purple-500/20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M0,100 C300,10 900,190 1200,100"
          />
          <path
            className="text-blue-500/20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            d="M0,150 C300,60 900,240 1200,150"
          />
        </svg>
      </div>
    </div>
  );
};

export default Index;