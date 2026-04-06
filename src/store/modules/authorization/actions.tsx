//Nesse arquivo serve para criar funções que vão retornar o tipo de cada ação a ser escutada pelo reducer.
// Ex: Para um clique de um botão

import * as types from "../types"

export function loginSuccess(payload: object){
    return {
        type: types.LOGIN_SUCCESS,
        payload
    }
}

export function loginRequest(payload: object){
    return {
        type: types.LOGIN_REQUEST,
        payload
    }
}

export function loginFailure(payload: object){
    return {
        type: types.LOGIN_FAILURE,
        payload
    }
}

export function registerSuccess(payload: object){
    return {
        type: types.REGISTER_SUCCESS,
        payload
    }
}

export function registerRequest(payload: object){
    return {
        type: types.REGISTER_REQUEST,
        payload
    }
}

export function registerFailure(payload: object){
    return {
        type: types.REGISTER_FAILURE,
        payload
    }
}

export function updateSuccess(payload: object){
    return {
        type: types.UPDATE_SUCCESS,
        payload
    }
}

export function updateRequest(payload: object){
    return {
        type: types.UPDATE_REQUEST,
        payload
    }
}

export function updateFailure(payload: object){
    return {
        type: types.UPDATE_FAILURE,
        payload
    }
}
