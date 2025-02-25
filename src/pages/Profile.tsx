
import { ProfileForm } from "@/components/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { useEffect, useState } from "react";
import { PublicProfileView } from "@/components/PublicProfileView";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserCircle2, Trophy, Calendar, Activity, Link, Edit2, Star, Medal, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface SocialLinks {
  github?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

interface ProfileStats {
  joinedDate: string;
  achievementsCount: number;
  totalPoints: number;
  socialLinks?: SocialLinks;
  bio?: string;
}

interface Achievement {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, name: "Early Adopter", icon: "🌟", description: "Joined during beta phase" },
    { id: 2, name: "First Token", icon: "🎯", description: "Earned first PGI token" },
    { id: 3, name: "Community Builder", icon: "❤️", description: "Helped grow the community" }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const currentUser = piNetwork.getCurrentUser();
        
        if (currentUser) {
          setIsAuthenticated(true);
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', currentUser.uid)
            .single();

          const { data: achievements } = await supabase
            .from('user_achievements')
            .select('*')
            .eq('user_id', currentUser.uid);

          const { data: rewards } = await supabase
            .from('user_rewards')
            .select('points, last_action_at')
            .eq('user_id', currentUser.uid)
            .maybeSingle();

          setProfileStats({
            joinedDate: rewards?.last_action_at ? new Date(rewards.last_action_at).toLocaleDateString() : 'N/A',
            achievementsCount: achievements?.length || 0,
            totalPoints: rewards?.points || 0,
            socialLinks: profile?.social_links as SocialLinks || {},
            bio: profile?.bio || 'Tell us about yourself!'
          });
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: "Unable to load profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [toast]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {isAuthenticated ? (
          <>
            {/* Profile Header Card */}
            <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <UserCircle2 className="w-20 h-20 text-purple-300" />
                    <div>
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
                        Your Profile
                      </CardTitle>
                      <CardDescription className="text-gray-300 mt-2">
                        {profileStats?.bio}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-purple-500/20 hover:bg-purple-500/30"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Profile Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                    <Calendar className="w-8 h-8 mx-auto text-purple-300 mb-2" />
                    <p className="text-purple-100 font-medium">Joined</p>
                    <p className="text-purple-200 text-sm">{profileStats?.joinedDate}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                    <Trophy className="w-8 h-8 mx-auto text-purple-300 mb-2" />
                    <p className="text-purple-100 font-medium">Achievements</p>
                    <p className="text-purple-200 text-sm">{profileStats?.achievementsCount}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                    <Activity className="w-8 h-8 mx-auto text-purple-300 mb-2" />
                    <p className="text-purple-100 font-medium">Points</p>
                    <p className="text-purple-200 text-sm">{profileStats?.totalPoints} PGI</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Achievements Section */}
            <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-purple-100">
                  <Medal className="w-6 h-6 text-purple-300" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 bg-purple-800/20 rounded-lg hover:bg-purple-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <h3 className="text-purple-100 font-medium">{achievement.name}</h3>
                      </div>
                      <p className="text-purple-200 text-sm">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profile Form in Edit Mode */}
            {isEditing && (
              <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-100">Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <PublicProfileView />
        )}
      </div>
    </div>
  );
};

export default Profile;
