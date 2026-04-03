import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Drawer, Button, Flex } from 'antd';

import { Menu } from "./styled"
import * as rotas from "../../config/rotas"

function NavMenu() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const navigate = useNavigate();
    const from = location.state?.from || rotas.Home; //Pega o caminho anterior que chegou nessa tela
    const [open, setOpen] = useState<boolean>(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const closeDrawer = () => {
        setOpen(false);
    }

    const handleClickPerfil = (e: any) => {
        e.preventDefault();
        //Futuramente, verificar se o usuario está logado para poder ver o perfil dele. Se não estiver, mandar ele para a pagina de login
        navigate(rotas.EditarUsario, {
            state: { from: location.pathname }
        });
        closeDrawer();
    }

    const handleClickSair = (e: any) => {
        //Disparar uma action de login_failure
    }

    const handleClickArrow = (e: any) => {
        e.preventDefault();
        navigate(from, { replace: true });
    }

    const limparPath = (textPath: String) => {
        if (textPath.length < 2) return "";
        return textPath[1].toUpperCase() + textPath.slice(2);
    }

    return (
        <>
            <Drawer
                title={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: "10px"
                        }}>
                        <div>
                            <span>👤</span>
                            <strong>Usuário 69</strong>
                        </div>
                        <p>
                            usuario69@gmail.com
                        </p>
                    </div>
                }
                placement="left"
                mask={{ blur: true }}
                onClose={closeDrawer}
                open={open}
                width={"auto"}
                >
                <Flex
                    vertical
                    align='start'
                    justify='flex-start'
                    gap={"10px"}
                    style={{
                        height: "100%"
                    }}>
                    <Button
                        type="link"
                        onClick={handleClickPerfil}
                        style={{
                            color: "black",
                            fontSize: "20px"
                        }}>Perfil </Button>
                    <Button
                        type="link"
                        onClick={handleClickSair}
                        style={{
                            color: "black",
                            fontSize: "20px"
                        }}> Sair </Button>
                </Flex>
            </Drawer>
            <Menu>
                {path === rotas.Home ? (
                    <>
                        < IoMenuSharp id="arrowToReturn" onClick={showDrawer} />
                        <h1>Home</h1>
                    </>
                ) : (
                    <>
                        < FaLongArrowAltLeft id="arrowToReturn" onClick={handleClickArrow} />
                        <h1>{limparPath(path)}</h1>
                    </>
                )}
            </Menu>
        </>
    )
}

export default NavMenu;