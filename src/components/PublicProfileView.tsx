import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserCircle2, Lock } from "lucide-react";

export const PublicProfileView = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
          <CardHeader className="text-center">
            <UserCircle2 className="w-20 h-20 mx-auto text-purple-300 mb-4" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
              Join Our Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-300">
                Create your profile to unlock exclusive features:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Earn daily tokens
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Track achievements
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Join the leaderboard
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Access exclusive content
                </li>
              </ul>
            </div>
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
              >
                Connect with Pi Browser
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};