import { Button, Form, Input, notification, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import * as actions from "../../store/modules/authorization/actions"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/modules/rootReducer";
import { isEmail } from "validator";
import { useEffect } from "react";

const { Title } = Typography;
type NotificationType = 'success' | 'info' | 'warning' | 'error';

function CadastroUsuario() {

    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.authorization);
    const { isLoggedIn } = useSelector((state: RootState) => state.authorization);
    let { update } = useSelector((state: RootState) => state.authorization);


    useEffect(() => {
        function mudarRota() {
            if (!isLoggedIn) { //No EditUsuario, só vai dar false caso trocar o email que lança uma ação de loginFaiulure
                navigate("/login", {
                    state: {
                        trocouEmail: true,
                        from: location.pathname
                    }
                })
            }
        }
        mudarRota();
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (update) {
            openNotificationWithIcon('success', "Edição de usuario", "Seus dados foram alterados!")
            dispatch(actions.resetUpdate())
        }
    }, [update]);

    const openNotificationWithIcon = (type: NotificationType, title: String, msg: String,) => {
        api[type]({
            title: title,
            description: msg,
        });
    };

    const onFinish = async (values: any) => {
        let formErros = false;
        let trocouEmail = false;

        if (!isEmail(values.email)) {
            openNotificationWithIcon('error', "Email invalido!", "Informe outro email que seja valido!")
            formErros = true;
        }

        if (formErros) return;

        const { id } = user;

        if (values.email !== user.email) {
            trocouEmail = true;
        }

        dispatch(actions.updateRequest({
            id: id,
            nome: values.nomeUsuario,
            email: values.email,
            senha: values.senha,
            trocouEmail
        }));
    };

    return (
        <>
            {contextHolder}
            <Form
                name="login"
                initialValues={{
                    nomeUsuario: user.nome,
                    email: user.email
                }}
                style={{
                    width: "90%",
                    maxWidth: "800px",
                    border: "1.5px solid #c4c4c4",
                    borderRadius: "10px",
                    padding: "20px",
                    backgroundColor: "#f8f8f8"
                }}
                onFinish={onFinish}>
                <Form.Item
                    name="title">
                    <Title style={{ textAlign: "center" }}>Edite o seus dados</Title>
                </Form.Item>
                <Form.Item name="nomeUsuario">
                    <Input value="usuario69" placeholder="Informe seu nome" style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }} />
                </Form.Item>
                <Form.Item name="email">
                    <Input value="usuario69@gmail.com" type="email" placeholder="Informe o seu email" style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }} />
                </Form.Item>
                <Form.Item name="senha">
                    <Input type="password" placeholder="Senha" style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }} />
                </Form.Item>
                <Form.Item name="btnEntrar" style={{
                    textAlign: "center"
                }}>
                    <Button block type="primary" htmlType="submit" style={{
                        height: "auto",
                        width: "50%",
                        fontSize: "20px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        padding: "10px"
                    }} >
                        Editar conta
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default CadastroUsuario;