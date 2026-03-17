import {call, put, all, takeLatest, take} from "redux-saga/effects"

import * as actions from "./actions"
import * as types from "../types"

const requisicao = () => {
    new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve()
        }, 2000)
    })
}

function* exampleRequest(){
    try{
        yield call(requisicao)
        yield put(actions.clicaBotao())
    } catch(e){

    }
}

export default all([
    takeLatest(types.CLICA_BOTAO, exampleRequest)
])