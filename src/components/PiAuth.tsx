import { Button } from "@/components/ui/button";
import { piNetwork } from "@/lib/pi-sdk";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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