import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const ComingSoonCard = () => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Coming Soon
        </CardTitle>
        <CardDescription>
          Pi Network AI Integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Get ready for seamless integration with Pi Network's AI technology. Create amazing content and earn Pi.
        </p>
        <Button 
          disabled 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800"
        >
          Available Soon
        </Button>
      </CardContent>
    </Card>
  );
};