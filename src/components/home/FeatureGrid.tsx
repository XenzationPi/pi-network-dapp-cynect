import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Coins, Trophy, Users, Target, Rocket } from "lucide-react";

export const FeatureGrid = () => {
  const features = [
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
  ];

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
      role="region"
      aria-label="Platform features"
    >
      {features.map((feature, index) => (
        <Card 
          key={feature.title}
          className="border-purple-200/30 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg animate-fade-in group overflow-hidden relative"
          style={{ animationDelay: `${index * 100}ms` }}
          tabIndex={0}
          role="article"
          aria-labelledby={`feature-title-${index}`}
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            aria-hidden="true"
          />
          <CardHeader className="space-y-4">
            <div 
              className="mx-auto bg-purple-100/20 dark:bg-purple-800/20 p-3 rounded-full w-fit group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            >
              <feature.icon className="w-8 h-8 text-cyan-400 dark:text-cyan-300" />
            </div>
            <CardTitle 
              id={`feature-title-${index}`}
              className="text-xl text-center bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent"
            >
              {feature.title}
            </CardTitle>
            <CardDescription className="text-gray-400 dark:text-gray-300 text-center">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};