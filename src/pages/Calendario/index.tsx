import { Button, Card, Form, Select, Typography, notification, Spin } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

type NotificationType = "success" | "info" | "warning" | "error";

function BuscarColeta() {
    const [api, contextHolder] = notification.useNotification();

    const [cidades, setCidades] = useState<string[]>([]);
    const [bairros, setBairros] = useState<string[]>([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
    const [bairroSelecionado, setBairroSelecionado] = useState<string>("");
    const [diasColeta, setDiasColeta] = useState<string>("");

    const [loadingCidades, setLoadingCidades] = useState(false);
    const [loadingBairros, setLoadingBairros] = useState(false);
    const [loadingBusca, setLoadingBusca] = useState(false);

    const openNotificationWithIcon = (
        type: NotificationType,
        title: string,
        msg: string
    ) => {
        api[type]({
            message: title,
            description: msg,
        });
    };

    useEffect(() => {
        carregarCidades();
    }, []);

    const carregarCidades = async () => {
    try {
        setLoadingCidades(true);

        const response = await fetch(
            "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/listar-cidades",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        console.log("STATUS CIDADES:", response.status);
        console.log("RESPOSTA CIDADES:", data);

        if (!response.ok) {
            openNotificationWithIcon("error", "Erro", data.error || "Erro ao carregar cidades");
            return;
        }

        setCidades(data.cidades || []);
    } catch (error) {
        console.log("ERRO AO CARREGAR CIDADES:", error);
        openNotificationWithIcon("error", "Erro", "Não foi possível carregar as cidades");
    } finally {
        setLoadingCidades(false);
    }
};

    const carregarBairros = async (cidade: string) => {
        try {
            setLoadingBairros(true);
            setBairroSelecionado("");
            setDiasColeta("");
            setBairros([]);

            const response = await fetch(
                "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/listar-bairros",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cidade }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                openNotificationWithIcon("error", "Erro", data.error || "Erro ao carregar bairros");
                return;
            }

            setBairros(data.bairros || []);
        } catch {
            openNotificationWithIcon("error", "Erro", "Não foi possível carregar os bairros");
        } finally {
            setLoadingBairros(false);
        }
    };

    const handleCidadeChange = (value: string) => {
        setCidadeSelecionada(value);
        carregarBairros(value);
    };

    const handleBuscar = async () => {
        if (!cidadeSelecionada || !bairroSelecionado) {
            openNotificationWithIcon(
                "warning",
                "Campos obrigatórios",
                "Selecione a cidade e o bairro antes de buscar"
            );
            return;
        }

        try {
            setLoadingBusca(true);
            setDiasColeta("");

            const response = await fetch(
                "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/buscar-coleta",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cidade: cidadeSelecionada,
                        bairro: bairroSelecionado,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                openNotificationWithIcon("error", "Erro", data.error || "Coleta não encontrada");
                return;
            }

            setDiasColeta(data.coleta?.dias_coleta || "");
        } catch {
            openNotificationWithIcon("error", "Erro", "Não foi possível buscar a coleta");
        } finally {
            setLoadingBusca(false);
        }
    };

    return (
        <>
            {contextHolder}

            <Form
                style={{
                    width: "90%",
                    maxWidth: "800px",
                    border: "1.5px solid #c4c4c4",
                    borderRadius: "10px",
                    padding: "20px",
                    backgroundColor: "#f8f8f8",
                }}
            >
                <Form.Item>
                    <Title style={{ textAlign: "center" }}>
                        Consulte os dias da coleta
                    </Title>
                </Form.Item>

                <Form.Item label="Cidade" required>
                    <Select
                        showSearch
                        placeholder="Selecione a cidade"
                        value={cidadeSelecionada || undefined}
                        onChange={handleCidadeChange}
                        loading={loadingCidades}
                        optionFilterProp="children"
                        style={{
                            height: "50px",
                            fontSize: "18px",
                        }}
                    >
                        {cidades.map((cidade) => (
                            <Option key={cidade} value={cidade}>
                                {cidade}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Bairro" required>
                    <Select
                        showSearch
                        placeholder="Selecione o bairro"
                        value={bairroSelecionado || undefined}
                        onChange={(value) => setBairroSelecionado(value)}
                        loading={loadingBairros}
                        disabled={!cidadeSelecionada}
                        optionFilterProp="children"
                        style={{
                            height: "50px",
                            fontSize: "18px",
                        }}
                    >
                        {bairros.map((bairro) => (
                            <Option key={bairro} value={bairro}>
                                {bairro}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button
                        type="primary"
                        onClick={handleBuscar}
                        loading={loadingBusca}
                        style={{
                            height: "auto",
                            width: "50%",
                            fontSize: "20px",
                            whiteSpace: "normal",
                            textAlign: "center",
                            padding: "10px",
                        }}
                    >
                        Buscar
                    </Button>
                </Form.Item>

                {loadingBusca && (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <Spin size="large" />
                    </div>
                )}

                {diasColeta && !loadingBusca && (
                    <Card
                        style={{
                            marginTop: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <Title level={4}>Dias da coleta</Title>
                        <Text>
                            <strong>Cidade:</strong> {cidadeSelecionada}
                        </Text>
                        <br />
                        <Text>
                            <strong>Bairro:</strong> {bairroSelecionado}
                        </Text>
                        <br />
                        <br />
                        <Text>
                            <strong>O caminhão passa em:</strong> {diasColeta}
                        </Text>
                    </Card>
                )}
            </Form>
        </>
    );
}

export default BuscarColeta;