import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { piNetwork } from "@/lib/pi-sdk";
import { Award, Star, ArrowUp, Trophy, Crown, PenTool, Users, MessageSquare, Lightbulb, Coins, Heart, Cpu, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const iconMap: Record<string, React.ComponentType<any>> = {
  award: Award,
  star: Star,
  "arrow-up": ArrowUp,
  trophy: Trophy,
  crown: Crown,
  "pen-tool": PenTool,
  users: Users,
  "message-square": MessageSquare,
  lightbulb: Lightbulb,
  coins: Coins,
  heart: Heart,
  cpu: Cpu,
  shield: Shield
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements?.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon_name] || Award;
            const isEarned = earnedAchievementIds.has(achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`p-6 rounded-lg border transform transition-all duration-300 hover:scale-105 animate-fade-in ${
                  isEarned
                    ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-200 dark:border-purple-700 shadow-lg'
                    : 'bg-gray-50/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${
                    isEarned
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      isEarned
                        ? 'text-white animate-pulse'
                        : 'text-gray-500 dark:text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg mb-1 ${
                      isEarned
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    {isEarned && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                        <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
                          Earned
                        </p>
                      </div>
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