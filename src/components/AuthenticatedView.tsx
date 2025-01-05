import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TokenDashboard } from "@/components/TokenDashboard";
import { ProfileForm } from "@/components/ProfileForm";
import { Dashboard } from "@/components/Dashboard";
import { Leaderboard } from "@/components/Leaderboard";
import { AchievementsDisplay } from "@/components/AchievementsDisplay";
import { Coins } from "lucide-react";

interface AuthenticatedViewProps {
  userRewards: { points: number } | null;
}

export const AuthenticatedView = ({ userRewards }: AuthenticatedViewProps) => (
  <div className="space-y-8">
    <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-purple-900/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-100 bg-clip-text text-transparent">
          Connected ✓
        </CardTitle>
        {userRewards && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Coins className="w-5 h-5 text-purple-600 dark:text-purple-300" />
            <span className="text-lg font-semibold text-purple-600 dark:text-purple-300">
              {userRewards.points} CYN
            </span>
          </div>
        )}
        <CardDescription className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          Visit daily to earn more tokens for upcoming AI features and Pi coin exchanges
        </CardDescription>
      </CardHeader>
    </Card>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <TokenDashboard />
        <ProfileForm />
        <Dashboard />
        <AchievementsDisplay />
      </div>
      <div className="space-y-8">
        <Leaderboard />
      </div>
    </div>
  </div>
);