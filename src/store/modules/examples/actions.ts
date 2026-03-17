//Nesse arquivo serve para criar funções que vão retornar o tipo de cada ação a ser escutada pelo reducer.
// Ex: Para um clique de um botão

import * as types from "../types"

export function clicaBotao(){
    return {
        type: types.CLICA_BOTAO
    }
}