import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Interstitial = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    // waktu tunggu sebelum redirect (misal 3 detik)
    const timer = setTimeout(() => {
      if (slug) {
        navigate(`/post/${slug}`);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [slug, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4">Tunggu sebentar...</h1>
      <p className="text-gray-600 mb-6">
        Anda akan diarahkan ke artikel dalam beberapa detik
      </p>

      {/* Tempat script iklan */}
      <div className="w-[300px] h-[250px] flex items-center justify-center border rounded bg-white shadow">
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '04879f51524482d2e291253584d89ae6',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            `,
          }}
        />
        <script
          type="text/javascript"
          src="//www.highperformanceformat.com/04879f51524482d2e291253584d89ae6/invoke.js"
        />
      </div>
    </div>
  );
};

export default Interstitial;
