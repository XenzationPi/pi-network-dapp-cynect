import { CommunityHubCard } from "./dashboard/CommunityHubCard";
import { LearningCenterCard } from "./dashboard/LearningCenterCard";
import { ContentTemplatesCard } from "./dashboard/ContentTemplatesCard";
import { PiRewardsCard } from "./dashboard/PiRewardsCard";
import { AIWaitlistCard } from "./dashboard/AIWaitlistCard";
import { ComingSoonCard } from "./dashboard/ComingSoonCard";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommunityHubCard />
        <LearningCenterCard />
        <ContentTemplatesCard />
        <PiRewardsCard />
        <AIWaitlistCard />
        <ComingSoonCard />
      </div>
    </div>
  );
};