import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PiAuth } from "@/components/PiAuth";

interface ConnectSectionProps {
  onAuthenticated: () => void;
}

export const ConnectSection = ({ onAuthenticated }: ConnectSectionProps) => {
  return (
    <div id="connect-section" className="max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
      <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Start Your Journey
          </CardTitle>
          <CardDescription className="text-center text-gray-400 dark:text-gray-300">
            Connect with Pi Browser to unlock exclusive features and start earning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PiAuth onAuthenticated={onAuthenticated} />
        </CardContent>
      </Card>
    </div>
  );
};