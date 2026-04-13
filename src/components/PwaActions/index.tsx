import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export default function PwaActions() {
  const [installReady, setInstallReady] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      deferredPrompt = event as BeforeInstallPromptEvent;
      setInstallReady(true);
      console.log("beforeinstallprompt disparado");
    };

    const installedHandler = () => {
      deferredPrompt = null;
      setInstallReady(false);
      console.log("PWA instalada");
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      alert("O navegador ainda não liberou a instalação.");
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    setInstallReady(false);
  };

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Seu navegador não suporta notificações.");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      alert("Service Worker não suportado.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Permissão não concedida.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification("GreenPoint", {
      body: "Notificações ativadas com sucesso!",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    });
  };

  return (
    <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
      {installReady && (
        <button onClick={installApp}>
          Instalar App
        </button>
      )}

      <button onClick={enableNotifications}>
        Ativar Notificações
      </button>
    </div>
  );
}