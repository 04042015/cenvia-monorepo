import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const RightSidebar = () => {
  const popularTags = [
    "Politik", "Ekonomi", "Olahraga", "Teknologi", "Kesehatan",
    "Pendidikan", "Hiburan", "Lifestyle", "Kuliner", "Travel",
    "Bisnis", "Hukum", "Sosial", "Budaya", "Lingkungan"
  ];

  return (
    <aside className="space-y-6">
      {/* TAG POPULER */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-primary text-white p-4 rounded-t-lg">
          <h3 className="font-bold text-lg">TAG POPULER</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <a
                key={index}
                href="#"
                className="inline-block bg-gray-100 hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA FOLLOW */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-primary text-white p-4 rounded-t-lg">
          <h3 className="font-bold text-lg">FOLLOW US</h3>
        </div>
        <div className="p-4 space-y-3">
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Facebook className="w-5 h-5" />
            <span className="font-medium">Facebook</span>
            <span className="ml-auto text-sm">125K</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
          >
            <Twitter className="w-5 h-5" />
            <span className="font-medium">Twitter</span>
            <span className="ml-auto text-sm">89K</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-medium">Instagram</span>
            <span className="ml-auto text-sm">156K</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Youtube className="w-5 h-5" />
            <span className="font-medium">YouTube</span>
            <span className="ml-auto text-sm">78K</span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-medium">LinkedIn</span>
            <span className="ml-auto text-sm">45K</span>
          </a>
        </div>
      </div>

      {/* Advertisement */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500 font-medium">Advertisement</p>
        <p className="text-gray-400 text-sm mt-2">300 x 250</p>
      </div>
    </aside>
  );
};

export default RightSidebar;