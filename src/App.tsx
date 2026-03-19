import './App.css'

import { useEffect, useState } from "react";
import axiosService from './config/axios';
import * as TiposUsuarios from "./config/TiposUsuarios";

function App() {
  return (
    <CadastroUsuario />
  )
};

function CadastroUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    getUsuarios();
  }, []);

  useEffect(() => {
    console.log("Usuarios atualizados:", usuarios);
  }, [usuarios]);

  async function getUsuarios() {
    try {
      const { data } = await axiosService.get("/usuario",
        { headers: { apikey: "sb_publishable_1qBhd5-zK_m0WsXjk5TQog_L7l2oDo-" } });
      setUsuarios(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await axiosService.post("/usuario", { nome, email, senha, tipo: TiposUsuarios.Usuario },
        { headers: { apikey: "sb_publishable_1qBhd5-zK_m0WsXjk5TQog_L7l2oDo-" } });
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error: any) {
      console.log(error.response?.data)
    }
  }

  return (
    <>
      <h1>Cadastro de usuarios</h1>
      <form action="POST" id='formUsuario' onSubmit={handleSubmit}>
        <label>
          Nome: <br />
          <input type="text" value={nome} onChange={(e: any) => setNome(e.target.value)} />
        </label>
        <label>
          Email: <br />
          <input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha: <br />
          <input type="password" value={senha} onChange={(e: any) => setSenha(e.target.value)} />
        </label>
        <button type='submit'>Enviar</button>
      </form>

      <hr />
      {usuarios.map((usuario: any, index:any) => (
        <div key={index} id='card'>
          <h2>Nome: {usuario.nome}</h2>
          <p>Email: {usuario.email}</p>
          <p>TipoUsuario: {usuario.tipo}</p>
        </div>
      ))}
    </>
  );
}
export default App
