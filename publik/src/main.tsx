import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Import global styles
import "./index.css";  // Wajib untuk Tailwind
import "./app.css";    // Opsional kalau kamu punya styling tambahan

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
