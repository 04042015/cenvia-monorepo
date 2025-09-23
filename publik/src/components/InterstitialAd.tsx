import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function InterstitialAd() {
  const [countdown, setCountdown] = useState(3); // hitung mundur 3 detik
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    // inject Adsterra script
    const adContainer = document.getElementById("interstitial-ad-slot");
    if (adContainer) {
      adContainer.innerHTML = `
        <script type="text/javascript">
          atOptions = {
            'key' : '04879f51524482d2e291253584d89ae6',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/04879f51524482d2e291253584d89ae6/invoke.js"></script>
      `;
    }
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate(redirectUrl);
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate, redirectUrl]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
      <div className="text-center max-w-md">
        <p className="text-lg mb-4">Advertisement</p>

        {/* Slot Adsterra */}
        <div className="bg-gray-800 w-full h-48 flex items-center justify-center mb-4 relative">
          <span className="absolute text-gray-400">Loading Ads...</span>
          <div id="interstitial-ad-slot" className="w-full h-full"></div>
        </div>

        <p className="text-sm">
          TUNGGU <span className="font-bold">{countdown}</span> DETIK UNTUK MEMBACA ARTIKEL
        </p>
      </div>
    </div>
  );
          }
