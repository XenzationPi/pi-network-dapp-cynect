import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

type LeaderboardEntry = {
  username: string;
  points: number;
  rank: number;
};

export const Leaderboard = () => {
  const { toast } = useToast();

  const { data: leaderboard, refetch } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_leaderboard');
      if (error) {
        toast({
          title: "Error loading leaderboard",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data as LeaderboardEntry[];
    },
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_rewards' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Trophy className="h-6 w-6 text-purple-500" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard?.map((entry, index) => (
            <div
              key={entry.username}
              className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-purple-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-102 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 font-bold">
                  {getRankIcon(entry.rank) || entry.rank}
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {entry.username}
                </span>
              </div>
              <span className="font-mono text-purple-600 dark:text-purple-300">
                {entry.points} CYN
              </span>
            </div>
          ))}
          {(!leaderboard || leaderboard.length === 0) && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No entries yet. Start earning tokens to appear on the leaderboard!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};