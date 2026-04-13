import { Button, Typography, Space, Alert, message } from "antd";
import { usePushNotifications } from "../hooks/usePushNotifications";

const { Paragraph, Text } = Typography;

export function PushNotificationManager() {
  const {
    isSupported,
    permission,
    subscription,
    isLoading,
    subscribe,
    unsubscribe,
    sendTestNotification,
  } = usePushNotifications();

  if (!isSupported) {
    return (
      <Alert
        type="warning"
        message="Push notifications não são suportadas neste navegador."
        showIcon
      />
    );
  }

  if (permission === "denied") {
    return (
      <Alert
        type="error"
        message="Notificações bloqueadas"
        description="Habilite as notificações nas configurações do navegador e do sistema operacional."
        showIcon
      />
    );
  }

  const handleSubscribe = async () => {
    try {
      const sub = await subscribe();

      if (!sub) {
        message.error(
          "Não foi possível ativar as notificações. Verifique as permissões do navegador."
        );
        return;
      }

      message.success("Push notifications ativadas com sucesso.");
    } catch (error: any) {
      message.error(error?.message || "Erro ao ativar notificações.");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribe();
      message.success("Push notifications desativadas.");
    } catch (error: any) {
      message.error(error?.message || "Erro ao desativar notificações.");
    }
  };

  const handleTestPush = async () => {
    try {
      await sendTestNotification();
      message.success("Push de teste enviada.");
    } catch (error: any) {
      message.error(error?.message || "Erro ao enviar push de teste.");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {subscription ? (
          <>
            <Text strong>Push notifications ativadas.</Text>

            <Space wrap>
              <Button onClick={handleTestPush} loading={isLoading} type="primary">
                Enviar push de teste
              </Button>

              <Button onClick={handleUnsubscribe} loading={isLoading}>
                Desativar notificações
              </Button>
            </Space>
          </>
        ) : (
          <>
            <Paragraph>Receba notificações desta aplicação.</Paragraph>

            <Button onClick={handleSubscribe} loading={isLoading} type="primary">
              Ativar notificações push
            </Button>
          </>
        )}
      </Space>
    </div>
  );
}