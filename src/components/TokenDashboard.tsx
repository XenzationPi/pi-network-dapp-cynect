import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Coins, Trophy, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const TokenDashboard = () => {
  const { toast } = useToast();

  const { data: rules } = useQuery({
    queryKey: ['tokenRules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_distribution_rules')
        .select('*')
        .order('tokens_awarded', { ascending: false });
      
      if (error) {
        toast({
          title: "Error loading token rules",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  const { data: history } = useQuery({
    queryKey: ['tokenHistory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('token_earning_history')
        .select('*')
        .order('earned_at', { ascending: false })
        .limit(5);
      
      if (error) {
        toast({
          title: "Error loading token history",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-500" />
            Token Earning Opportunities
          </CardTitle>
          <CardDescription>
            Complete tasks to earn CYN tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Reward (CYN)</TableHead>
                <TableHead>Daily Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules?.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">
                    {rule.description}
                  </TableCell>
                  <TableCell>{rule.tokens_awarded}</TableCell>
                  <TableCell>{rule.daily_limit || "Unlimited"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-purple-500" />
            Recent Earnings
          </CardTitle>
          <CardDescription>
            Your latest token earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Amount (CYN)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history?.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {entry.action_type}
                  </TableCell>
                  <TableCell>{entry.tokens_earned}</TableCell>
                  <TableCell>
                    {new Date(entry.earned_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};