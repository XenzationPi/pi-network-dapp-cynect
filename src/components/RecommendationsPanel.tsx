import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, ArrowRight } from "lucide-react";
import { piNetwork } from "@/lib/pi-sdk";

export const RecommendationsPanel = () => {
  const currentUser = piNetwork.getCurrentUser();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', currentUser?.uid],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-recommendations', {
        body: { user_id: currentUser?.uid },
      });
      if (error) throw error;
      return data;
    },
    enabled: !!currentUser?.uid,
  });

  if (isLoading) {
    return (
      <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 animate-pulse">
        <CardHeader>
          <div className="h-7 bg-purple-200/30 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-purple-200/20 rounded w-1/2"></div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
          <Trophy className="h-6 w-6 text-purple-500" />
          Your Next Achievements
        </CardTitle>
        <CardDescription>
          Personalized recommendations to earn more rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendations?.nextAchievement && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                Next Achievement: {recommendations.nextAchievement.title}
              </h3>
              <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
            </div>
            <Progress 
              value={(recommendations.nextAchievement.required_points - recommendations.potentialRewards) / recommendations.nextAchievement.required_points * 100} 
              className="h-2 bg-purple-200 dark:bg-purple-800"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {recommendations.potentialRewards} points to go!
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold text-purple-700 dark:text-purple-300">
            Suggested Actions
          </h3>
          {recommendations?.suggestedActions.map((action: any) => (
            <div 
              key={action.id}
              className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {action.description}
                </span>
              </div>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                +{action.tokens_awarded} CYN
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};