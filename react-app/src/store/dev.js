const POST_TRANSACTION = 'dev/POST_TRANSACTION';

const postTransaction = (transaction) => ({
  type: POST_TRANSACTION,
  payload: transaction
});

export const purchase = (amount,price) => async (dispatch) => {
  const response = await fetch('/api/transactions/dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount,
      price
    })
  });

    const data = await response.json();
    dispatch(postTransaction(data))
    return null;
}

const initialState = { transaction: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case POST_TRANSACTION:

      return { ...state, transaction: action.transaction };
    default:
      return state;
  }
}
