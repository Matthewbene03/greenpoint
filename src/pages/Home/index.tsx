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
            flex={1}
            vertical
            justify="center"
            align="center"
            style={{
                width: "100%",
            }}>
            <Flex
                align="center">
                <Title>Olá, Usuario 69</Title>
            </Flex>
            <Flex
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
                        height: "auto",
                        width: "50%",
                        fontSize: "20px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        padding: "10px"
                    }}
                    onClick={handleBtnCalendario}>
                    Calendario de coletas</Button>
                <Button
                    type="primary"
                    block
                    style={{
                        height: "auto",
                        width: "50%",
                        fontSize: "20px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        padding: "10px"
                    }}
                    onClick={handleBtnMapa}>
                    Mapa de pontos de coleta</Button>
            </Flex>
        </Flex>
    )
}

export default Home;