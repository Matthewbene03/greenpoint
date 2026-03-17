import { call, put, all, takeLatest, take } from "redux-saga/effects"
import { toast } from "react-toastify"
import { get } from "lodash"

import * as actions from "./actions"
import * as actionsCarrinho from "../carrinhoCompras/actions"
import * as types from "../types"
import axios from "../../../config/axios"

function* loginRequest({ payload }) {
    try {
        const { data } = yield call(axios.post, "/token", payload)
        yield put(actions.loginSuccess({ ...data }));

        toast.success("Você fez login!");

        axios.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        console.log(e)
        toast.error("Usuário ou senha inválidos.");
        yield put(actions.loginFailure());
        yield put(actionsCarrinho.addCarrinhoFailure());
    }
}

function persistREHYDRATE({ payload }) {
    const token = get(payload, "authorization.token", "");
    if (!token) return
    axios.defaults.headers.Authorization = `Bearer ${token}`
}

function* registerRequest({ payload }) {
    try {
        const responseData = yield call(axios.post, "/usuario/cliente", payload)
        console.log("--- Dados do cadastro ---")
        console.log(payload)
        console.log(responseData.data)
        yield put(actions.registerSuccess({ ...responseData.data }));

        const { data } = yield call(axios.post, "/token", { email: payload.email, senha: payload.senha }) //Faz o login apos fazer o cadastro
        console.log("--- Dados do login ---")
        console.log(data)
        yield put(actions.loginSuccess({ ...data }));

        toast.success("Cadastro realizado com sucesso!");

        axios.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        toast.error("Usuário ou senha inválidos.");
        yield put(actions.loginFailure());
    }
}

function* updateRequest({ payload }) {

    let { id, nome, email, senha, trocouEmail } = payload;
    senha = senha ? senha : undefined

    try {
        const responseData = yield call(axios.put, "/usuario", { id, nome, email, senha })
        yield put(actions.updateSuccess({ ...responseData.data }));

        if (trocouEmail) {
            toast.success("Edição realizada com sucesso!");
            toast.success("Faça login, você trocou o seu email!");
            yield put(actions.loginFailure());
        } else {
            toast.success("Edição realizada com sucesso!");
        }

        // // axios.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        console.log(e)
        console.log(e.response?.data);
        toast.error("Usuário ou senha inválidos.");
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistREHYDRATE),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    takeLatest(types.UPDATE_REQUEST, updateRequest),
])