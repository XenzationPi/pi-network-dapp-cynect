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
    <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg transform hover:scale-105">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent animate-fade-in">
          Connected ✓
        </CardTitle>
        {userRewards && (
          <div className="flex items-center justify-center space-x-2 mt-4 animate-scale-up">
            <Coins className="w-5 h-5 text-cyan-400 dark:text-cyan-300 animate-pulse" />
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              {userRewards.points} CYN
            </span>
          </div>
        )}
        <CardDescription className="text-center mt-2 text-sm text-gray-400 dark:text-gray-300 animate-fade-in" style={{ animationDelay: "100ms" }}>
          Visit daily to earn more tokens for upcoming AI features and Pi coin exchanges
        </CardDescription>
      </CardHeader>
    </Card>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8 animate-fade-in">
        <div className="transform hover:scale-105 transition-all duration-300">
          <TokenDashboard />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300">
          <ProfileForm />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300">
          <Dashboard />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300">
          <AchievementsDisplay />
        </div>
      </div>
      <div className="space-y-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="transform hover:scale-105 transition-all duration-300">
          <Leaderboard />
        </div>
      </div>
    </div>
  </div>
);