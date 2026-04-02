import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import * as rotas from "../../config/rotas"

const { Title } = Typography;

function CadastroUsuario() {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const handleClickEdit = () =>{
        navigate(rotas.Home)
    }

    return (
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
                <Title style={{ textAlign: "center" }}>Edite o seus dados</Title>
            </Form.Item>
            <Form.Item
                name="nomeUsuario"
                rules={[{ required: true, message: 'Informa o seu nome' }]}>
                <Input value="usuario69" placeholder="Informe seu nome" style={{
                    height: "50px",
                    paddingLeft: "20px",
                    backgroundColor: "white",
                    fontSize: "20px"
                }} />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Informa o seu email' }]}>
                <Input value="usuario69@gmail.com" type="email" placeholder="Informe o seu email para usuario" style={{
                    height: "50px",
                    paddingLeft: "20px",
                    backgroundColor: "white",
                    fontSize: "20px"
                }} />
            </Form.Item>
            <Form.Item
                name="senha"
                rules={[{ required: true, message: 'Informa a sua senha' }]}
            >
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
                <Button onClick={handleClickEdit} block type="primary" htmlType="submit" style={{
                    height: "50px",
                    width: "50%",
                    paddingLeft: "20px",
                    fontSize: "20px",
                }} >
                    Editar conta
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CadastroUsuario;