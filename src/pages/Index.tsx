import { useState, useEffect } from "react";
import { piNetwork } from "@/lib/pi-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "@/components/Menu";
import { LoadingScreen } from "@/components/LoadingScreen";
import { UnauthenticatedView } from "@/components/UnauthenticatedView";
import { AuthenticatedView } from "@/components/AuthenticatedView";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

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
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative">
        <Menu />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 space-y-6 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent mb-6 transition-all duration-300 animate-scale-up">
                Cynect
              </h1>
              <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-purple-500 animate-pulse" />
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-white/30 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-100 dark:border-purple-700 shadow-xl animate-slide-in">
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
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};

export default Index;