import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Medal } from "lucide-react";
import { piNetwork } from "@/lib/pi-sdk";

export const WaitlistDisplay = () => {
  const currentUser = piNetwork.getCurrentUser();

  // Query to get the waitlist limit
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

  // Query to get total waitlist members
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

  // Query to get user's NFT badge status if authenticated
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
            {dailyLimit && (
              <Alert className="bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700">
                <Info className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                <AlertDescription className="text-purple-700 dark:text-purple-200">
                  Limited spots available! Only the first {dailyLimit.toLocaleString()} members will get early access.
                  {spotsRemaining !== null && spotsRemaining > 0 && (
                    <span className="block mt-1 font-semibold">
                      {spotsRemaining.toLocaleString()} spots remaining
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}
            {typeof waitlistCount === 'number' && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {waitlistCount.toLocaleString()} members have already joined
              </p>
            )}
            {userBadgeStatus && (
              <Alert className="bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700">
                <Medal className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                <AlertDescription className="text-purple-700 dark:text-purple-200">
                  {userBadgeStatus.nft_badge_status === 'pending' ? (
                    "Your exclusive NFT badge will be minted soon!"
                  ) : userBadgeStatus.nft_badge_status === 'minted' ? (
                    "Your NFT badge has been minted and will be transferred to your wallet soon!"
                  ) : userBadgeStatus.nft_badge_status === 'transferred' ? (
                    <>
                      Your NFT badge has been transferred to your wallet!
                      {userBadgeStatus.nft_token_id && (
                        <span className="block mt-1 text-sm">
                          Token ID: {userBadgeStatus.nft_token_id}
                        </span>
                      )}
                    </>
                  ) : null}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};