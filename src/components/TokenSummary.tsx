import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Coins, Sunrise, MessagesSquare, PenTool } from "lucide-react";

const iconMap: Record<string, React.ComponentType> = {
  daily_login: Sunrise,
  login_streak: Coins,
  community_comment: MessagesSquare,
  content_creation: PenTool,
};

export const TokenSummary = () => {
  const { data: rules } = useQuery({
    queryKey: ['tokenRulesSummary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_distribution_rules')
        .select('*')
        .order('tokens_awarded', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
          <Coins className="h-6 w-6 text-purple-500" />
          Earn CYN Tokens
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Complete tasks to earn CYN tokens and unlock special features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {rules?.map((rule) => {
            const Icon = iconMap[rule.action_type] || Coins;
            return (
              <div 
                key={rule.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-800/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                    <Icon className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="font-medium text-purple-700 dark:text-purple-300">
                      {rule.description}
                    </p>
                    {rule.daily_limit && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Limit: {rule.daily_limit}x per day
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                    +{rule.tokens_awarded} CYN
                  </p>
                </div>
              </div>
            );
          })}
          {!rules?.length && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Loading token earning rules...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};