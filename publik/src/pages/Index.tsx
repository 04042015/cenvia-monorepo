// publik/src/pages/Index.tsx
import { useState } from "react";
import NewsGrid from "@/components/NewsGrid";
import RightSidebar from "@/components/RightSidebar";
import NetworkSidebar from "@/components/NetworkSidebar";

const Index = () => {
  const [isNetworkSidebarOpen, setIsNetworkSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <NetworkSidebar 
        isOpen={isNetworkSidebarOpen} 
        onClose={() => setIsNetworkSidebarOpen(false)} 
      />

      <main className="container mx-auto px-4 py-8">
        {/* Desktop: 4 columns (3 news + 1 sidebar), Tablet: 2 columns (news + sidebar), Mobile: 1 column (stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="md:col-span-1 lg:col-span-3">
            <NewsGrid />
          </div>
          <div className="md:col-span-1 lg:col-span-1">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
