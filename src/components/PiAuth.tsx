import { Button } from "@/components/ui/button";
import { piNetwork } from "@/lib/pi-sdk";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PiAuthProps {
  onAuthenticated?: () => void;
}

export const PiAuth = ({ onAuthenticated }: PiAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async () => {
    try {
      setIsLoading(true);
      const user = await piNetwork.authenticate();
      console.log("Authenticated user:", user);

      // Create or update the user profile in Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.uid,
          username: user.username,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }

      toast({
        title: "Successfully connected",
        description: `Welcome ${user.username}!`,
      });
      onAuthenticated?.();
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAuth} 
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
    >
      {isLoading ? "Connecting..." : "Connect Pi Wallet"}
    </Button>
  );
};