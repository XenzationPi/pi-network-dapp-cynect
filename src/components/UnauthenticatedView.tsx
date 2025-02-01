import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiAuth } from "@/components/PiAuth";
import { TokenSummary } from "@/components/TokenSummary";
import { WaitlistDisplay } from "@/components/WaitlistDisplay";
import { Button } from "@/components/ui/button";
import { Coins, Sparkles, Trophy, Users, Brain, Rocket, Target, ArrowRight } from "lucide-react";

export const UnauthenticatedView = ({ onAuthenticated }: { onAuthenticated: () => void }) => (
  <div className="space-y-16">
    {/* Hero Section with Vision Statement */}
    <div className="text-center space-y-8 animate-fade-in relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl" />
      <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent animate-scale-up relative">
        The Future of Pi Network
      </h1>
      <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Join Cynect to shape the future of decentralized content creation. 
        Earn tokens, unlock achievements, and be part of the next generation 
        of Pi Network pioneers.
      </p>
      
      {/* Primary CTA Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        <Button 
          onClick={() => document.querySelector('#connect-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Join the Revolution <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
        </Button>
        <Button 
          variant="outline"
          onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
          className="border-2 border-purple-500/30 hover:border-purple-500/50 text-purple-300 px-8 py-6 text-lg rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
        >
          Explore Features <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>

    {/* Connect Section */}
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

    {/* Features Grid */}
    <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {[
        {
          icon: Brain,
          title: "AI-Powered Creation",
          description: "Leverage cutting-edge AI tools to create engaging content and contribute to the Pi Network ecosystem",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          icon: Coins,
          title: "Token Economy",
          description: "Earn CYN tokens through daily activities, community engagement, and content creation",
          gradient: "from-cyan-500 to-blue-500"
        },
        {
          icon: Trophy,
          title: "Achievement System",
          description: "Complete challenges and earn exclusive badges that showcase your contributions",
          gradient: "from-orange-500 to-red-500"
        },
        {
          icon: Users,
          title: "Vibrant Community",
          description: "Connect with fellow pioneers, share insights, and collaborate on groundbreaking projects",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          icon: Target,
          title: "Personal Growth",
          description: "Set and track your progress with customized objectives aligned with the ecosystem",
          gradient: "from-yellow-500 to-orange-500"
        },
        {
          icon: Rocket,
          title: "Early Access",
          description: "Join the waitlist to be among the first to experience new features and earn exclusive rewards",
          gradient: "from-indigo-500 to-purple-500"
        }
      ].map((feature, index) => (
        <Card 
          key={feature.title}
          className="border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg animate-fade-in group overflow-hidden relative"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          <CardHeader className="space-y-4">
            <div className="mx-auto bg-purple-100/20 dark:bg-purple-800/20 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
            </div>
            <CardTitle className="text-xl text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
              {feature.title}
            </CardTitle>
            <CardDescription className="text-gray-400 dark:text-gray-300 text-center">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>

    {/* Preview Sections */}
    <div className="max-w-4xl mx-auto px-4 space-y-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl" />
        <TokenSummary />
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
        <WaitlistDisplay />
      </div>
    </div>
  </div>
);