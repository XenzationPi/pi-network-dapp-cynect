import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface WaitlistStatsProps {
  dailyLimit?: number;
  waitlistCount: number;
  spotsRemaining?: number;
}

export const WaitlistStats = ({ dailyLimit, waitlistCount, spotsRemaining }: WaitlistStatsProps) => {
  return (
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
    </>
  );
};