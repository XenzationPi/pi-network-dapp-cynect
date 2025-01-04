import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { useEffect, useState } from "react";

export const WaitlistDisplay = () => {
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const currentUser = piNetwork.getCurrentUser();

  // Query to get total waitlist count
  const { data: totalCount } = useQuery({
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
        const { data } = await supabase
          .rpc('get_waitlist_position', {
            user_uid: currentUser.uid
          });
        setUserPosition(data);
      }
    };
    fetchPosition();
  }, [currentUser?.uid]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-white dark:from-purple-900 dark:via-purple-800 dark:to-purple-950 border-purple-200 dark:border-purple-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent animate-fade-in">
            Join the Waitlist
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Be part of the next generation of Pi Network pioneers
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center p-6 bg-white/50 dark:bg-purple-900/50 rounded-lg backdrop-blur-sm animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                {totalCount?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Pioneers Waiting
              </p>
            </div>
            {userPosition && (
              <div className="text-center p-6 bg-white/50 dark:bg-purple-900/50 rounded-lg backdrop-blur-sm animate-slide-in opacity-0" style={{ animationDelay: '0.4s' }}>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
                  #{userPosition}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Your Position
                </p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our growing community of Pi Network pioneers. Connect your Pi wallet to secure your spot and be among the first to experience our revolutionary AI-powered platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};