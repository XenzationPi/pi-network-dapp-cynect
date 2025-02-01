import { ProfileForm } from "@/components/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { useEffect, useState } from "react";
import { PublicProfileView } from "@/components/PublicProfileView";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserCircle2, Trophy, Calendar, Activity, Link, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileStats {
  joinedDate: string;
  achievementsCount: number;
  totalPoints: number;
  socialLinks?: { [key: string]: string };
  bio?: string;
}

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);
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
            socialLinks: profile?.social_links || {},
            bio: profile?.bio || ''
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
                        {profileStats?.bio || "Add a bio to tell others about yourself"}
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
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-purple-300 mb-2" />
                  </div>
                  <CardTitle className="text-center text-lg text-purple-100">Joined</CardTitle>
                  <CardDescription className="text-center text-purple-200">
                    {profileStats?.joinedDate}
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
                    {profileStats?.achievementsCount}
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
                    {profileStats?.totalPoints}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-purple-900/20">
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="social">Social Links</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
                  <CardContent className="p-6">
                    <ProfileForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="social">
                <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="w-5 h-5" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {Object.entries(profileStats?.socialLinks || {}).map(([platform, url]) => (
                      <div key={platform} className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10">
                        <span className="capitalize text-purple-100">{platform}</span>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:text-cyan-400 transition-colors"
                        >
                          {url}
                        </a>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <PublicProfileView />
        )}
      </div>
    </div>
  );
};

export default Profile;