import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiAuth } from "@/components/PiAuth";
import { TokenSummary } from "@/components/TokenSummary";
import { WaitlistDisplay } from "@/components/WaitlistDisplay";
import { Coins, Sparkles, Trophy, Users, Brain, Rocket, Target } from "lucide-react";

export const UnauthenticatedView = ({ onAuthenticated }: { onAuthenticated: () => void }) => (
  <div className="space-y-16">
    {/* Hero Section */}
    <div className="text-center space-y-6 animate-fade-in">
      <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent animate-scale-up">
        Welcome to Cynect
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Your gateway to the future of Pi Network. Join our community to earn tokens, unlock achievements, 
        and shape the future of decentralized content creation.
      </p>
    </div>

    {/* Connect Button Section */}
    <div className="max-w-sm mx-auto transform hover:scale-105 transition-all duration-300">
      <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Get Started
          </CardTitle>
          <CardDescription className="text-center text-gray-400 dark:text-gray-300">
            Connect with Pi Browser to access exclusive features and start earning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PiAuth onAuthenticated={onAuthenticated} />
        </CardContent>
      </Card>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {[
        {
          icon: Trophy,
          title: "Achievement System",
          description: "Complete challenges and earn exclusive badges that showcase your contributions to the Pi Network ecosystem"
        },
        {
          icon: Coins,
          title: "Token Rewards",
          description: "Earn CYN tokens through daily activities, community engagement, and content creation"
        },
        {
          icon: Brain,
          title: "AI Integration",
          description: "Access cutting-edge AI tools to create engaging content and contribute to the Pi Network community"
        },
        {
          icon: Users,
          title: "Community Hub",
          description: "Connect with fellow pioneers, share insights, and collaborate on projects that shape the future"
        },
        {
          icon: Target,
          title: "Personalized Goals",
          description: "Set and track your progress with customized objectives aligned with the Pi Network ecosystem"
        },
        {
          icon: Rocket,
          title: "Early Access",
          description: "Join the waitlist to be among the first to experience new features and earn exclusive rewards"
        }
      ].map((feature, index) => (
        <Card 
          key={feature.title}
          className="border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg animate-fade-in group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="space-y-4">
            <div className="mx-auto bg-purple-100/20 dark:bg-purple-800/20 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
            </div>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
              {feature.title}
            </CardTitle>
            <CardDescription className="text-gray-400 dark:text-gray-300">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>

    {/* Token Summary Preview */}
    <div className="max-w-4xl mx-auto px-4">
      <TokenSummary />
    </div>

    {/* Waitlist Section */}
    <div className="max-w-4xl mx-auto px-4">
      <WaitlistDisplay />
    </div>
  </div>
);