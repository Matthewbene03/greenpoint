import { call, put, all, takeLatest, take } from "redux-saga/effects"

// import { get } from "lodash"
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';

import * as actions from "./actions"
import * as types from "../types"
import axios from "../../../config/axios"
import endPoints from "../../../config/endPoints"

interface RegisterPayload {
    nome: String;
    email: String;
    senha: String;
    tipo: String;
}

interface UpdatePayload {
    nome: String | null;
    email: String | null;
    senha: String | null;
    tipo: String | null;
}

interface LoginPayload {
    email: String;
    senha: String;
}




function* loginRequest({ payload }: PayloadAction<LoginPayload>): SagaIterator {
    try {
        const { data } = yield call(axios.post, endPoints.login, payload)
        yield put(actions.loginSuccess({ ...data }));

        axios.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        console.log(e)
        yield put(actions.loginFailure({}));
    }
}

function* registerRequest({ payload }: PayloadAction<RegisterPayload>): SagaIterator {
    try {
        const responseData = yield call(axios.post, endPoints.cadastro, payload)
        console.log("--- Dados do cadastro ---")
        console.log(payload)
        console.log(responseData.data)
        yield put(actions.registerSuccess({ ...responseData.data }));

        const { data } = yield call(axios.post, endPoints.login, { email: payload.email, senha: payload.senha }) //Faz o login apos fazer o cadastro
        console.log("--- Dados do login ---")
        console.log(data)
        yield put(actions.loginSuccess({ ...data }));

        axios.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        yield put(actions.loginFailure({}));
    }
}

// function* updateRequest({ payload }: PayloadAction<UpdatePayload>): SagaIterator {

//     let { id, nome, email, senha, trocouEmail } = payload;
//     senha = senha ? senha : undefined

//     try {
//         const responseData = yield call(axios.put, "/usuario", { id, nome, email, senha })
//         yield put(actions.updateSuccess({ ...responseData.data }));

//         if (trocouEmail) {
//             toast.success("Edição realizada com sucesso!");
//             toast.success("Faça login, você trocou o seu email!");
//             yield put(actions.loginFailure({}));
//         } else {
//             toast.success("Edição realizada com sucesso!");
//         }

//         // // axios.defaults.headers.Authorization = `Bearer ${data.token}`
//     } catch (e: any) {
//         console.log(e)
//         console.log(e.response?.data);
//         toast.error("Usuário ou senha inválidos.");
//     }
// }

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    // takeLatest(types.UPDATE_REQUEST, updateRequest),
])