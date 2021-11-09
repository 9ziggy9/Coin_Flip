// Type definitions
const GET_PORTFOLIOS = '/portfolios/getPortfolios'

// Action
const getPortfolios = (portfolios) => {
    return {
        type: GET_PORTFOLIOS,
        portfolios
    }
}

// Thunk functions
export const userPortfolios = (id) => async (dispatch) => {
    const res = await fetch(`/api/portfolios/${id}`);
    const portfoliosData = await res.json();
    console.log(portfoliosData);
    // dispatch(getPortfolios(portfoliosData));
}

// Reducer function
const portfolioReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_PORTFOLIOS:
            newState = {...state}
            action.portfolios.forEach(portfolio => {
                newState[portfolio.id] = portfolio
            })
            return newState;
        default:
            return state;
    }
}

export default portfolioReducer;
