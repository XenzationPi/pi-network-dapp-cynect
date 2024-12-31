import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { piNetwork } from "@/lib/pi-sdk";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const bal = await piNetwork.getBalance();
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="p-4 animate-fade-in">
      <Card className="bg-gradient-to-br from-pi-purple to-pi-light text-white">
        <CardHeader>
          <CardTitle>Pi Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {balance !== null ? `${balance} π` : "Loading..."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};