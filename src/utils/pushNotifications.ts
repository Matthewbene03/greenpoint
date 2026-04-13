export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push não suportado neste navegador.");
    console.log(import.meta.env.VITE_VAPID_PUBLIC_KEY)
    return null;
  }

  const registration = await navigator.serviceWorker.ready;
  const existing = await registration.pushManager.getSubscription();

  if (existing) return existing;

  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as string;

  if (!publicKey) {
    throw new Error("VITE_VAPID_PUBLIC_KEY não configurada.");
  }

  const applicationServerKey = new Uint8Array(
    urlBase64ToUint8Array(publicKey)
  );

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey as BufferSource,
  });
}

export async function unsubscribeFromPush(): Promise<boolean> {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) return false;

  return subscription.unsubscribe();
}