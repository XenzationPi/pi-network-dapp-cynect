import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export const AIWaitlistCard = () => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          AI Waitlist
        </CardTitle>
        <CardDescription>
          Priority Access Program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Join the waitlist for early access to Pi Network's AI features when they launch.
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
        >
          Join Waitlist
        </Button>
      </CardContent>
    </Card>
  );
};