import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserList,
  newUserList,
  updateUserList,
} from "../../store/watchlist";
import "./Watchlist.css";

const Watchlist = () => {
  const [input, setInput] = useState();
  const listInput = useRef(null);
  const options = useRef([]);
  const dropdown = useRef([]);
  const btn = useRef(null);
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserList(user.id));
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const obj = {
      name: input,
      user_id: user.id,
    };

    dispatch(newUserList(obj)).then(() => dispatch(getUserList(user.id)));
    setInput('')
    listInput.current.classList.add('hidden')
  };

  const cancel = (e) => {
    e.preventDefault();
    listInput.current.classList.add("hidden");
  };

  const show = () => {
    listInput.current.classList.remove("hidden");
  };

  const showDropdown = (i) => {
    if (options.current[i].style.display === "none") {
      dropdown.current[i].classList.remove("hidden");
      options.current[i].style.display = "flex";
      options.current[i].style.textDecoration = "underline";
      options.current[i].style.color = "rgb(255, 80, 0)";
    } else {
      return;
    }
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
        ref.current.forEach((r, i) => {
          if (ref.current[i] && !ref.current[i].contains(e.target)) {
            dropdown.current[i].classList.add("hidden");
            options.current[i].style.textDecoration = "none";
            options.current[i].style.color = "white";
            options.current[i].style.display = "none";
          }
        });
      };

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [ref]);
  };

  RemoveOutside(dropdown);

  const hideList = (listId) => {
    const list = document.getElementById(`list-${listId}`);
    const icon = document.getElementById(`open-${listId}`);

    if (!list.classList.contains("hidden")) {
      list.classList.add("hidden");
      icon.innerText = "▼";
    } else {
      list.classList.remove("hidden");
      icon.innerText = "▲";
    }
  };

  return (
    <div className="watch-main">
      <div className="watch-cryptos">Cryptocurrencies</div>
      <div className="watch-crypto">
        <div className="watch-crypto-card">
          <div className="watch-crypto-card-left">
            <div className="watch-crypto-name">Test Crypto</div>
            <div className="watch-crypto-shares">30 shares</div>
          </div>
          <div className="watch-crypto-card-right">
            <div className="watch-crypto-price">$11.52</div>
            <div className="watch-crypto-percentage">-6.95%</div>
          </div>
        </div>
      </div>
      <div className="watch-list">
        <div className="watch-list-left">Lists</div>
        <div className="watch-list-right" onClick={show}>
          +
        </div>
      </div>
      <form
        className="create-list hidden"
        ref={listInput}
        onSubmit={(e) => submit(e)}
      >
        <input
          className="list-input"
          placeholder="List Name"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          required
        />
        <div className="list-buttons">
          <button onClick={(e) => cancel(e)} className="list-cancel">
            Cancel
          </button>
          <button className="list-submit">Create List</button>
        </div>
      </form>
      <div className="watchlists">
        {watchlists &&
          watchlists?.map((w, i) => (
            <div className="watchlist-card">
              <div className="watchlist-details">
                <div className="watchlist-name">
                  {w.name.slice(0, 16)}
                  {w.name.length > 16 ? "..." : null}
                </div>
                <div className="watchlist-details-right">
                  <div className="watchlist-options-fill">
                    <div
                      className="watchlist-options"
                      ref={(el) => (options.current[i] = el)}
                      onClick={() => showDropdown(i)}
                    >
                      ...
                    </div>
                    <div
                      className="watchlist-dropdown hidden"
                      ref={(el) => (dropdown.current[i] = el)}
                    >
                      <div className="watchlist-text">Test</div>
                    </div>
                  </div>
                  <div
                    className="watchlist-open"
                    onClick={() => hideList(w.id)}
                    id={`open-${w.id}`}
                  >
                    {w?.cryptos?.length > 0 ? "▲" : "▼"}
                  </div>
                </div>
              </div>
              <div className="watchlist-crypto-all" id={`list-${w.id}`}>
                {w?.cryptos?.map((crypto) => (
                  <div className="watchlist-cryptos">
                    <div className="watchlist-crypto-name">{crypto.symbol}</div>
                    <div className="watchlist-crypto-right">
                      <div className="watchlist-crypto-price">
                        ${crypto.price.toLocaleString()}
                      </div>
                      <div className="watchlist-crypto-change">0.25%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Watchlist;
