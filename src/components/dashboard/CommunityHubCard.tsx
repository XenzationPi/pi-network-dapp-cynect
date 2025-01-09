import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export const CommunityHubCard = () => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-500" />
          Community Hub
        </CardTitle>
        <CardDescription>
          Connect with other Pioneers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Join discussions, share ideas, and collaborate with fellow Pi Network enthusiasts.
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
        >
          Join Community
        </Button>
      </CardContent>
    </Card>
  );
};