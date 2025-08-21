import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NetworkSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkSidebar = ({ isOpen, onClose }: NetworkSidebarProps) => {
  const kanalItems = [
    "Jateng",
    "Jabar", 
    "Jatim",
    "Jakarta",
    "Sumut",
    "Sulsel",
    "Bali",
    "Kaltim"
  ];

  const regionalItems = [
    "Medan",
    "Palembang",
    "Bandung", 
    "Surabaya",
    "Semarang",
    "Yogyakarta",
    "Denpasar",
    "Makassar"
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">🌐 Network</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* KANAL Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-200 pb-2">
              KANAL
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {kanalItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  📍 {item}
                </a>
              ))}
            </div>
          </div>

          {/* REGIONAL Section */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-200 pb-2">
              REGIONAL
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {regionalItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  🏙️ {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkSidebar;