const GET_CRYPTO = "crypto/GET_CRYPTO";
const SEARCH_CRYPTO = "crypto/SEARCH_CRYPTO"

const getCrypto = (crypto) => ({
  type: GET_CRYPTO,
  crypto,
});

const searchCrypto = (crypto) => ({
  type: SEARCH_CRYPTO,
  crypto,
})

export const getAllCrypto = () => async (dispatch) => {
  const res = await fetch("/api/cryptocurrencies");
  if (res.ok) {
    const data = await res.json();
    dispatch(getCrypto(data));
  }
};

export const findCrypto = (results) => async (dispatch) => {
  const res = await fetch("/api/cryptocurrencies/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({results})
  })
    if(res.ok) {
      const data = await res.json()
      dispatch(searchCrypto(data))
    }
}

const initialState = { crypto: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CRYPTO:
      return { ...state, crypto: action.crypto.cryptocurrency };
    case SEARCH_CRYPTO:
      return {...state, searchRes: action.crypto.search}
    default:
      return state;
  }
}
