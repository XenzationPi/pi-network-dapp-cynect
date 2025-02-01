import { Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
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
    </div>
  );
};