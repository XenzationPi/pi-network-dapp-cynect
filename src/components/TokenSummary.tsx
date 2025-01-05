import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Coins } from "lucide-react";

export const TokenSummary = () => {
  const { data: rules } = useQuery({
    queryKey: ['tokenRulesSummary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_distribution_rules')
        .select('*')
        .order('tokens_awarded', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Coins className="h-6 w-6 text-purple-500" />
          Earn CYN Tokens
        </CardTitle>
        <CardDescription>
          Complete tasks to earn CYN tokens and unlock special features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules?.map((rule) => (
            <div key={rule.id} className="flex justify-between items-center border-b border-purple-100 dark:border-purple-700 pb-2">
              <div>
                <p className="font-medium text-purple-700 dark:text-purple-300">{rule.description}</p>
                {rule.daily_limit && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Limit: {rule.daily_limit}x per day
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600 dark:text-purple-300">
                  {rule.tokens_awarded} CYN
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};