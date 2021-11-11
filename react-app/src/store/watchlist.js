const GET_USER_WATCHLIST = "watchlist/GET_USER_WATCHLIST";

const getUserWatchlist = (watchlist) => ({
  type: GET_USER_WATCHLIST,
  watchlist,
});

export const getUserList = (userId) => async (dispatch) => {
  const res = await fetch(`/api/watchlist/user/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getUserWatchlist(data));
  }
};

const initialState = { watchlist: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_WATCHLIST:
      return { ...state, watchlist: action.watchlist.watchlists };
    default:
      return state;
  }
}
