import { Alert, AlertDescription } from "@/components/ui/alert";
import { Medal } from "lucide-react";

interface WaitlistStatusProps {
  nftBadgeStatus: string;
  nftTokenId?: string;
}

export const WaitlistStatus = ({ nftBadgeStatus, nftTokenId }: WaitlistStatusProps) => {
  const getStatusMessage = () => {
    switch (nftBadgeStatus) {
      case 'pending':
        return "Your exclusive NFT badge will be minted soon!";
      case 'minted':
        return "Your NFT badge has been minted and will be transferred to your wallet soon!";
      case 'transferred':
        return (
          <>
            Your NFT badge has been transferred to your wallet!
            {nftTokenId && (
              <span className="block mt-1 text-sm">
                Token ID: {nftTokenId}
              </span>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const message = getStatusMessage();
  if (!message) return null;

  return (
    <Alert className="bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700">
      <Medal className="h-4 w-4 text-purple-600 dark:text-purple-300" />
      <AlertDescription className="text-purple-700 dark:text-purple-200">
        {message}
      </AlertDescription>
    </Alert>
  );
};