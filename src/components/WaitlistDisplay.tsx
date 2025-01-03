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
      <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900 dark:to-purple-950 border-purple-200 dark:border-purple-800 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-800 dark:text-purple-200">
            Join the Waitlist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center animate-fade-in">
              <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">
                {totalCount?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pioneers Waiting
              </p>
            </div>
            {userPosition && (
              <div className="text-center animate-slide-in">
                <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">
                  #{userPosition}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your Position
                </p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our growing community of Pi Network pioneers. Connect your Pi wallet to secure your spot and be among the first to experience our revolutionary AI-powered platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};