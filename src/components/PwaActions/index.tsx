import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export default function PwaActions() {
  const [installReady, setInstallReady] = useState(false);
  const [installSupported, setInstallSupported] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      deferredPrompt = event as BeforeInstallPromptEvent;
      setInstallReady(true);
      setInstallSupported(true);
      console.log("beforeinstallprompt disparado com sucesso");
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      console.log("PWA instalada");
      deferredPrompt = null;
      setInstallReady(false);
    });

    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;

      if (isStandalone) {
        console.log("App já está instalado");
        setInstallReady(false);
      }
    };

    checkInstalled();

    const timer = setTimeout(() => {
      if (!deferredPrompt) {
        console.log("beforeinstallprompt não foi disparado");
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      alert("O navegador ainda não liberou a instalação da PWA.");
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("Resultado da instalação:", choice.outcome);

    deferredPrompt = null;
    setInstallReady(false);
  };

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Seu navegador não suporta notificações.");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      alert("Seu navegador não suporta Service Worker.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Permissão de notificação não concedida.");
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
      <button onClick={installApp} disabled={!installReady}>
        {installReady ? "Instalar App" : "Instalação indisponível"}
      </button>

      <button onClick={enableNotifications}>
        Ativar Notificações
      </button>

      {!installReady && installSupported && (
        <span>O app já pode estar instalado ou o navegador não liberou o prompt.</span>
      )}
    </div>
  );
}