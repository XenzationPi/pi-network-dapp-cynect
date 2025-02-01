import { Search, Filter, ArrowDownCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Search functionality will be implemented later
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl" />
        <Card className="border-2 border-purple-200/30 dark:border-purple-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/10 dark:bg-purple-900/10 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent" id="search-section-title">
              Discover Pi Network Content
            </CardTitle>
            <CardDescription className="text-lg text-gray-300">
              Search through our curated collection of Pi Network resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6" role="search" aria-labelledby="search-section-title">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    type="search"
                    placeholder="Search for content, creators, or topics..."
                    className="w-full h-14 pl-12 pr-4 bg-white/10 dark:bg-purple-900/20 border-2 border-purple-200/30 dark:border-purple-700/30 rounded-lg text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    aria-label="Search input"
                    role="searchbox"
                  />
                  <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <Button 
                  className="h-14 px-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
                  onClick={handleSearch}
                  aria-label="Perform search"
                >
                  Search
                  <Filter className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
              role="list"
              aria-label="Search guidance steps"
            >
              {[
                {
                  icon: Search,
                  title: "Search",
                  description: "Enter keywords related to Pi Network content"
                },
                {
                  icon: Filter,
                  title: "Filter",
                  description: "Refine results by category, date, or popularity"
                },
                {
                  icon: ArrowDownCircle,
                  title: "Discover",
                  description: "Find and engage with valuable Pi Network resources"
                }
              ].map((step, index) => (
                <div 
                  key={step.title}
                  className="flex flex-col items-center p-4 space-y-3 bg-white/5 rounded-lg border border-purple-200/20 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  role="listitem"
                  tabIndex={0}
                >
                  <div className="p-3 rounded-full bg-purple-500/20" aria-hidden="true">
                    <step.icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-300">{step.title}</h3>
                  <p className="text-gray-400 text-center text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};