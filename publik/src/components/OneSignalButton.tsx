import React, { useEffect, useState } from "react";

// OneSignal Button Component // Usage: import OneSignalButton from './OneSignalButton' and put <OneSignalButton /> in your article page. // This component lazy-loads OneSignal SDK, initializes it with the provided App ID, // and shows a single "Aktifkan Notifikasi" button which triggers the OneSignal prompt.

export default function OneSignalButton() {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false); 
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null); 
  const [checking, setChecking] = useState(true);

// Replace appId below with your OneSignal App ID (already set by the generator) const ONE_SIGNAL_APP_ID = "bc79ef20-31f8-4ef3-afb4-3cac82e3b44e";

useEffect(() => { // Inject OneSignal SDK script if not present if (!window || (window as any).OneSignal) { setIsSdkLoaded(Boolean((window as any).OneSignal)); return; }

const script = document.createElement("script");
script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
script.async = true;
script.onload = () => {
  (window as any).OneSignal = (window as any).OneSignal || [];
  (window as any).OneSignal.push(() => {
    try {
      (window as any).OneSignal.init({
        appId: ONE_SIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false, // we use our own button
        },
      });
    } catch (err) {
      // ignore init errors
      // console.error('OneSignal init error', err)
    }
  });
  setIsSdkLoaded(true);
};
script.onerror = () => setIsSdkLoaded(false);
document.head.appendChild(script);

return () => {
  // we intentionally do not remove the script because re-mounting should keep the SDK
};

}, []);

useEffect(() => { if (!isSdkLoaded) return;

const OneSignal = (window as any).OneSignal as any;
if (!OneSignal) return;

setChecking(true);
// Wait a short moment for OneSignal to be ready then check permission
const timer = setTimeout(async () => {
  try {
    const enabled = await OneSignal.isPushNotificationsEnabled();
    setIsEnabled(Boolean(enabled));
  } catch (err) {
    setIsEnabled(false);
  } finally {
    setChecking(false);
  }
}, 500);

return () => clearTimeout(timer);

}, [isSdkLoaded]);

const handleEnable = async () => { const OneSignal = (window as any).OneSignal as any; if (!OneSignal) return;

try {
  // Show the slidedown prompt (recommended UI for browsers)
  OneSignal.push(() => {
    try {
      // Some OneSignal installs use showSlidedownPrompt, others use showNativePrompt
      if (typeof OneSignal.showSlidedownPrompt === "function") {
        OneSignal.showSlidedownPrompt();
      } else if (typeof OneSignal.showNativePrompt === "function") {
        OneSignal.showNativePrompt();
      } else {
        // fallback: call registerForPushNotifications (may open permission prompt)
        if (typeof OneSignal.registerForPushNotifications === "function") {
          OneSignal.registerForPushNotifications();
        }
      }
    } catch (e) {
      // ignore UI errors
    }
  });

  // Re-check state after a short delay so button updates
  setTimeout(async () => {
    try {
      const enabled = await OneSignal.isPushNotificationsEnabled();
      setIsEnabled(Boolean(enabled));
    } catch (err) {
      setIsEnabled(false);
    }
  }, 1200);
} catch (err) {
  // console.error(err)
}

};

// Simple Tailwind-styled button. If you don't use Tailwind, replace with your own styles. return ( <div className="inline-block"> {checking ? ( <button className="px-4 py-2 rounded-2xl border text-sm" disabled> Memeriksa... </button> ) : isEnabled ? ( <button className="px-4 py-2 rounded-2xl border text-sm bg-gray-100 cursor-default" disabled> Notifikasi Aktif </button> ) : ( <button
onClick={handleEnable}
className="px-4 py-2 rounded-2xl border text-sm hover:opacity-90 transition"
aria-label="Aktifkan Notifikasi"
> Aktifkan Notifikasi </button> )} </div> ); }

                               
