import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { piNetwork } from "@/lib/pi-sdk";
import { useState } from "react";

export const PiAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      const user = await piNetwork.authenticate();
      toast({
        title: "Authentication Successful",
        description: `Welcome ${user.username}!`,
      });
    } catch (error) {
      toast({
        title: "Authentication Failed",
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
      className="bg-pi-purple hover:bg-pi-light text-white font-bold"
    >
      {isLoading ? "Connecting..." : "Connect with Pi"}
    </Button>
  );
};