import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

function CadastroUsuario() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

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
            <Form.Item
                name="title">
                <Title style={{ textAlign: "center" }}> Faça o seu Cadastro</Title>
            </Form.Item>
            <Form.Item
                name="nomeUsuario"
                rules={[{ required: true, message: 'Informa o seu nome' }]}>
                <Input placeholder="Informe seu nome" style={{
                    height: "50px",
                    paddingLeft: "20px",
                    backgroundColor: "white",
                    fontSize: "20px"
                }} />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Informa o seu email' }]}
            >
                <Input type="email" placeholder="Informe o seu email" style={{
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
                <Input type="password" placeholder="senha" style={{
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
                    Criar conta
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CadastroUsuario;