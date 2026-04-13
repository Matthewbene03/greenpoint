export function registerSW() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registrado:", registration);

      await navigator.serviceWorker.ready;
      console.log("Service Worker pronto para controlar a página");
    } catch (error) {
      console.error("Erro ao registrar o Service Worker:", error);
    }
  });
}