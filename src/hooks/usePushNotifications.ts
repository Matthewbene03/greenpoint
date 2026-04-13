import { useCallback, useEffect, useState } from "react";
import { subscribeToPush, unsubscribeFromPush } from "../utils/pushNotifications";
import { supabase } from "../services/supabase";

const SAVE_SUBSCRIPTION_URL =
  "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/save-subscription";

const SEND_NOTIFICATION_URL =
  "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/send-notification";

export function usePushNotifications() {
  const isSupported =
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window;

  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    setPermission(Notification.permission);

    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then(setSubscription);
    });
  }, [isSupported]);

  const subscribe = useCallback(async () => {
    setIsLoading(true);

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== "granted") return null;

      const sub = await subscribeToPush();
      setSubscription(sub);

      if (sub) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("Usuário não autenticado.");
        }

        const response = await fetch(SAVE_SUBSCRIPTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(sub.toJSON()),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao salvar subscription.");
        }
      }

      return sub;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    setIsLoading(true);

    try {
      await unsubscribeFromPush();
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendTestNotification = useCallback(async () => {
    if (!subscription) {
      throw new Error("Nenhuma subscription ativa.");
    }

    const response = await fetch(SEND_NOTIFICATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        title: "GreenPoint",
        body: "Push notification real enviada com sucesso.",
        url: "/",
        icon: "/icons/icon-192.png",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao enviar push de teste.");
    }

    return data;
  }, [subscription]);

  return {
    isSupported,
    permission,
    subscription,
    isLoading,
    subscribe,
    unsubscribe,
    sendTestNotification,
  };
}