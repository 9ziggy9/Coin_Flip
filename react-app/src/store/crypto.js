const GET_CRYPTO = "crypto/GET_CRYPTO";

const getCrypto = (crypto) => ({
  type: GET_CRYPTO,
  crypto,
});

export const findAllCrypto = () => async (dispatch) => {
  const res = await fetch("/api/cryptocurrencies");
  if (res.ok) {
    const data = await res.json();
    dispatch(getCrypto(data));
  }
};

const initialState = { crypto: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CRYPTO:
      return { ...state, crypto: action.crypto.cryptocurrency };
    default:
      return state;
  }
}
