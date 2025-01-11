import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { piNetwork } from "@/lib/pi-sdk";
import { Trophy, Star, Sunrise, MessagesSquare, PenTool } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const iconMap: Record<string, React.ComponentType<any>> = {
  sunrise: Sunrise,
  "messages-square": MessagesSquare,
  "pen-tool": PenTool,
  trophy: Trophy
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

  const { data: userRewards } = useQuery({
    queryKey: ['userRewards', currentUser?.uid],
    queryFn: async () => {
      if (!currentUser?.uid) return null;
      const { data, error } = await supabase
        .from('user_rewards')
        .select('points')
        .eq('user_id', currentUser.uid)
        .single();
      
      if (error) {
        toast({
          title: "Error loading user rewards",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
    enabled: !!currentUser?.uid,
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
  const currentPoints = userRewards?.points || 0;

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-purple-500 animate-pulse" />
          <span className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
            Achievements
          </span>
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Complete tasks and earn badges to showcase your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {achievements?.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon_name] || Trophy;
            const isEarned = earnedAchievementIds.has(achievement.id);
            const progress = Math.min((currentPoints / achievement.required_points) * 100, 100);
            
            return (
              <div
                key={achievement.id}
                className={`p-6 rounded-lg border transform transition-all duration-300 hover:scale-102 ${
                  isEarned
                    ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-200 dark:border-purple-700'
                    : 'bg-gray-50/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${
                    isEarned
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      isEarned
                        ? 'text-white animate-pulse'
                        : 'text-gray-500 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold text-lg ${
                        isEarned
                          ? 'bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </h3>
                      {isEarned && (
                        <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {achievement.description}
                    </p>
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600 dark:text-purple-300">
                          {currentPoints} / {achievement.required_points} CYN
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                    </div>
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