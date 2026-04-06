import * as types from "../types"
import type { AnyAction } from 'redux';

interface User {
    id: Number;
    nome: string;
    email: string;
    tipo: String;
}

interface AuthInitialState {
    isLoggedIn: boolean;
    token: String;
    user: User;
    update: boolean;
}

const initialState: AuthInitialState = {
    isLoggedIn: false,
    token: "",
    user: {
        id: 0,
        nome: "",
        email: "",
        tipo: "",
    },
    update: false,
};

export const reducerAuthrization = (state = initialState, action: AnyAction): AuthInitialState => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            const newState = { ...state };
            newState.isLoggedIn = true; //Está logado
            newState.token = action.payload.token;
            newState.user = action.payload.user;
            return newState
        }
        case types.LOGIN_REQUEST: {
            const newState = { ...initialState };
            return newState;
        }
        case types.LOGIN_FAILURE: {
            const newState = { ...initialState };
            return newState;
        }
        case types.REGISTER_SUCCESS: { //Fez o cadastro com sucesso
            const newState = { ...state };
            return newState
        }
        case types.REGISTER_REQUEST: {
            const newState = { ...initialState };
            return newState;
        }
        case types.REGISTER_FAILURE: {
            const newState = { ...initialState };
            return newState;
        }
        case types.UPDATE_SUCCESS: {
            const newState = { ...state };
            newState.user.nome = action.payload.user.nome;
            newState.user.email = action.payload.user.email;
            newState.update = action.payload.update
            return newState
        }
        case types.UPDATE_FAILURE: {
            const newState = { ...initialState };
            return newState;
        }
        case types.RESET_UPDATE: {
            const newState = { ...state }
            newState.update = false;
            return newState;
        }

        default: {
            return state
        }
    }
}