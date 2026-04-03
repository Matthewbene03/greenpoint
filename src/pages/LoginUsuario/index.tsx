import React from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import * as rotas from "../../config/rotas";

const { Title, Paragraph } = Typography;

function LoginUsuario() {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const handleClickCadastrarUsuario = (e: any) => {
        e.preventDefault();
        navigate(rotas.CadastrarUsuario, {
            state: {
                from: location.pathname
            }
        })
    }

    return (
        <Form
            name="login"
            initialValues={{ remember: true }}
            style={{
                width: "90%",
                maxWidth: "800px",
                border: "1.5px solid #c4c4c4",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f8f8f8"
            }}
            onFinish={onFinish}>
            <Form.Item name="title">
                <Title style={{ textAlign: "center" }}>
                    Faça o seu Login
                </Title>
            </Form.Item>

            <Form.Item
                name="usuario"
                rules={[{ required: true, message: 'Informe o seu usuário!' }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Usuário"
                    style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }}
                />
            </Form.Item>

            <Form.Item
                name="senha"
                rules={[{ required: true, message: 'Informe a sua senha!' }]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Senha"
                    style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }}
                />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        height: "auto",
                        width: "50%",
                        fontSize: "20px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    Entrar
                </Button>
            </Form.Item>

            <hr style={{
                width: "100%",
                borderTop: "1px solid #c4c4c4",
                marginBottom: "10px"
            }} />

            <Form.Item style={{ textAlign: "center" }}>
                <Paragraph style={{ fontSize: "18px" }}>
                    Não tem login? <br />
                    Faça o seu cadastro agora
                </Paragraph>

                <Button
                    type="primary"
                    style={{
                        height: "auto",
                        width: "50%",
                        fontSize: "20px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        padding: "10px"
                    }}
                    onClick={handleClickCadastrarUsuario}
                >
                    Fazer cadastro
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginUsuario;