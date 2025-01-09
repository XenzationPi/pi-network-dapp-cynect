import { ProfileForm } from "@/components/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicProfileView } from "@/components/PublicProfileView";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserCircle2, Trophy, Calendar, Activity } from "lucide-react";

interface ProfileStats {
  joinedDate: string;
  achievementsCount: number;
  totalPoints: number;
}

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = piNetwork.getCurrentUser();
        setIsAuthenticated(!!user);
        
        if (user) {
          // Fetch profile statistics
          const { data: achievements } = await supabase
            .from('user_achievements')
            .select('*')
            .eq('user_id', user.uid);

          const { data: rewards } = await supabase
            .from('user_rewards')
            .select('points, created_at')
            .eq('user_id', user.uid)
            .single();

          setProfileStats({
            joinedDate: new Date(rewards?.created_at || Date.now()).toLocaleDateString(),
            achievementsCount: achievements?.length || 0,
            totalPoints: rewards?.points || 0
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again.",
          variant: "destructive",
        });
      }
    };

    checkAuth();
  }, [toast]);

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <PublicProfileView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <UserCircle2 className="w-20 h-20 text-purple-300" />
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
              Your Profile
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Manage your profile and view your achievements
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        {profileStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-purple-300 mb-2" />
                </div>
                <CardTitle className="text-center text-lg text-purple-100">Joined</CardTitle>
                <CardDescription className="text-center text-purple-200">
                  {profileStats.joinedDate}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-purple-300 mb-2" />
                </div>
                <CardTitle className="text-center text-lg text-purple-100">Achievements</CardTitle>
                <CardDescription className="text-center text-purple-200">
                  {profileStats.achievementsCount}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-center">
                  <Activity className="w-8 h-8 text-purple-300 mb-2" />
                </div>
                <CardTitle className="text-center text-lg text-purple-100">Total Points</CardTitle>
                <CardDescription className="text-center text-purple-200">
                  {profileStats.totalPoints}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Profile Form */}
        <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
          <CardContent className="p-6">
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;