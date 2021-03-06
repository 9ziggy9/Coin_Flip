import portfolioReducer from "./portfolio"

// Type
const GET_USER_TRANSACTIONS = './transactions/getUserTransactions'

const NEW_TRANSACTION = './transactions/newTransaction'

// Action
const currentUserTransactions = (userTransactions) => {
    return {
        type: GET_USER_TRANSACTIONS,
        userTransactions
    }
}

const addTransaction = (userTransactions) => {
    return {
        type: NEW_TRANSACTION,
        userTransactions
    }
}

// Thunk
export const getUserTransactions = (userId) => async (dispatch) => {
    const res = await fetch(`/api/transactions/${userId}`);
    const userTransactionsData = await res.json();
    dispatch(currentUserTransactions(userTransactionsData.transactions));
}

export const createTransaction = (newTransaction) => async (dispatch) => {
    const { cryptoId, userId, type, price, quantity } = newTransaction;
    const res = await fetch(`/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cryptoId,
            userId,
            type,
            price,
            quantity,
        })
    });
    const userTransactionsData = await res.json();
    dispatch(addTransaction(userTransactionsData));
}

// Reducer
const transactionReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_USER_TRANSACTIONS || NEW_TRANSACTION:
            newState = {...state}
            action.userTransactions.forEach(transaction => {
                newState[transaction.id] = transaction
            });
            return newState;
        default:
            return state;
    }
}

export default transactionReducer;
