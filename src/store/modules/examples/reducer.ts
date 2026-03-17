const initialState = {
    exemplo: "valor inicial"
};

export const reducerExample = (state = initialState, action) => {
    console.log(state);
    console.log(action);

    return state
}