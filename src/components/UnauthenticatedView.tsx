import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiAuth } from "@/components/PiAuth";
import { TokenSummary } from "@/components/TokenSummary";
import { WaitlistDisplay } from "@/components/WaitlistDisplay";
import { Coins, Sparkles, Repeat } from "lucide-react";

export const UnauthenticatedView = ({ onAuthenticated }: { onAuthenticated: () => void }) => (
  <div className="space-y-16">
    <div className="max-w-sm mx-auto">
      <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Get Started
          </CardTitle>
          <CardDescription className="text-center text-gray-400 dark:text-gray-300">
            Connect your Pi wallet to access all features and start earning tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PiAuth onAuthenticated={onAuthenticated} />
        </CardContent>
      </Card>
    </div>

    <TokenSummary />
    <WaitlistDisplay />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg animate-fade-in">
        <CardHeader className="space-y-4">
          <div className="mx-auto bg-purple-100/20 dark:bg-purple-800/20 p-3 rounded-full w-fit">
            <Coins className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
          </div>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Earn Native Tokens
          </CardTitle>
          <CardDescription className="text-gray-400 dark:text-gray-300">
            Earn tokens daily by participating in our community and using the platform
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
        <CardHeader className="space-y-4">
          <div className="mx-auto bg-purple-100/20 dark:bg-purple-800/20 p-3 rounded-full w-fit">
            <Sparkles className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
          </div>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            AI-Powered Creation
          </CardTitle>
          <CardDescription className="text-gray-400 dark:text-gray-300">
            Use your earned tokens to generate unique content with our upcoming AI features
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
        <CardHeader className="space-y-4">
          <div className="mx-auto bg-purple-100/20 dark:bg-purple-800/20 p-3 rounded-full w-fit">
            <Repeat className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
          </div>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Token Exchange
          </CardTitle>
          <CardDescription className="text-gray-400 dark:text-gray-300">
            Exchange your earned tokens for Pi coins in the future
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
);