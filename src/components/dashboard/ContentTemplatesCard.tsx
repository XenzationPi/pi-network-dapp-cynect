import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const ContentTemplatesCard = () => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          Content Templates
        </CardTitle>
        <CardDescription>
          Pre-made Content Frameworks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Access ready-to-use templates for creating engaging Pi Network content.
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
        >
          Browse Templates
        </Button>
      </CardContent>
    </Card>
  );
};