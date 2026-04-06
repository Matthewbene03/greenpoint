import { call, put, all, takeLatest } from "redux-saga/effects"

// import { get } from "lodash"
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';

import * as actions from "./actions"
import * as types from "../types"
import axiosService from "../../../config/axios"
import endPoints from "../../../config/endPoints"

interface RegisterPayload {
    nome: String;
    email: String;
    senha: String;
    tipo: String;
}

interface UpdatePayload {
    id: number | null;
    nome: String | null;
    email: String | null;
    senha: String | null | undefined;
    trocouEmail: boolean | null;
}

interface LoginPayload {
    email: String;
    senha: String;
}

function* loginRequest({ payload }: PayloadAction<LoginPayload>): SagaIterator {
    try {
        const { data } = yield call(axiosService.post, endPoints.login, payload)
        yield put(actions.loginSuccess({ ...data }));

        axiosService.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        console.log(e)
        yield put(actions.loginFailure({}));
    }
}

function* registerRequest({ payload }: PayloadAction<RegisterPayload>): SagaIterator {
    try {
        const responseData = yield call(axiosService.post, endPoints.cadastro, payload)
        yield put(actions.registerSuccess({ ...responseData.data }));

        const { data } = yield call(axiosService.post, endPoints.login, { email: payload.email, senha: payload.senha }) //Faz o login apos fazer o cadastro
        yield put(actions.loginSuccess({ ...data }));

        axiosService.defaults.headers.Authorization = `Bearer ${data.token}`
    } catch (e) {
        yield put(actions.loginFailure({}));
    }
}

function* updateRequest({ payload }: PayloadAction<UpdatePayload>): SagaIterator {

    let { id, nome, email, senha, trocouEmail } = payload;
    senha = senha || undefined;

    try {
        const responseData = yield call(axiosService.put, endPoints.editarUsuario, { id, nome, email, senha })
        yield put(actions.updateSuccess({ 
            user: {...responseData.data.user},
            update: responseData.data.updated
        }));

        if (trocouEmail) {
            yield put(actions.loginFailure({}));
        }
    } catch (e: any) {
        console.log(e)
        console.log(e.response?.data);
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    takeLatest(types.UPDATE_REQUEST, updateRequest),
])