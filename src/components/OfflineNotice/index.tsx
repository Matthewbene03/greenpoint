import { useEffect, useState } from "react";

export default function OfflineNotice() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (online) return null;

  return (
    <div style={{
      background:"#ef4444",
      color:"white",
      padding:"10px",
      textAlign:"center"
    }}>
      Você está offline
    </div>
  );
}