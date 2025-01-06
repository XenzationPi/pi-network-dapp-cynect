import { Loader2, Sparkles } from "lucide-react";

export const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    
    <div className="relative z-10 text-center space-y-4 backdrop-blur-sm bg-white/30 dark:bg-purple-950/30 p-8 rounded-xl border border-purple-100 dark:border-purple-700 shadow-2xl animate-fade-in">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto" />
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-purple-500 animate-pulse" />
      </div>
      <p className="text-purple-800 dark:text-purple-200 animate-pulse font-medium">
        Connecting to Pi Network...
      </p>
    </div>
    
    {/* Decorative background elements */}
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
    </div>
  </div>
);