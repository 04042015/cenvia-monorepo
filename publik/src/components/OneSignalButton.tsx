import React, { useEffect, useState } from "react";

// OneSignal Button Component
// Usage: import OneSignalButton from './OneSignalButton'
// and put <OneSignalButton /> in your article page.
// This component lazy-loads OneSignal SDK, initializes it with the provided App ID,
// and shows a single "Aktifkan Notifikasi" button which triggers the OneSignal prompt.

export default function OneSignalButton() {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  // Replace appId below with your OneSignal App ID
  const ONE_SIGNAL_APP_ID = "bc79ef20-31f8-4ef3-afb4-3cac82e3b44e";

  useEffect(() => {
    // Inject OneSignal SDK script if not present
    if (typeof window === "undefined" || (window as any).OneSignal) {
      setIsSdkLoaded(Boolean((window as any).OneSignal));
      return;
    }

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
        } catch {
          // ignore init errors
        }
      });
      setIsSdkLoaded(true);
    };
    script.onerror = () => setIsSdkLoaded(false);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isSdkLoaded) return;
    const OneSignal = (window as any).OneSignal as any;
    if (!OneSignal) return;

    setChecking(true);
    const timer = setTimeout(async () => {
      try {
        const enabled = await OneSignal.isPushNotificationsEnabled();
        setIsEnabled(Boolean(enabled));
      } catch {
        setIsEnabled(false);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isSdkLoaded]);

  const handleEnable = async () => {
    const OneSignal = (window as any).OneSignal as any;
    if (!OneSignal) return;

    try {
      OneSignal.push(() => {
        try {
          if (typeof OneSignal.showSlidedownPrompt === "function") {
            OneSignal.showSlidedownPrompt();
          } else if (typeof OneSignal.showNativePrompt === "function") {
            OneSignal.showNativePrompt();
          } else if (
            typeof OneSignal.registerForPushNotifications === "function"
          ) {
            OneSignal.registerForPushNotifications();
          }
        } catch {
          // ignore UI errors
        }
      });

      setTimeout(async () => {
        try {
          const enabled = await OneSignal.isPushNotificationsEnabled();
          setIsEnabled(Boolean(enabled));
        } catch {
          setIsEnabled(false);
        }
      }, 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="inline-block">
      {checking ? (
        <button className="px-4 py-2 rounded-2xl border text-sm" disabled>
          Memeriksa...
        </button>
      ) : isEnabled ? (
        <button
          className="px-4 py-2 rounded-2xl border text-sm bg-gray-100 cursor-default"
          disabled
        >
          Notifikasi Aktif
        </button>
      ) : (
        <button
          onClick={handleEnable}
          className="px-4 py-2 rounded-2xl border text-sm hover:opacity-90 transition"
          aria-label="Aktifkan Notifikasi"
        >
          Aktifkan Notifikasi
        </button>
      )}
    </div>
  );
      }
