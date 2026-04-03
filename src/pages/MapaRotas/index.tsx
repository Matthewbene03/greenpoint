import { Flex, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "./style.css";

import axiosService from "../../config/axios";
import endPoints from "../../config/endPoints";

const { Title, Paragraph } = Typography;

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

    const customIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 45],
        iconAnchor: [10, 50]
    });

    useEffect(() => {
        const carregarTudo = async () => {
            try {
                await Promise.all([
                    localizar(),
                    buscarPontosColetas()
                ]);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        carregarTudo();
    }, []);

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
                    margin: "15px 0px"
                }}>
                <Title style={{
                    textAlign: "center",
                    fontSize: "35px"
                }}>Mapa de pontos de coletas</Title>
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
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            <Marker position={[local.lat, local.lng]}>
                                <Popup>Você está aqui</Popup>
                            </Marker>

                            {localColeta && (localColeta.map((localPontos: any, index: number) => (
                                <Marker
                                    key={index}
                                    position={[localPontos.lat, localPontos.lng] as [number, number]}
                                    icon={customIcon}
                                    eventHandlers={{
                                        click: () => handleClickPonto(localPontos.endereco)
                                    }}>
                                    <Popup offset={[2, -40]}>
                                        <strong>Ponto de coleta:</strong>  {localPontos.nome} <br />
                                        <strong>Endereço:</strong>  {localPontos.endereco}
                                    </Popup>
                                </Marker>
                            )))}
                        </MapContainer>
                    )}
                </Flex>
            </Flex>
        )
    }
}

export default Mapa;