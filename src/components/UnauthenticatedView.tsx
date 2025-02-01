import { TokenSummary } from "@/components/TokenSummary";
import { WaitlistDisplay } from "@/components/WaitlistDisplay";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchSection } from "@/components/home/SearchSection";
import { ConnectSection } from "@/components/home/ConnectSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";

export const UnauthenticatedView = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section with Vision Statement */}
      <HeroSection />

      {/* Enhanced Search Section */}
      <SearchSection />

      {/* Connect Section */}
      <ConnectSection onAuthenticated={onAuthenticated} />

      {/* Features Grid */}
      <FeatureGrid />

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
};