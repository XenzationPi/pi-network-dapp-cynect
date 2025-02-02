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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-cyan-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30 animate-gradient" />
      
      <div className="relative z-10">
        <Menu />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 space-y-6 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 mb-6 filter drop-shadow-lg animate-scale-up">
                Cynect
              </h1>
              <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-purple-300 animate-pulse" />
            </div>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed glass-morphism p-6 rounded-lg animate-slide-in">
              Your bridge to Pi Network's AI-powered content creation. Connect your Pi wallet to start earning tokens and creating amazing content.
            </p>

            {!isAuthenticated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16">
                {[
                  {
                    icon: Coins,
                    title: "Daily Rewards",
                    description: "Earn tokens daily through login streaks and active participation"
                  },
                  {
                    icon: Sparkles,
                    title: "AI Creation",
                    description: "Use earned tokens to generate unique content with our AI tools"
                  },
                  {
                    icon: Users,
                    title: "Community",
                    description: "Engage with others and earn rewards for valuable contributions"
                  },
                  {
                    icon: Trophy,
                    title: "Achievements",
                    description: "Complete challenges and climb the leaderboard rankings"
                  }
                ].map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="glass-morphism p-6 rounded-lg transform hover:scale-105 transition-all duration-300 animate-fade-in hover:bg-white/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                        <feature.icon className="h-8 w-8 text-purple-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-center">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                <AuthenticatedView userRewards={userRewards} />
                <RecommendationsPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;