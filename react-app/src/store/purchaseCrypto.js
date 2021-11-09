const LOAD = "cryptocurrency/LOAD_ALL_CRYPTOCURRENCY"
const LOAD_ONE = "cryptocurrency/LOAD_ONE"

const load = getAllCryptocurrency => ({
    type: LOAD,
    getAllCryptocurrency
});

const load_one = loadOneCryptocurrency => ({
    type: LOAD_ONE,
    loadOneCryptocurrency
})


//thunk time
export const loadAllCrpytocurrencies = (id) => async dispatch => {
    const response = await fetch("/api/cryptocurrency");

    if (response.ok) {
        const cryptocurrency = await response.json();
        dispatch(load(cryptocurrency));
        return cryptocurrency
    }
}

export const getOneCryptocurrency = (id) => async dispatch => {
    const response = await fetch(`/api/cryptocurrency/${id}`);

    if (response.ok) {
        const cryptocurrencyDetail = await response.json();
        dispatch(load_one(cryptocurrencyDetail))
        return cryptocurrencyDetail;
    }
}


//reducer time
const initialState = {};

const cryptocurrencyReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD: {
            newState = Object.assign({}, state)
            newState.getAllCryptocurrency = action.getAllCryptocurrency
            return newState
        }

        case LOAD_ONE: {
            return {
                ...state,
                getOneCryptocurrency: action.getOneCryptocurrency
            }
        }
        default:
            return state;
    }
}

export default cryptocurrencyReducer;
