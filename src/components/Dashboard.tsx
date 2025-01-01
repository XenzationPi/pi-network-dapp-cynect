import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Manage your content and earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Track your content creation journey and Pi earnings in one place.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-purple-300 text-purple-700"
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};