import {call, put, all, takeLatest, take} from "redux-saga/effects"

import * as actions from "./actions"
import * as types from "../types"

const requisicao = () => {
    new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(0)
        }, 2000)
    })
}

function* exampleRequest(){
    try{
        yield call(requisicao)
        yield put(actions.registerSucess())
    } catch(e:any){
        console.log(e.response?.data)
    }
}

export default all([
    takeLatest(types.REGISTER_SUCCESS, exampleRequest)
])