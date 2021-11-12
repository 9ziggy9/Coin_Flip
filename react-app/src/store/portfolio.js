// Type definitions
const GET_PORTFOLIOS = '/portfolios/getPortfolios'

const NEW_PORTFOLIO = '/portfolios/newPortfolio'

const UPDATE_PORTFOLIO = '/portfolios/updatePortfolio'

const UPDATE_SINGLE_CRYTPO = "/portfolios/UPDATE_SINGLE_CRYPTO"

// Action
const getPortfolios = (portfolios) => {
    return {
        type: GET_PORTFOLIOS,
        portfolios
    }
}

const addPortfolio = (portfolios) => {
    return {
        type: NEW_PORTFOLIO,
        portfolios
    }
}

const updatePortfolio = (portfolios) => {
    return {
        type: UPDATE_PORTFOLIO,
        portfolios
    }
}

const updateCrypto = (portfolios) => {
    return {
        type: UPDATE_SINGLE_CRYTPO,
        portfolios
    }
}

// Thunk functions
export const userPortfolios = (userId) => async (dispatch) => {
    const res = await fetch(`/api/portfolios/${userId}`);
    const portfoliosData = await res.json();
    // console.log(portfoliosData.portfolio);
    dispatch(getPortfolios(portfoliosData.portfolio));
}



export const newPortfolio = (newPorfolioObj) => async (dispatch) => {
    const { userId, cryptoId, quantity, purchasePrice } = newPorfolioObj;
    const res = await fetch(`/api/portfolios/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            cryptoId,
            quantity,
            purchasePrice
        })
    });
    const portfolios = await res.json();
    dispatch(addPortfolio(portfolios));
    console.log("POST", portfolios)
}

export const changePortfolio = (updatedPortfolioObj) => async (dispatch) => {
    const { userId, cryptoId, quantity, purchasePrice } = updatedPortfolioObj
    const res = await fetch(`/api/portfolios/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            cryptoId,
            quantity,
            purchasePrice
        })
    })
    const portfolios = await res.json();
    dispatch(updatePortfolio(portfolios));
    console.log("PUT", updatedPortfolioObj)
}

// export const updateSingleCrypto = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/portfolios/${userId}`, {
//         method: "PATCH",
//         body: JSON.stringify(userId)
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(updateCrypto(data))
//         return data;
//     }
// }

// Reducer function
const portfolioReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_PORTFOLIOS || NEW_PORTFOLIO || UPDATE_PORTFOLIO || UPDATE_SINGLE_CRYTPO:
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
