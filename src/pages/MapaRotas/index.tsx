import { Flex, Spin, Typography, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIconBlue from "../../img/leaflet/marker-icon-blue.png";
import markerIcon2xBlue from "../../img/leaflet/marker-icon-2x-blue.png";
import markerIconGreen from "../../img/leaflet/marker-icon-green.png";
import markerIcon2xGreen from "../../img/leaflet/marker-icon-2x-green.png";
import markerShadow from "../../img/leaflet/marker-shadow.png";

import "./style.css";

import axiosService from "../../config/axios";
import endPoints from "../../config/endPoints";

const { Title, Paragraph } = Typography;

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrlBlue: markerIcon2xBlue,
    iconRetinaUrlGreen: markerIcon2xGreen,
    iconUrlBlue: markerIconBlue,
    iconUrlGreen: markerIconGreen,
    iconUrlMarkerShadow: markerShadow,
});

const customIconBlue = L.icon({
    iconUrl: markerIcon2xBlue,
    shadowUrl: markerShadow,
    iconSize: [25, 45],
    iconAnchor: [10, 50]
});

const customIconGreen = L.icon({
    iconUrl: markerIcon2xGreen,
    shadowUrl: markerShadow,
    iconSize: [25, 45],
    iconAnchor: [10, 50]
});

function Mapa() {

    const [local, setLocal] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const [localColeta, setLocalColeta] = useState<[{
        nome: String;
        endereco: String;
        latitude: number;
        longitude: number;
    }] | null>(null);

    const [enderecoPonto, setEnderecoPonto] = useState<String | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [localizacaoAtiva, setLocalizacaoAtiva] = useState<boolean>(false);
    const [loadingLocalizacao, setLoadingLocalizacao] = useState<boolean>(false);

    useEffect(() => {
        const carregarTudo = async () => {
            try {
                const localizacaoSalva = localStorage.getItem("localizacaoAtiva");

                await Promise.all([
                    buscarPontosColetas()
                ]);

                if (localizacaoSalva === "true") {
                    await localizar();
                    setLocalizacaoAtiva(true);
                }

            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        carregarTudo();
    }, []);

    const handleToggleLocalizacao = (checked: boolean) => {
        if (checked) {
            setLoadingLocalizacao(true);

            localizar()
                .then(() => {
                    message.success("Localização ativada!");
                    setLocalizacaoAtiva(true);
                    localStorage.setItem("localizacaoAtiva", "true");
                })
                .catch(() => {
                    message.error("Permissão negada.");
                    setLocalizacaoAtiva(false);
                    localStorage.setItem("localizacaoAtiva", "false");
                })
                .finally(() => {
                    setLoadingLocalizacao(false);
                });

        } else {
            setLocal(null);
            setLocalizacaoAtiva(false);
            localStorage.setItem("localizacaoAtiva", "false");
            message.info("Localização desativada.");
        }
    };

    const localizar = () => {
        return new Promise<void>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocal({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    resolve();
                },
                (error) => reject(error)
            );
        });
    };

    const buscarPontosColetas = async () => {
        try {
            const { data } = await axiosService.get(endPoints.pontoColeta);
            const dataFilter = data.map((item: any) => ({
                nome: item.nome,
                endereco: item.endereco,
                lat: item.latitude,
                lng: item.longitude
            }));
            setLocalColeta(dataFilter);
        } catch (e) {
            console.log(e)
        }
    }

    const handleClickPonto = (endereco: String) => {
        setEnderecoPonto(endereco);
    }

    if (loading) {
        return (
            <Flex
                style={{ height: "100vh" }}
                justify="center"
                align="center"
                vertical
            >
                <Spin size="large" description="Carregando o mapa..."></Spin>
            </Flex>
        );
    } else {
        return (
            <Flex
                vertical
                justify="space-evenly"
                align="center"
                style={{
                    height: "70vh",
                    width: "90%",
                    margin: "15px 0px",
                }}>
                <Title style={{
                    textAlign: "center",
                    fontSize: "35px"
                }}>Mapa de pontos de coletas</Title>
                <Switch
                    checked={localizacaoAtiva}
                    onChange={handleToggleLocalizacao}
                    loading={loadingLocalizacao}
                    disabled={loadingLocalizacao}
                    checkedChildren="Localização ON"
                    unCheckedChildren="Localização OFF"
                    style={{ marginBottom: "15px" }}
                />
                {local ? (
                    <>
                        <Paragraph style={{
                            textAlign: "center",
                        }}>
                            Os pontos <strong style={{ color: "green" }}>VERDES</strong> são os pontos de coletas. <br />
                            Clique em um ponto para vizualizar o endereço <br />
                            {enderecoPonto && (
                                <>
                                    <strong>Endereço</strong> {enderecoPonto}
                                </>
                            )}
                        </Paragraph>
                        <Paragraph>
                            Você se encontra no ponto <strong style={{ color: "blue" }}> AZUL </strong>
                        </Paragraph>
                    </>
                ) : (
                    <>
                        <Paragraph style={{
                            textAlign: "center",
                            fontSize: "20px"
                        }}>
                            Sua localização está desativada!!! <br /> Ativa a sua localização no botão acima: Localização <strong style={{ color: "red" }}>OFF</strong> para vizualizar o mapa de pontos de coletas<br />
                        </Paragraph>
                    </>
                )}
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        height: "500px",
                        width: "100%",
                        marginBottom: "15px",
                        border: "1.5px solid #bebebe",
                    }}>
                    {local && (
                        <MapContainer
                            center={[local.lat, local.lng]}
                            scrollWheelZoom={false}
                            zoom={15}
                            style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            <Marker position={[local.lat, local.lng]} icon={customIconBlue}>
                                <Popup offset={[2, -40]}>Você está aqui</Popup>
                            </Marker>

                            {localColeta && (localColeta.map((localPontos: any, index: number) => (
                                <Marker
                                    key={index}
                                    position={[localPontos.lat, localPontos.lng] as [number, number]}
                                    icon={customIconGreen}
                                    eventHandlers={{
                                        click: () => handleClickPonto(localPontos.endereco)
                                    }}>
                                    <Popup offset={[2, -40]}>
                                        <strong>Ponto de coleta:</strong>  {localPontos.nome} <br />
                                        <strong>Endereço:</strong>  {localPontos.endereco}
                                    </Popup>
                                </Marker>
                            )))}
                        </MapContainer>)}
                </Flex>
            </Flex>
        )
    }
}

export default Mapa;