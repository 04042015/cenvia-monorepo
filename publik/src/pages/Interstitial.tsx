import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Interstitial = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    // inject script iklan ke container
    const container = document.getElementById("ad-container");

    if (container) {
      container.innerHTML = ""; // kosongkan biar nggak dobel

      // script inline (atOptions)
      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.innerHTML = `
        atOptions = {
          'key' : '04879f51524482d2e291253584d89ae6',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      container.appendChild(script1);

      // script external (invoke.js)
      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src = "//www.highperformanceformat.com/04879f51524482d2e291253584d89ae6/invoke.js";
      container.appendChild(script2);
    }

    // timer redirect
    const timer = setTimeout(() => {
      if (slug) {
        navigate(`/post/${slug}`);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [slug, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4">Advertisement</h1>
      <p className="text-gray-600 mb-6">
        Tunggu 3 detik, Anda akan diarahkan ke artikel
      </p>

      {/* container untuk iklan */}
      <div
        id="ad-container"
        className="w-[300px] h-[250px] flex items-center justify-center border rounded bg-white shadow"
      >
        {/* script iklan akan masuk ke sini */}
      </div>
    </div>
  );
};

export default Interstitial;
