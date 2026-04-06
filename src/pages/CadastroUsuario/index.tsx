import { Button, Form, Input, notification, Typography } from "antd";
import isEmail from "validator/lib/isEmail";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../store/modules/rootReducer';

import * as tipoUsuario from "../../config/TiposUsuarios";
import * as actions from "../../store/modules/authorization/actions"
import { useEffect, useRef, useState } from "react"; 
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
type NotificationType = 'success' | 'info' | 'warning' | 'error';

function CadastroUsuario() {

    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state: RootState) => state.authorization)

    
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [foto, setFoto] = useState<string | null>(null);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", {
                state: {
                    showSuccess: true,
                    from: location.pathname
                }
            });
        }
    }, [isLoggedIn])

    const openNotificationWithIcon = (type: NotificationType, title: String, msg: String,) => {
        api[type]({
            title: title,
            description: msg,
        });
    };

    const onFinish = async (values: any) => {
        let formErros = false;

        if (!isEmail(values.email)) {
            openNotificationWithIcon('error', "Email invalido!", "Informe outro email que seja valido!")
            formErros = true;
        }

        

        if (formErros) return;

        dispatch(actions.registerRequest({
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            tipo: tipoUsuario.Usuario
        }));
    };

    
    const ativarCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    const pararCamera = () => {
    const video = videoRef.current;

    if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
};
    
    const tirarFoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");
        setFoto(imagem);
    };

    return (

        <>
            {contextHolder}

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

                <Form.Item>
                    <Title style={{ textAlign: "center" }}> Faça o seu Cadastro</Title>
                </Form.Item>

                <Form.Item
                    name="nome"
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

                
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{
                            width: "100%",
                            maxWidth: "400px",
                            backgroundColor: "#000",
                            borderRadius: "10px"
                        }}
                    />
                </div>

                
                <canvas ref={canvasRef} style={{ display: "none" }} />

                
                {foto && (
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <img
                            src={foto}
                            alt="Foto"
                            style={{
                                width: "100%",
                                maxWidth: "400px",
                                borderRadius: "10px"
                            }}
                        />
                    </div>
                )}

                
                <Form.Item style={{ textAlign: "center" }}>
                    <Button danger onClick={pararCamera} style={{ marginLeft: 10 }}>
                         Parar Câmera
                    </Button>
                    
                    <Button onClick={ativarCamera} style={{ marginRight: 10 }}>
                        Ativar Câmera
                    </Button>

                    <Button onClick={tirarFoto}>
                        Tirar Foto
                    </Button>
                </Form.Item>

                <Form.Item style={{
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
        </>
    )
}

export default CadastroUsuario;