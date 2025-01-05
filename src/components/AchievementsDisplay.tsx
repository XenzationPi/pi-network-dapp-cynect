import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { piNetwork } from "@/lib/pi-sdk";
import { Award, Star, ArrowUp, Trophy, Crown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const iconMap: Record<string, React.ComponentType<any>> = {
  award: Award,
  star: Star,
  "arrow-up": ArrowUp,
  trophy: Trophy,
  crown: Crown,
};

export const AchievementsDisplay = () => {
  const { toast } = useToast();
  const currentUser = piNetwork.getCurrentUser();

  const { data: achievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('required_points', { ascending: true });
      
      if (error) {
        toast({
          title: "Error loading achievements",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  const { data: userAchievements } = useQuery({
    queryKey: ['userAchievements', currentUser?.uid],
    queryFn: async () => {
      if (!currentUser?.uid) return [];
      const { data, error } = await supabase
        .from('user_achievements')
        .select('achievement_id, earned_at')
        .eq('user_id', currentUser.uid);
      
      if (error) {
        toast({
          title: "Error loading user achievements",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!currentUser?.uid,
  });

  const earnedAchievementIds = new Set(userAchievements?.map(ua => ua.achievement_id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-500" />
          Achievements
        </CardTitle>
        <CardDescription>
          Complete tasks and earn badges to showcase your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements?.map((achievement) => {
            const IconComponent = iconMap[achievement.icon_name] || Award;
            const isEarned = earnedAchievementIds.has(achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  isEarned
                    ? 'bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    isEarned
                      ? 'bg-purple-100 dark:bg-purple-800'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      isEarned
                        ? 'text-purple-600 dark:text-purple-300'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      isEarned
                        ? 'text-purple-700 dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    {isEarned && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        ✓ Earned
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};