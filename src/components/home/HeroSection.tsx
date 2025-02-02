import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-[80vh] relative flex flex-col items-center justify-center overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-gray-900/95 to-cyan-900/90" />
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/lovable-uploads/984bf8a9-bab6-4a9a-ac11-46fa9e1407bf.png"
          >
            <source src="https://cdn.gpteng.co/videos/ai-network.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -top-8 right-1/4 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
        {/* Main Heading */}
        <div className="space-y-4 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-300/20 bg-purple-500/10 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-purple-300 mr-2" aria-hidden="true" />
            <span className="text-sm text-purple-300">Revolutionizing Pi Network Development</span>
          </div>
          
          <h1 
            id="hero-title"
            className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent animate-scale-up relative"
            tabIndex={0}
          >
            PANGEAI
          </h1>
        </div>

        {/* Description */}
        <p 
          className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-150"
          tabIndex={0}
        >
          Join PANGEAI to shape the future of decentralized content creation. 
          Earn tokens, unlock achievements, and be part of the next generation 
          of Pi Network pioneers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fade-in delay-300">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/profile")}
          >
            Try Beta Version
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-lg border-purple-300/20 bg-purple-500/10 hover:bg-purple-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              const element = document.getElementById('connect-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Discover More
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in delay-450">
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Total Tokens", value: "1M+" },
            { label: "Daily Rewards", value: "50K" },
            { label: "NFTs Minted", value: "5K+" }
          ].map((stat) => (
            <div 
              key={stat.label}
              className="text-center p-4 rounded-lg border border-purple-300/20 bg-purple-500/10 backdrop-blur-sm"
              tabIndex={0}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};