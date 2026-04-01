import { Flex, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import * as rotas from "../../config/rotas"

const { Title } = Typography;

function Home() {

    const navigate = useNavigate();

    const handleBtnCalendario = (e: any) => {
        e.preventDefault();
        navigate(rotas.Calendario, {
            state: { from: location.pathname } 
        });
    }

    const handleBtnMapa = (e: any) => {
        e.preventDefault();
        navigate(rotas.Mapa, {
            state: { from: location.pathname } 
        });
    }

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{
                height: "700px",
                width: "100%",
            }}>
            <Flex
                flex={15}
                align="center">
                <Title>Olá, Usuario 69</Title>
            </Flex>
            <Flex
                flex={85}
                vertical
                justify="center"
                align="center"
                gap="20px"
                style={{
                    width: "100%"
                }}>
                <Button
                    type="primary"
                    block
                    style={{
                        width: "40%",
                        padding: "20px 0",
                    }}
                    onClick={handleBtnCalendario}>
                    Calendario de coletas</Button>
                <Button
                    type="primary"
                    block
                    style={{
                        width: "40%",
                        padding: "20px 0",
                    }}
                    onClick={handleBtnMapa}>
                    Mapa de pontos para coletas</Button>
            </Flex>
        </Flex>
    )
}

export default Home;