import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { WaitlistStatus } from "./waitlist/WaitlistStatus";
import { WaitlistStats } from "./waitlist/WaitlistStats";

export const WaitlistDisplay = () => {
  const currentUser = piNetwork.getCurrentUser();

  const { data: distributionRule, isLoading: isLoadingRule } = useQuery({
    queryKey: ["waitlistLimit"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("token_distribution_rules")
        .select("daily_limit")
        .eq("action_type", "waitlist_early_access")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const { data: waitlistCount, isLoading: isLoadingCount } = useQuery({
    queryKey: ["waitlistCount"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("waitlist_members")
        .select("*", { count: 'exact', head: true });

      if (error) throw error;
      return count || 0;
    },
  });

  const { data: userBadgeStatus, isLoading: isLoadingBadge } = useQuery({
    queryKey: ["nftBadgeStatus", currentUser?.uid],
    queryFn: async () => {
      if (!currentUser?.uid) return null;
      
      const { data, error } = await supabase
        .from("waitlist_members")
        .select("nft_badge_status, nft_token_id")
        .eq("user_id", currentUser.uid)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!currentUser?.uid,
  });

  const isLoading = isLoadingRule || isLoadingCount || isLoadingBadge;
  const dailyLimit = distributionRule?.daily_limit;
  const spotsRemaining = dailyLimit ? dailyLimit - (waitlistCount || 0) : null;

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
          Join the Waitlist
        </CardTitle>
        <CardDescription className="text-center dark:text-gray-300">
          Be among the first to experience our platform and receive an exclusive NFT badge
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Loading waitlist information...
          </p>
        ) : (
          <>
            <WaitlistStats 
              dailyLimit={dailyLimit}
              waitlistCount={waitlistCount || 0}
              spotsRemaining={spotsRemaining}
            />
            {userBadgeStatus && (
              <WaitlistStatus 
                nftBadgeStatus={userBadgeStatus.nft_badge_status}
                nftTokenId={userBadgeStatus.nft_token_id}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};