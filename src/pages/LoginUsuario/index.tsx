import React from "react";
import { Button, Checkbox, Flex, Form, Input, InputNumber, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import * as rotas from "../../config/rotas";

const { Title, Paragraph } = Typography;

function LoginUsuario() {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const handleClickCadastrarUsuario = (e: any) =>{
        e.preventDefault();
        navigate(rotas.CadastrarUsuario, {
            state: {
                from: location.pathname
            }
        })
        console.log("handleClickCadastrarUsuario");
    }

    return (
        <>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{
                    width: "50%",
                    border: "1.5px solid #c4c4c4",
                    borderRadius: "10px",
                    padding: "20px",
                    backgroundColor: "#f8f8f8"
                }}
                onFinish={onFinish}>
                <Form.Item
                    name="title">
                    <Title style={{ textAlign: "center" }}> Faça o seu Login</Title>
                </Form.Item>
                <Form.Item
                    name="usuario"
                    rules={[{ required: true, message: 'Informa o seu usuario!'}]}>
                    <Input prefix={<UserOutlined />} placeholder="Usuario" style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }} />
                </Form.Item>
                <Form.Item
                    name="senha"
                    rules={[{ required: true, message: 'Informa a sua senha!'}]}
                    >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Senha" style={{
                        height: "50px",
                        paddingLeft: "20px",
                        backgroundColor: "white",
                        fontSize: "20px"
                    }} />
                </Form.Item>
                {/* <Form.Item>
                <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
                </Flex>
                </Form.Item> */}

                <Form.Item name="btnEntrar" style={{
                    textAlign: "center"
                }}>
                    <Button block type="primary" htmlType="submit" style={{
                        height: "50px",
                        width: "50%",
                        paddingLeft: "20px",
                        fontSize: "20px",
                    }} >
                        Entrar
                    </Button>
                </Form.Item>
                <hr style={{
                    width: "100%",
                    height: "1px",
                    border: "0px",
                    borderTop: "1px solid #c4c4c4",
                    backgroundColor: "#dddddd",
                    marginBottom: "10px"
                }} />
                <Form.Item style={{
                    textAlign: "center"
                }}>
                    <Paragraph style={{
                        fontSize: "18px",
                    }}>
                        Não tem login? <br />
                        Faça o seu cadastro agora
                    </Paragraph>
                    <Button block type="primary" htmlType="submit" style={{
                        height: "50px",
                        width: "50%",
                        paddingLeft: "20px",
                        fontSize: "20px",
                    }}
                    onClick={handleClickCadastrarUsuario}> Fazer cadastro</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default LoginUsuario;