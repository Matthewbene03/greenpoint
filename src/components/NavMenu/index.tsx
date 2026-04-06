import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Drawer, Button, Flex } from 'antd';

import { Menu } from "./styled"
import * as rotas from "../../config/rotas"
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/modules/rootReducer';
import * as actions from "../../store/modules/authorization/actions"

function NavMenu() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const navigate = useNavigate();
    const from = location.state?.from || rotas.Home; //Pega o caminho anterior que chegou nessa tela
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const { user } = useSelector((state: RootState) => state.authorization);
    const { isLoggedIn } = useSelector((state: RootState) => state.authorization);

    const showDrawer = () => {
        setOpen(true);
    }

    const closeDrawer = () => {
        setOpen(false);
    }

    const handleClickPerfil = (e: any) => {
        e.preventDefault();
        navigate(rotas.EditarUsario, {
            state: { from: location.pathname }
        });
        closeDrawer();
    }

    const handleClickLogin = (e: any) => {
        e.preventDefault();
        navigate(rotas.Login, {
            state: { from: location.pathname }
        });
        closeDrawer();
    }

    const handleClickSair = (e: any) => {
        e.preventDefault();
        dispatch(actions.loginFailure({}))
        closeDrawer();
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
                            {isLoggedIn && <span>👤</span>}
                            <strong>{user.nome}</strong>
                        </div>
                        <p>{user.email}</p>
                    </div>
                }
                placement="left"
                mask={{ blur: true }}
                onClose={closeDrawer}
                open={open}
                width={"auto"}>
                <Flex
                    vertical
                    align='start'
                    justify='flex-start'
                    gap={"10px"}
                    style={{
                        height: "100%"
                    }}>
                    {isLoggedIn ? (
                        <Button
                            type="link"
                            onClick={handleClickPerfil}
                            style={{
                                color: "black",
                                fontSize: "20px"
                            }}>Perfil </Button>
                    ) : (
                        <Button
                            type="link"
                            onClick={handleClickLogin}
                            style={{
                                color: "black",
                                fontSize: "20px"
                            }}>Entrar no seu perfil </Button>
                    )}
                    <Button
                        type="link"
                        onClick={handleClickSair}
                        style={{
                            color: "black",
                            fontSize: "20px"
                        }}> Sair </Button>
                </Flex>
            </Drawer >
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