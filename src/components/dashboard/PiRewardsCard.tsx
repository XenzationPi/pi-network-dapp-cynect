import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export const PiRewardsCard = () => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-purple-500" />
          Pi Rewards
        </CardTitle>
        <CardDescription>
          Earn Pi for Engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Participate in community activities and earn Pi rewards for your contributions.
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
        >
          View Opportunities
        </Button>
      </CardContent>
    </Card>
  );
};