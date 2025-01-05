import { Loader2 } from "lucide-react";

export const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800 flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto" />
      <p className="text-purple-800 dark:text-purple-200 animate-pulse">
        Connecting to Pi Network...
      </p>
    </div>
  </div>
);