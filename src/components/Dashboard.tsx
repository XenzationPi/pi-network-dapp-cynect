import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, Sparkles, Coins, BookOpen, MessageSquare } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Community Hub Card */}
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

        {/* Learning Center Card */}
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

        {/* Content Templates Card */}
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

        {/* Pi Rewards Card */}
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

        {/* AI Waitlist Card */}
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

        {/* Coming Soon Card */}
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
      </div>
    </div>
  );
};