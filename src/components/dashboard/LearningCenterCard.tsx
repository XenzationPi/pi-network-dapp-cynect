import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const LearningCenterCard = () => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          Learning Center
        </CardTitle>
        <CardDescription>
          Pi Network Education Hub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Access educational resources about Pi Network, blockchain, and upcoming AI features.
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
        >
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );
};