import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Github, Twitter, Globe } from "lucide-react";

interface ProfileFormData {
  full_name: string;
  bio: string;
  website: string;
  github: string;
  twitter: string;
}

export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          bio: data.bio,
          website: data.website,
          social_links: {
            github: data.github,
            twitter: data.twitter,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-purple-100">Full Name</label>
        <Input
          {...register("full_name")}
          placeholder="Enter your full name"
          className="bg-purple-900/20 border-purple-500/30"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-purple-100">Bio</label>
        <Textarea
          {...register("bio")}
          placeholder="Tell us about yourself"
          className="bg-purple-900/20 border-purple-500/30 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-purple-100">Website</label>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-purple-300" />
          <Input
            {...register("website")}
            placeholder="https://your-website.com"
            className="bg-purple-900/20 border-purple-500/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-purple-100">GitHub</label>
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-purple-300" />
          <Input
            {...register("github")}
            placeholder="https://github.com/username"
            className="bg-purple-900/20 border-purple-500/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-purple-100">Twitter</label>
        <div className="flex items-center space-x-2">
          <Twitter className="w-5 h-5 text-purple-300" />
          <Input
            {...register("twitter")}
            placeholder="https://twitter.com/username"
            className="bg-purple-900/20 border-purple-500/30"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
};