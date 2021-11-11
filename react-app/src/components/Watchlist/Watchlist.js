import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../../store/watchlist";
import "./Watchlist.css";

const Watchlist = () => {
  const [input, setInput] = useState();
  const listInput = useRef(null);
  const options = useRef(null);
  const dropdown = useRef(null);
  const btn = useRef(null)
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserList(user.id));
  }, []);

  const submit = (e) => {
    e.preventDefault();
  };

  const cancel = (e) => {
    e.preventDefault();
    listInput.current.classList.add("hidden");
  };

  const show = () => {
    listInput.current.classList.remove("hidden");
  };

  const showDropdown = () => {
    if (options.current.style.display === "none") {
      dropdown.current.classList.remove("hidden");
      options.current.style.display = "flex";
      options.current.style.textDecoration = "underline";
      options.current.style.color = "rgb(255, 80, 0)";
    } else {
      return
    }
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log(ref.current.classList)
          dropdown.current.classList.add("hidden");
          options.current.style.textDecoration = "none";
          options.current.style.color = "white";
          options.current.style.display = "none";
        }
      };

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [ref]);
  };

  RemoveOutside(dropdown);

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
          watchlists?.map((w) => (
            <div className="watchlist-card">
              <div className="watchlist-details">
                <div className="watchlist-name">{w.name}</div>
                <div className="watchlist-options-fill">
                  <div
                    className="watchlist-options"
                    ref={options}
                    onClick={showDropdown}
                  >
                    ...
                  </div>
                  <div className="watchlist-dropdown hidden" ref={dropdown}>
                    <div className="watchlist-text">Test</div>
                  </div>
                </div>
                <div className="watchlist-open" onClick={show} ref={btn}>
                  ^
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Watchlist;
