import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Star, Award, Crown, Gift, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const WaitlistDisplay = () => {
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize Pi SDK and get current user
  useEffect(() => {
    const initPiSDK = async () => {
      try {
        await piNetwork.init();
        setIsSDKLoaded(true);
        const user = piNetwork.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Pi SDK initialization error:", error);
      }
    };
    
    initPiSDK();
    // Add a small delay before showing the component to ensure smooth rendering
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Query to get total waitlist count
  const { data: totalCount, isLoading: isLoadingCount } = useQuery({
    queryKey: ['waitlistCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('waitlist_members')
        .select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  // Get user's position if they're logged in
  useEffect(() => {
    const fetchPosition = async () => {
      if (currentUser?.uid) {
        try {
          setIsLoadingPosition(true);
          const { data, error } = await supabase
            .rpc('get_waitlist_position', {
              user_uid: currentUser.uid
            });
            
          if (error) {
            console.error('Error fetching position:', error);
            toast({
              title: "Error",
              description: "Could not fetch your waitlist position",
              variant: "destructive",
            });
            return;
          }
          
          setUserPosition(data);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoadingPosition(false);
        }
      }
    };
    
    if (isSDKLoaded && currentUser?.uid) {
      fetchPosition();
    }
  }, [currentUser?.uid, isSDKLoaded, toast]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 transition-all duration-500 ease-in-out transform hover:scale-102">
      <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-white dark:from-purple-900 dark:via-purple-800 dark:to-purple-950 border-purple-200 dark:border-purple-800 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center space-x-2 mb-4">
            <Badge variant="secondary" className="animate-pulse bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100">
              Limited Spots
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100">
              Early Access
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
            Secure Your Place in Pi Network's Future
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join our exclusive waitlist and be among the first to experience groundbreaking AI features
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center p-6 bg-white/50 dark:bg-purple-900/50 rounded-lg backdrop-blur-sm">
              {isLoadingCount ? (
                <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400 mx-auto" />
              ) : (
                <>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                    {totalCount?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Pioneers Registered
                  </p>
                </>
              )}
            </div>
            {(currentUser?.uid || isLoadingPosition) && (
              <div className="text-center p-6 bg-white/50 dark:bg-purple-900/50 rounded-lg backdrop-blur-sm">
                {isLoadingPosition ? (
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400 mx-auto" />
                ) : userPosition ? (
                  <>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                      #{userPosition}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Your Position
                    </p>
                  </>
                ) : null}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/30 dark:bg-purple-900/30 rounded-lg backdrop-blur-sm">
              <Star className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">Priority Access</h3>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                Be first to access new AI features
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/30 dark:bg-purple-900/30 rounded-lg backdrop-blur-sm">
              <Gift className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">Exclusive Rewards</h3>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                Early adopter bonus tokens
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/30 dark:bg-purple-900/30 rounded-lg backdrop-blur-sm">
              <Crown className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">Pioneer Status</h3>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                Special pioneer badge and perks
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              <span className="text-purple-800 dark:text-purple-200 font-semibold">
                Limited Time Opportunity
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect your Pi wallet now to secure your position. Early members will receive exclusive benefits and priority access to upcoming AI features.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};