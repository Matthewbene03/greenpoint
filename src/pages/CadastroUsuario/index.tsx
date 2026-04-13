import { Button, Form, Input, notification, Typography, Avatar } from "antd";
import { PlusOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import isEmail from "validator/lib/isEmail";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

const { Title } = Typography;
type NotificationType = 'success' | 'info' | 'warning' | 'error';

function CadastroUsuario() {

    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [foto, setFoto] = useState<string | null>(null);
    const [mostrarCamera, setMostrarCamera] = useState(false);

    const openNotificationWithIcon = (type: NotificationType, title: String, msg: String,) => {
        api[type]({
            message: title,
            description: msg,
        });
    };

    const base64ToFile = (base64: string, filename: string) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    const onFinish = async (values: any) => {
        if (!isEmail(values.email)) {
            openNotificationWithIcon('error', "Email invalido!", "Informe um email válido")
            return;
        }

        let fotoUrl = null;

        if (foto) {
            const file = base64ToFile(foto, `user_${Date.now()}.jpg`);

            const { data, error } = await supabase.storage
                .from('usuarios')
                .upload(`perfil/${file.name}`, file);

            if (error) {
                console.log(error);
                openNotificationWithIcon('error', "Erro", error.message);
                return;
            }

            const { data: publicUrl } = supabase.storage
                .from('usuarios')
                .getPublicUrl(data.path);

            fotoUrl = publicUrl.publicUrl;
        }

        const response = await fetch("https://yyrnbsehaftutioojylw.supabase.co/functions/v1/cadastro-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: values.nome,
                email: values.email,
                senha: values.senha,
                tipo: "USUARIO",
                foto: fotoUrl
            })
        });

        const data = await response.json();

        if (!response.ok) {
            openNotificationWithIcon('error', "Erro", data.error);
            return;
        }

        openNotificationWithIcon('success', "Sucesso", "Usuário cadastrado!");
        navigate("/");
    };

    const ativarCamera = async () => {
        try {
            setMostrarCamera(true);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch {
            openNotificationWithIcon('error', "Erro", "Não foi possível acessar a câmera");
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

        context.drawImage(video, 0, 0);

        const imagem = canvas.toDataURL("image/jpeg", 0.7);
        setFoto(imagem);

        pararCamera();
        setMostrarCamera(false);
    };

    const removerFoto = () => {
        setFoto(null);
    };

    return (
        <>
            {contextHolder}

            <Form onFinish={onFinish} style={{ maxWidth: 500, margin: "auto" }}>

                <Title>Cadastro</Title>

                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ position: "relative", display: "inline-block" }}>

                        <Avatar
                            size={120}
                            src={foto || undefined}
                            icon={!foto ? <UserOutlined /> : undefined}
                        />

                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={ativarCamera}
                            style={{ position: "absolute", bottom: 0, right: 0 }}
                        />

                        {foto && (
                            <Button
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                onClick={removerFoto}
                                style={{ position: "absolute", top: 0, right: 0 }}
                            />
                        )}
                    </div>
                </div>

                {mostrarCamera && (
                    <div style={{ textAlign: "center" }}>
                        <video ref={videoRef} autoPlay style={{ width: 250 }} />

                        <div>
                            <Button onClick={tirarFoto}>Tirar Foto</Button>
                            <Button danger onClick={() => {
                                pararCamera();
                                setMostrarCamera(false);
                            }}>Cancelar</Button>
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} style={{ display: "none" }} />

                <Form.Item name="nome" rules={[{ required: true }]}>
                    <Input placeholder="Nome" />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true }]}>
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item name="senha" rules={[{ required: true }]}>
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Button htmlType="submit" type="primary" block>
                    Cadastrar
                </Button>

            </Form>
        </>
    )
}

export default CadastroUsuario;