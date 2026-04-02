import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const { Title, Paragraph } = Typography;

function Mapa() {

    const [local, setLocal] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        localizar();
    }, [])

    const localizar = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocal({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }

    return (
        <Flex
            vertical
            align="center"
            style={{
                height: "700px",
                width: "80%",
                overflow: "hidden"
            }}>
            <Title>Mapa de pontos de coletas</Title>
            <Paragraph>Esse são os pontos de coletas para a sua localização</Paragraph>
            <Flex
                flex={80}
                align="center"
                justify="center"
                style={{
                    width: "100%",
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
                    </MapContainer>
                )}
            </Flex>
        </Flex>
    )
}

export default Mapa;