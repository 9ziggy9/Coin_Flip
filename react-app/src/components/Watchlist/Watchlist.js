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
  const [imgUrl, setImgUrl] = useState(
    "https://img.icons8.com/material-outlined/24/ffffff/settings--v1.png"
  );
  const listInput = useRef(null);
  const options = useRef([]);
  const dropdown = useRef([]);
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserList(user.id));
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    const obj = {
      name: input,
      user_id: user.id,
    };

    dispatch(newUserList(obj)).then(() => dispatch(getUserList(user.id)));
    setInput("");
    listInput.current.classList.add("hidden");
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
          onKeyPress={(e) => e.key === "Enter" && submit(e)}
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
                      <div className="watchlist-text">
                        <img className="list-settings-img"
                          onMouseEnter={() =>
                            setImgUrl(
                              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmNTAwMCI+PHBhdGggZD0iTTY5LjI3MzExLDE0LjMzMzMzbC0zLjUxMzM1LDE4LjA4NDY0Yy01LjkwNjUzLDIuMjI3NTIgLTExLjMzMDQ2LDUuMzQ5ODcgLTE2LjA4MzAxLDkuMjUyMjhsLTE3LjM3MDc3LC01Ljk5MDg5bC0xNi43NDA4OSwyOC45NzQ2MWwxMy45MTM0MSwxMi4wOTM3NWMtMC41MzQ4NywzLjI4Mzk1IC0wLjgxMTg1LDYuMzI3MTcgLTAuODExODUsOS4yNTIyOGMwLDIuOTI5NSAwLjI4NTI4LDUuOTY3MTUgMC44MTE4NSw5LjI1MjI4djAuMDE0bC0xMy45MTM0MSwxMi4wOTM3NWwxNi43NDA4OSwyOC45NjA2MWwxNy4zNTY3NywtNS45NzY4OWM0Ljc1Mjk5LDMuOTA0NTQgMTAuMTg5MTksNy4wMDk0OCAxNi4wOTcsOS4yMzgyOGwzLjUxMzM1LDE4LjA4NDY0aDMzLjQ1Mzc3bDMuNTEzMzUsLTE4LjA4NDY0YzUuOTEwMzksLTIuMjI4OTcgMTEuMzI4MjQsLTUuMzQ2MjggMTYuMDgzLC05LjI1MjI3bDE3LjM3MDc3LDUuOTkwODhsMTYuNzI2ODksLTI4Ljk2MDYxbC0xMy44OTk0MSwtMTIuMTA3NzVjMC41MzQ4NiwtMy4yODM5NSAwLjgxMTg1LC02LjMyNzE3IDAuODExODUsLTkuMjUyMjhjMCwtMi45MjA3MiAtMC4yNzg1NywtNS45NTk5OSAtMC44MTE4NSwtOS4yMzgyOHYtMC4wMTRsMTMuOTEzNDEsLTEyLjEwNzc1bC0xNi43NDA4OCwtMjguOTYwNjFsLTE3LjM1Njc4LDUuOTc2ODljLTQuNzUyOTgsLTMuOTA0NTMgLTEwLjE4OTE5LC03LjAwOTQ4IC0xNi4wOTcsLTkuMjM4MjhsLTMuNTEzMzUsLTE4LjA4NDY0ek04MS4wODY5MSwyOC42NjY2N2g5LjgyNjE3bDIuNzg1NDgsMTQuMzMzMzNsNy40NzQ2MSwyLjgyNzQ3YzQuNTA1NDMsMS42OTgwNiA4LjU1MzMsNC4wMjkyNyAxMi4wNjU3NSw2LjkxNDcxbDYuMTg2ODUsNS4wNjcwNmwxMy43NzM0NCwtNC43MzExMmw0LjkxMzA4LDguNDk2NDJsLTExLjAwMTk1LDkuNTc0MjJsMS4yNTk3Niw3Ljg4MDU0djAuMDE0YzAuNDM4MjMsMi42ODcwNiAwLjYyOTg5LDQuOTQxMjEgMC42Mjk4OSw2Ljk1NjdjMCwyLjAxNTUgLTAuMTkxNjQsNC4yNjkzMSAtMC42Mjk4OSw2Ljk1NjdsLTEuMjczNzYsNy44ODA1M2wxMS4wMDE5NSw5LjU3NDIybC00LjkxMzA5LDguNTEwNDJsLTEzLjc1OTQ0LC00Ljc0NTExbC02LjIwMDg0LDUuMDgxMDVjLTMuNTEyNDUsMi44ODU0NCAtNy41NDYzMyw1LjIxNjY1IC0xMi4wNTE3NSw2LjkxNDcyaC0wLjAxNGwtNy40NzQ2LDIuODI3NDdsLTIuNzg1NDgsMTQuMzMzMzNoLTkuODEyMThsLTIuNzg1NDgsLTE0LjMzMzMzbC03LjQ3NDYxLC0yLjgyNzQ3Yy00LjUwNTQ0LC0xLjY5ODA2IC04LjU1MzMsLTQuMDI5MjcgLTEyLjA2NTc1LC02LjkxNDcybC02LjE4Njg1LC01LjA2NzA2bC0xMy43NzM0NCw0LjczMTEybC00LjkxMzA5LC04LjQ5NjQybDExLjAxNTk1LC05LjU4ODIybC0xLjI3Mzc2LC03Ljg1MjU0di0wLjAxNGMtMC40MzE5NSwtMi42OTg3NCAtMC42Mjk4OCwtNC45NTkyMSAtMC42Mjk4OCwtNi45NzA3YzAsLTIuMDE1NSAwLjE5MTY1LC00LjI2OTMxIDAuNjI5ODgsLTYuOTU2N2wxLjI3Mzc2LC03Ljg4MDUzbC0xMS4wMTU5NSwtOS41NzQyMmw0LjkxMzA5LC04LjUxMDQybDEzLjc3MzQ0LDQuNzQ1MTJsNi4xODY4NSwtNS4wODEwNWMzLjUxMjQ1LC0yLjg4NTQ1IDcuNTYwMzIsLTUuMjE2NjUgMTIuMDY1NzUsLTYuOTE0NzFsNy40NzQ2MSwtMi44Mjc0N3pNODYsNTcuMzMzMzNjLTE1Ljc0MTc1LDAgLTI4LjY2NjY3LDEyLjkyNDkyIC0yOC42NjY2NywyOC42NjY2N2MwLDE1Ljc0MTc1IDEyLjkyNDkyLDI4LjY2NjY3IDI4LjY2NjY3LDI4LjY2NjY3YzE1Ljc0MTc1LDAgMjguNjY2NjcsLTEyLjkyNDkyIDI4LjY2NjY3LC0yOC42NjY2N2MwLC0xNS43NDE3NSAtMTIuOTI0OTIsLTI4LjY2NjY3IC0yOC42NjY2NywtMjguNjY2Njd6TTg2LDcxLjY2NjY3YzcuOTY1NTksMCAxNC4zMzMzMyw2LjM2Nzc1IDE0LjMzMzMzLDE0LjMzMzMzYzAsNy45NjU1OSAtNi4zNjc3NSwxNC4zMzMzMyAtMTQuMzMzMzMsMTQuMzMzMzNjLTcuOTY1NTksMCAtMTQuMzMzMzMsLTYuMzY3NzUgLTE0LjMzMzMzLC0xNC4zMzMzM2MwLC03Ljk2NTU5IDYuMzY3NzUsLTE0LjMzMzMzIDE0LjMzMzMzLC0xNC4zMzMzM3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                            )
                          }
                          onMouseLeave={() => setImgUrl("https://img.icons8.com/material-outlined/24/ffffff/settings--v1.png")}
                          src={imgUrl}
                        />{" "}
                        Edit
                      </div>
                      <div className="watchlist-text">
                            Test

                      </div>
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
                        $
                        {crypto.price > 1
                          ? crypto.price.toLocaleString()
                          : crypto.price.toFixed(2)}
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
