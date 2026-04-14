import { Button, Card, Form, Select, Typography, notification, Spin } from "antd";
// import { EnvironmentOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

type NotificationType = "success" | "info" | "warning" | "error";

const STORAGE_KEYS = {
  cidades: "greenpoint_cidades",
  bairrosPorCidade: "greenpoint_bairros_por_cidade",
  ultimaColeta: "greenpoint_ultima_coleta",
};

function BuscarColeta() {
  const [api, contextHolder] = notification.useNotification();

  const [cidades, setCidades] = useState<string[]>([]);
  const [bairros, setBairros] = useState<string[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [bairroSelecionado, setBairroSelecionado] = useState<string>("");
  const [diasColeta, setDiasColeta] = useState<string>("");

  const [, setLoadingCidades] = useState(false);
  const [, setLoadingBairros] = useState(false);
  const [loadingBusca, setLoadingBusca] = useState(false);
  // const [loadingLocalizacao, setLoadingLocalizacao] = useState(false);

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

  // const normalizarTexto = (texto: string) =>
  //   texto
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .trim()
  //     .toLowerCase();

  const salvarUltimaColeta = (cidade: string, bairro: string, dias: string) => {
    localStorage.setItem(
      STORAGE_KEYS.ultimaColeta,
      JSON.stringify({
        cidade,
        bairro,
        diasColeta: dias,
      })
    );
  };

  const carregarUltimaColeta = () => {
    const raw = localStorage.getItem(STORAGE_KEYS.ultimaColeta);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const salvarCidades = (lista: string[]) => {
    localStorage.setItem(STORAGE_KEYS.cidades, JSON.stringify(lista));
  };

  const carregarCidadesSalvas = (): string[] => {
    const raw = localStorage.getItem(STORAGE_KEYS.cidades);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  const salvarBairrosDaCidade = (cidade: string, lista: string[]) => {
    const raw = localStorage.getItem(STORAGE_KEYS.bairrosPorCidade);
    let mapa: Record<string, string[]> = {};

    if (raw) {
      try {
        mapa = JSON.parse(raw);
      } catch {
        mapa = {};
      }
    }

    mapa[cidade] = lista;
    localStorage.setItem(STORAGE_KEYS.bairrosPorCidade, JSON.stringify(mapa));
  };

  const carregarBairrosSalvos = (cidade: string): string[] => {
    const raw = localStorage.getItem(STORAGE_KEYS.bairrosPorCidade);
    if (!raw) return [];

    try {
      const mapa = JSON.parse(raw);
      return mapa[cidade] || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    inicializarPagina();
  }, []);

  const inicializarPagina = async () => {
    const cidadesSalvas = carregarCidadesSalvas();
    if (cidadesSalvas.length > 0) {
      setCidades(cidadesSalvas);
    }

    const ultima = carregarUltimaColeta();
    if (ultima) {
      setCidadeSelecionada(ultima.cidade);
      setBairroSelecionado(ultima.bairro);
      setDiasColeta(ultima.diasColeta);

      const bairrosSalvos = carregarBairrosSalvos(ultima.cidade);
      if (bairrosSalvos.length > 0) {
        setBairros(bairrosSalvos);
      }
    }

    await carregarCidades();
  };

  const carregarCidades = async () => {
    try {
      setLoadingCidades(true);

      const response = await fetch(
        "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/listar-cidades"
      );

      const data = await response.json();

      if (!response.ok) {
        const fallback = carregarCidadesSalvas();
        if (fallback.length > 0) {
          setCidades(fallback);
          openNotificationWithIcon("warning", "Modo offline", "Usando cidades salvas.");
          return;
        }

        openNotificationWithIcon("error", "Erro", data.error);
        return;
      }

      setCidades(data.cidades || []);
      salvarCidades(data.cidades || []);
    } catch {
      openNotificationWithIcon("error", "Erro", "Erro ao carregar cidades");
    } finally {
      setLoadingCidades(false);
    }
  };

  const carregarBairros = async (cidade: string) => {
    try {
      setLoadingBairros(true);
      setBairros([]);

      const response = await fetch(
        "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/listar-bairros",
        {
          method: "POST",
          body: JSON.stringify({ cidade }),
        }
      );

      const data = await response.json();

      setBairros(data.bairros || []);
      salvarBairrosDaCidade(cidade, data.bairros || []);
    } catch {
      openNotificationWithIcon("error", "Erro", "Erro ao carregar bairros");
    } finally {
      setLoadingBairros(false);
    }
  };

  const buscarColeta = async (cidade: string, bairro: string) => {
    try {
      setLoadingBusca(true);

      const response = await fetch(
        "https://yyrnbsehaftutioojylw.supabase.co/functions/v1/buscar-coleta",
        {
          method: "POST",
          body: JSON.stringify({ cidade, bairro }),
        }
      );

      const data = await response.json();

      setDiasColeta(data.coleta?.dias_coleta || "");
      salvarUltimaColeta(cidade, bairro, data.coleta?.dias_coleta || "");
    } catch {
      openNotificationWithIcon("error", "Erro", "Erro ao buscar coleta");
    } finally {
      setLoadingBusca(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Form style={{ maxWidth: 800, margin: "auto" }}>
        <Title>Consultar coleta</Title>

        <Select
          placeholder="Cidade"
          onChange={(v) => {
            setCidadeSelecionada(v);
            carregarBairros(v);
          }}
          options={cidades.map((c) => ({ label: c, value: c }))}
        />

        <Select
          placeholder="Bairro"
          onChange={setBairroSelecionado}
          options={bairros.map((b) => ({ label: b, value: b }))}
        />

        <Button onClick={() => buscarColeta(cidadeSelecionada, bairroSelecionado)}>
          Buscar
        </Button>

        {loadingBusca && <Spin />}

        {diasColeta && (
          <Card>
            <Text>{diasColeta}</Text>
          </Card>
        )}
      </Form>
    </>
  );
}

export default BuscarColeta;