import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Modal } from "../../context/Modal";
import { userPortfolios } from "../../store/portfolio";
import {
  deleteUserList,
  editUserList,
  getUserList,
  newUserList,
} from "../../store/watchlist";
import EditListModal from "./EditListModal";
import "./Watchlist.css";
import { useListModal } from "../../context/ListModal";

const Watchlist = () => {
  const history = useHistory();
  const { shown, setShown } = useListModal();
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(0);
  const [input, setInput] = useState();
  const [editInput, setEditInput] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://img.icons8.com/material-outlined/24/ffffff/settings--v1.png"
  );
  const [delUrl, setDelUrl] = useState(
    "https://img.icons8.com/carbon-copy/100/ffffff/delete-sign.png"
  );
  const listInput = useRef(null);
  const options = useRef([]);
  const dropdown = useRef([]);
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);
  const portfolio = useSelector((state) => state.portfolio.portfolio);
  const crypto = useSelector((state) => state.crypto.list);

  const getData = async () => {
    await fetch("/api/cryptocurrencies/prices");
  };

  useEffect(() => {
    getData();
    dispatch(getUserList(user?.id));
    dispatch(userPortfolios(user?.id));
  }, [dispatch]);

  useEffect(() => {
    document.querySelectorAll(".watchlist-options").forEach((i) => {
      i.style.display = "none";
      i.style.textDecoration = "none";
      i.style.color = "white";
    });
  }, [num]);

  useEffect(() => {
    if (portfolio?.length > 0) {
      document.querySelector(".watch-cryptos").classList.remove("hidden");
    }
  }, [portfolio]);

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
    setInput("");
    listInput.current.classList.add("hidden");
  };

  const show = () => {
    listInput.current.classList.remove("hidden");
  };

  const showDropdown = (i) => {
    if (options.current[i].style.display === "none" && open === 0) {
      dropdown.current[i].classList.remove("hidden");
      options.current[i].style.display = "flex";
      options.current[i].style.textDecoration = "underline";
      options.current[i].style.color = "rgb(255, 80, 0)";
      options.current[i].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      setOpen(1);
    } else {
      return setOpen(0);
    }
  };

  const checkNum = (b, c, id) => {
    let num = ((b - c) / b) * 100;

    if (num > 0) {
      document.querySelector(`.percentage-${id}`)?.classList.add("green");
    } else if (num < 0) {
      document.querySelector(`.percentage-${id}`)?.classList.add("red");
    }

    return num.toFixed(2) + "%";
  };

  const removal = (id) => {
    const main = document.querySelector(`.list-drop-${id}`);
    const del = document.querySelector(`.list-del-${id}`);
    const edit = document.querySelector(`.edit-${id}`);

    main.classList.remove("hidden");
    del.classList.add("hidden");
    edit.classList.add("hidden");
  };

  const RemoveOutside = (ref) => {
    useEffect(() => {
      const handleClick = (e) => {
        ref.current.forEach((r, i) => {
          if (
            !e?.target?.classList?.contains("watchlist-options") &&
            !e?.target?.nextElementSibling?.classList.contains("hidden")
          ) {
            setOpen(0);
          }
          if (ref.current[i] && !ref.current[i].contains(e.target)) {
            dropdown.current[i].classList.add("hidden");
            options.current[i].style.textDecoration = "none";
            options.current[i].style.color = "white";
            options.current[i].style.display = "none";
            removal(i);
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

  const hideSettings = (id) => {
    const main = document.querySelector(`.list-drop-${id}`);
    const del = document.querySelector(`.list-del-${id}`);

    if (!main.classList.contains("hidden")) {
      main.classList.add("hidden");
      del.classList.remove("hidden");
    } else {
      main.classList.remove("hidden");
      del.classList.add("hidden");
    }
  };

  const delList = (id) => {
    const main = document.querySelector(`.list-drop-${id}`);
    const del = document.querySelector(`.list-del-${id}`);

    dispatch(deleteUserList(id)).then(() => dispatch(getUserList(user.id)));
    dropdown.current[id].classList.add("hidden");
    main.classList.remove("hidden");
    del.classList.add("hidden");
    setNum((old) => old + 1);
  };

  const showEditSettings = (id, name) => {
    setEditInput(name);
    const main = document.querySelector(`.list-drop-${id}`);
    const edit = document.querySelector(`.edit-${id}`);

    if (!main.classList.contains("hidden")) {
      main.classList.add("hidden");
      edit.classList.remove("hidden");
    } else {
      main.classList.remove("hidden");
      edit.classList.add("hidden");
    }
  };

  const editListName = (id) => {
    const main = document.querySelector(`.list-drop-${id}`);
    const edit = document.querySelector(`.edit-${id}`);

    dispatch(editUserList(id, editInput)).then(() =>
      dispatch(getUserList(user.id))
    );

    dropdown.current[id].classList.add("hidden");
    main.classList.remove("hidden");
    edit.classList.add("hidden");
    setNum((old) => old + 1);
  };

  return (
    <div className="watch-main">
      <div className="watch-cryptos hidden">Cryptocurrencies</div>
      <div className="watch-crypto">
        {portfolio &&
          portfolio?.map((p) => (
            <div
              className="watch-crypto-card"
              key={p}
              onClick={() => history.push(`/crypto/${p.crypto_id}`)}
            >
              <div className="watch-crypto-card-left">
                <div className="watch-crypto-name">
                  {crypto.map((c) => (c.id === p.crypto_id ? c.name : null))}
                </div>
                <div className="watch-crypto-shares">
                  {p.quantity.toLocaleString()}{" "}
                  {p.quantity === 1 ? "coin" : "coins"}
                </div>
              </div>
              <div className="watch-crypto-card-right">
                <div className="watch-crypto-price">
                  $
                  {p.purchase_price > 1
                    ? p.purchase_price.toLocaleString()
                    : p.purchase_price.toFixed(3)}
                </div>
                <div className={`watch-crypto-percentage percentage-${p.id}`}>
                  {crypto.map((c) =>
                    c.id === p.crypto_id
                      ? checkNum(p.purchase_price, c.price, p.id)
                      : null
                  )}
                </div>
              </div>
            </div>
          ))}
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
                      ref={(el) => (options.current[w.id] = el)}
                      onClick={() => showDropdown(w.id)}
                    >
                      ...
                    </div>
                    <div
                      className={`watchlist-dropdown drop-${w.id} hidden`}
                      ref={(el) => (dropdown.current[w.id] = el)}
                    >
                      <div className={`list-drp-main list-drop-${w.id}`}>
                        <div
                          className="watchlist-text"
                          onMouseEnter={() =>
                            setImgUrl(
                              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmNTAwMCI+PHBhdGggZD0iTTY5LjI3MzExLDE0LjMzMzMzbC0zLjUxMzM1LDE4LjA4NDY0Yy01LjkwNjUzLDIuMjI3NTIgLTExLjMzMDQ2LDUuMzQ5ODcgLTE2LjA4MzAxLDkuMjUyMjhsLTE3LjM3MDc3LC01Ljk5MDg5bC0xNi43NDA4OSwyOC45NzQ2MWwxMy45MTM0MSwxMi4wOTM3NWMtMC41MzQ4NywzLjI4Mzk1IC0wLjgxMTg1LDYuMzI3MTcgLTAuODExODUsOS4yNTIyOGMwLDIuOTI5NSAwLjI4NTI4LDUuOTY3MTUgMC44MTE4NSw5LjI1MjI4djAuMDE0bC0xMy45MTM0MSwxMi4wOTM3NWwxNi43NDA4OSwyOC45NjA2MWwxNy4zNTY3NywtNS45NzY4OWM0Ljc1Mjk5LDMuOTA0NTQgMTAuMTg5MTksNy4wMDk0OCAxNi4wOTcsOS4yMzgyOGwzLjUxMzM1LDE4LjA4NDY0aDMzLjQ1Mzc3bDMuNTEzMzUsLTE4LjA4NDY0YzUuOTEwMzksLTIuMjI4OTcgMTEuMzI4MjQsLTUuMzQ2MjggMTYuMDgzLC05LjI1MjI3bDE3LjM3MDc3LDUuOTkwODhsMTYuNzI2ODksLTI4Ljk2MDYxbC0xMy44OTk0MSwtMTIuMTA3NzVjMC41MzQ4NiwtMy4yODM5NSAwLjgxMTg1LC02LjMyNzE3IDAuODExODUsLTkuMjUyMjhjMCwtMi45MjA3MiAtMC4yNzg1NywtNS45NTk5OSAtMC44MTE4NSwtOS4yMzgyOHYtMC4wMTRsMTMuOTEzNDEsLTEyLjEwNzc1bC0xNi43NDA4OCwtMjguOTYwNjFsLTE3LjM1Njc4LDUuOTc2ODljLTQuNzUyOTgsLTMuOTA0NTMgLTEwLjE4OTE5LC03LjAwOTQ4IC0xNi4wOTcsLTkuMjM4MjhsLTMuNTEzMzUsLTE4LjA4NDY0ek04MS4wODY5MSwyOC42NjY2N2g5LjgyNjE3bDIuNzg1NDgsMTQuMzMzMzNsNy40NzQ2MSwyLjgyNzQ3YzQuNTA1NDMsMS42OTgwNiA4LjU1MzMsNC4wMjkyNyAxMi4wNjU3NSw2LjkxNDcxbDYuMTg2ODUsNS4wNjcwNmwxMy43NzM0NCwtNC43MzExMmw0LjkxMzA4LDguNDk2NDJsLTExLjAwMTk1LDkuNTc0MjJsMS4yNTk3Niw3Ljg4MDU0djAuMDE0YzAuNDM4MjMsMi42ODcwNiAwLjYyOTg5LDQuOTQxMjEgMC42Mjk4OSw2Ljk1NjdjMCwyLjAxNTUgLTAuMTkxNjQsNC4yNjkzMSAtMC42Mjk4OSw2Ljk1NjdsLTEuMjczNzYsNy44ODA1M2wxMS4wMDE5NSw5LjU3NDIybC00LjkxMzA5LDguNTEwNDJsLTEzLjc1OTQ0LC00Ljc0NTExbC02LjIwMDg0LDUuMDgxMDVjLTMuNTEyNDUsMi44ODU0NCAtNy41NDYzMyw1LjIxNjY1IC0xMi4wNTE3NSw2LjkxNDcyaC0wLjAxNGwtNy40NzQ2LDIuODI3NDdsLTIuNzg1NDgsMTQuMzMzMzNoLTkuODEyMThsLTIuNzg1NDgsLTE0LjMzMzMzbC03LjQ3NDYxLC0yLjgyNzQ3Yy00LjUwNTQ0LC0xLjY5ODA2IC04LjU1MzMsLTQuMDI5MjcgLTEyLjA2NTc1LC02LjkxNDcybC02LjE4Njg1LC01LjA2NzA2bC0xMy43NzM0NCw0LjczMTEybC00LjkxMzA5LC04LjQ5NjQybDExLjAxNTk1LC05LjU4ODIybC0xLjI3Mzc2LC03Ljg1MjU0di0wLjAxNGMtMC40MzE5NSwtMi42OTg3NCAtMC42Mjk4OCwtNC45NTkyMSAtMC42Mjk4OCwtNi45NzA3YzAsLTIuMDE1NSAwLjE5MTY1LC00LjI2OTMxIDAuNjI5ODgsLTYuOTU2N2wxLjI3Mzc2LC03Ljg4MDUzbC0xMS4wMTU5NSwtOS41NzQyMmw0LjkxMzA5LC04LjUxMDQybDEzLjc3MzQ0LDQuNzQ1MTJsNi4xODY4NSwtNS4wODEwNWMzLjUxMjQ1LC0yLjg4NTQ1IDcuNTYwMzIsLTUuMjE2NjUgMTIuMDY1NzUsLTYuOTE0NzFsNy40NzQ2MSwtMi44Mjc0N3pNODYsNTcuMzMzMzNjLTE1Ljc0MTc1LDAgLTI4LjY2NjY3LDEyLjkyNDkyIC0yOC42NjY2NywyOC42NjY2N2MwLDE1Ljc0MTc1IDEyLjkyNDkyLDI4LjY2NjY3IDI4LjY2NjY3LDI4LjY2NjY3YzE1Ljc0MTc1LDAgMjguNjY2NjcsLTEyLjkyNDkyIDI4LjY2NjY3LC0yOC42NjY2N2MwLC0xNS43NDE3NSAtMTIuOTI0OTIsLTI4LjY2NjY3IC0yOC42NjY2NywtMjguNjY2Njd6TTg2LDcxLjY2NjY3YzcuOTY1NTksMCAxNC4zMzMzMyw2LjM2Nzc1IDE0LjMzMzMzLDE0LjMzMzMzYzAsNy45NjU1OSAtNi4zNjc3NSwxNC4zMzMzMyAtMTQuMzMzMzMsMTQuMzMzMzNjLTcuOTY1NTksMCAtMTQuMzMzMzMsLTYuMzY3NzUgLTE0LjMzMzMzLC0xNC4zMzMzM2MwLC03Ljk2NTU5IDYuMzY3NzUsLTE0LjMzMzMzIDE0LjMzMzMzLC0xNC4zMzMzM3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                            )
                          }
                          onMouseLeave={() =>
                            setImgUrl(
                              "https://img.icons8.com/material-outlined/24/ffffff/settings--v1.png"
                            )
                          }
                          // onClick={() => showEditSettings(w.id, w.name)}
                          onClick={() => setShown(true)}
                        >
                          <img className="list-settings-img" src={imgUrl} />{" "}
                          Edit list
                        </div>
                        {shown && (
                          <Modal onClose={() => setShown(false)}>
                            <EditListModal editInput={w.name} num={w.id} />
                          </Modal>
                        )}
                        <div
                          className="watchlist-text-2"
                          onMouseEnter={() =>
                            setDelUrl(
                              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojZmZmZmZmOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmY1MDAwIj48cGF0aCBkPSJNNDMuNDUwMTYsMjkuMjMzMjhjLTAuNDQ3OTgsMC4wMDYyNSAtMC44NzU4NCwwLjE4NzA0IC0xLjE5MjU4LDAuNTAzOWwtMTIuNTA2OTUsMTIuNTA2OTVjLTAuNjcyMzYsMC42NzA3OCAtMC42NzM4NywxLjc1OTU1IC0wLjAwMzM2LDIuNDMyMTlsNDEuMzEwMjMsNDEuMzIzNjdsLTQxLjMxMzU5LDQxLjMxMzU5Yy0wLjY3MTQzLDAuNjcxNzEgLTAuNjcxNDMsMS43NjA0OCAwLDIuNDMyMTlsMTIuNTEwMzEsMTIuNTEzNjdjMC42NzE3MSwwLjY3MTQzIDEuNzYwNDgsMC42NzE0MyAyLjQzMjE5LDBsNDEuMzEzNTksLTQxLjMxMzU5bDQxLjMwNjg4LDQxLjMxNjk1YzAuNjcxNzEsMC42NzE0MyAxLjc2MDQ4LDAuNjcxNDMgMi40MzIxOSwwbDEyLjUxMDMxLC0xMi41MDY5NWMwLjY3MTQzLC0wLjY3MTcxIDAuNjcxNDMsLTEuNzYwNDggMCwtMi40MzIxOWwtNDEuMzA2ODcsLTQxLjMyMDMxbDQxLjMxMzU5LC00MS4zMTM1OWMwLjY3MTQzLC0wLjY3MTcxIDAuNjcxNDMsLTEuNzYwNDggMCwtMi40MzIxOWwtMTIuNTEwMzEsLTEyLjUxMzY3Yy0wLjY3MTcxLC0wLjY3MTQzIC0xLjc2MDQ4LC0wLjY3MTQzIC0yLjQzMjE5LDBsLTQxLjMxMzU5LDQxLjMxMzU5bC00MS4zMTAyMywtNDEuMzIwMzFjLTAuMzI4MjYsLTAuMzI4MzkgLTAuNzc1MzMsLTAuNTEwMTIgLTEuMjM5NjEsLTAuNTAzOXpNNDMuNDczNjcsMzMuMzg1NDdsNDEuMzEwMjMsNDEuMzIwMzFjMC42NzE3MSwwLjY3MTQzIDEuNzYwNDgsMC42NzE0MyAyLjQzMjE5LDBsNDEuMzEzNTksLTQxLjMxMDIzbDEwLjA3ODEzLDEwLjA3ODEzbC00MS4zMTM2LDQxLjMxMzU5Yy0wLjY3MTQzLDAuNjcxNzEgLTAuNjcxNDMsMS43NjA0OCAwLDIuNDMyMTlsNDEuMzA2ODcsNDEuMzIwMzFsLTEwLjA3ODEyLDEwLjA3MTQxbC00MS4zMDY4NywtNDEuMzEzNmMtMC42NzE3MSwtMC42NzE0MyAtMS43NjA0OCwtMC42NzE0MyAtMi40MzIxOSwwbC00MS4zMTM1OSw0MS4zMTAyNGwtMTAuMDc4MTMsLTEwLjA3ODEzbDQxLjMxMzYsLTQxLjMxMzU5YzAuNjcxNDMsLTAuNjcxNzEgMC42NzE0MywtMS43NjA0OCAwLC0yLjQzMjE5bC00MS4zMDY4OCwtNDEuMzIzNjd6TTQzLjg0OTkyLDQyLjk4OTkyYy0wLjM1MDQsMC4wMDAwNyAtMC42NjU3MywwLjIxMjcxIC0wLjc5NzE0LDAuNTM3NTRjLTAuMTMxNDEsMC4zMjQ4MyAtMC4wNTI2MiwwLjY5NjkgMC4xOTkxNywwLjk0MDU5bDEuNzIsMS43MmMwLjIxNTcxLDAuMjI0NjQgMC41MzYsMC4zMTUxMiAwLjgzNzM3LDAuMjM2NTVjMC4zMDEzNiwtMC4wNzg1NyAwLjUzNjcxLC0wLjMxMzkyIDAuNjE1MjgsLTAuNjE1MjhjMC4wNzg1NywtMC4zMDEzNiAtMC4wMTE5MSwtMC42MjE2NiAtMC4yMzY1NSwtMC44MzczN2wtMS43MiwtMS43MmMtMC4xNjIwNCwtMC4xNjc0NyAtMC4zODUwOSwtMC4yNjIwMyAtMC42MTgxMiwtMC4yNjIwM3pNMTI4LjEyMzIsNDIuOTkzMjhjLTAuMjIzMTksMC4wMDYyMSAtMC40MzUyMSwwLjA5ODk3IC0wLjU5MTI1LDAuMjU4NjdsLTEuNzIsMS43MmMtMC4yMjQ2NCwwLjIxNTcxIC0wLjMxNTEyLDAuNTM2IC0wLjIzNjU1LDAuODM3MzdjMC4wNzg1NywwLjMwMTM2IDAuMzEzOTIsMC41MzY3MSAwLjYxNTI4LDAuNjE1MjhjMC4zMDEzNiwwLjA3ODU3IDAuNjIxNjYsLTAuMDExOTEgMC44MzczNywtMC4yMzY1NWwxLjcyLC0xLjcyYzAuMjUzMDksLTAuMjQ3NDMgMC4zMjg3NSwtMC42MjQ2NCAwLjE5MDY3LC0wLjk1MDU0Yy0wLjEzODA4LC0wLjMyNTkgLTAuNDYxNzEsLTAuNTMzOTMgLTAuODE1NTIsLTAuNTI0MjN6TTQ5LjAwOTkyLDQ4LjE0OTkyYy0wLjM1MDQsMC4wMDAwNyAtMC42NjU3MywwLjIxMjcxIC0wLjc5NzE0LDAuNTM3NTRjLTAuMTMxNDEsMC4zMjQ4MyAtMC4wNTI2MiwwLjY5NjkgMC4xOTkxNywwLjk0MDU5bDMuNDQsMy40NGMwLjIxNTcxLDAuMjI0NjQgMC41MzYsMC4zMTUxMiAwLjgzNzM3LDAuMjM2NTVjMC4zMDEzNiwtMC4wNzg1NyAwLjUzNjcxLC0wLjMxMzkyIDAuNjE1MjgsLTAuNjE1MjhjMC4wNzg1NywtMC4zMDEzNiAtMC4wMTE5MSwtMC42MjE2NiAtMC4yMzY1NSwtMC44MzczN2wtMy40NCwtMy40NGMtMC4xNjIwNCwtMC4xNjc0NyAtMC4zODUwOSwtMC4yNjIwMyAtMC42MTgxMiwtMC4yNjIwM3pNMTIyLjk2MzIsNDguMTUzMjhjLTAuMjIzMTksMC4wMDYyMSAtMC40MzUyMSwwLjA5ODk3IC0wLjU5MTI1LDAuMjU4NjdsLTM2LjM3MTk1LDM2LjM3MTk1bC0yOS40OTE5NSwtMjkuNDkxOTVjLTAuMTYyMDQsLTAuMTY3NDcgLTAuMzg1MDksLTAuMjYyMDMgLTAuNjE4MTIsLTAuMjYyMDNjLTAuMzUwNCwwLjAwMDA3IC0wLjY2NTczLDAuMjEyNzEgLTAuNzk3MTQsMC41Mzc1NGMtMC4xMzE0MSwwLjMyNDgzIC0wLjA1MjYyLDAuNjk2OSAwLjE5OTE3LDAuOTQwNTlsMjkuNDkxOTUsMjkuNDkxOTVsLTM2LjM3MTk1LDM2LjM3MTk1Yy0wLjIyNDY0LDAuMjE1NzEgLTAuMzE1MTIsMC41MzYgLTAuMjM2NTUsMC44MzczN2MwLjA3ODU3LDAuMzAxMzYgMC4zMTM5MiwwLjUzNjcxIDAuNjE1MjgsMC42MTUyOGMwLjMwMTM2LDAuMDc4NTcgMC42MjE2NiwtMC4wMTE5MSAwLjgzNzM3LC0wLjIzNjU1bDM2LjM3MTk1LC0zNi4zNzE5NWwyOS40OTE5NSwyOS40OTE5NWMwLjIxNTcxLDAuMjI0NjQgMC41MzYsMC4zMTUxMiAwLjgzNzM3LDAuMjM2NTVjMC4zMDEzNiwtMC4wNzg1NyAwLjUzNjcxLC0wLjMxMzkyIDAuNjE1MjgsLTAuNjE1MjhjMC4wNzg1NywtMC4zMDEzNiAtMC4wMTE5MSwtMC42MjE2NiAtMC4yMzY1NSwtMC44MzczN2wtMjkuNDkxOTUsLTI5LjQ5MTk1bDM2LjM3MTk1LC0zNi4zNzE5NWMwLjI1MzA5LC0wLjI0NzQzIDAuMzI4NzUsLTAuNjI0NjQgMC4xOTA2NywtMC45NTA1NGMtMC4xMzgwOCwtMC4zMjU5IC0wLjQ2MTcxLC0wLjUzMzkzIC0wLjgxNTUyLC0wLjUyNDIzek0xMTkuNTI5OTIsMTE4LjY2OTkyYy0wLjM1MDQsMC4wMDAwNyAtMC42NjU3MywwLjIxMjcxIC0wLjc5NzE0LDAuNTM3NTRjLTAuMTMxNDEsMC4zMjQ4MyAtMC4wNTI2MiwwLjY5NjkgMC4xOTkxNywwLjk0MDU5bDMuNDQsMy40NGMwLjIxNTcxLDAuMjI0NjQgMC41MzYsMC4zMTUxMiAwLjgzNzM3LDAuMjM2NTVjMC4zMDEzNiwtMC4wNzg1NyAwLjUzNjcxLC0wLjMxMzkyIDAuNjE1MjgsLTAuNjE1MjhjMC4wNzg1NywtMC4zMDEzNiAtMC4wMTE5MSwtMC42MjE2NiAtMC4yMzY1NSwtMC44MzczN2wtMy40NCwtMy40NGMtMC4xNjIwNCwtMC4xNjc0NyAtMC4zODUwOSwtMC4yNjIwMyAtMC42MTgxMiwtMC4yNjIwM3pNMTI2LjQwOTkyLDEyNS41NDk5MmMtMC4zNTA0LDAuMDAwMDcgLTAuNjY1NzMsMC4yMTI3MSAtMC43OTcxNCwwLjUzNzU0Yy0wLjEzMTQxLDAuMzI0ODMgLTAuMDUyNjIsMC42OTY5IDAuMTk5MTcsMC45NDA1OWwxLjcyLDEuNzJjMC4yMTU3MSwwLjIyNDY0IDAuNTM2LDAuMzE1MTIgMC44MzczNywwLjIzNjU1YzAuMzAxMzYsLTAuMDc4NTcgMC41MzY3MSwtMC4zMTM5MiAwLjYxNTI4LC0wLjYxNTI4YzAuMDc4NTcsLTAuMzAxMzYgLTAuMDExOTEsLTAuNjIxNjYgLTAuMjM2NTUsLTAuODM3MzdsLTEuNzIsLTEuNzJjLTAuMTYyMDQsLTAuMTY3NDcgLTAuMzg1MDksLTAuMjYyMDMgLTAuNjE4MTMsLTAuMjYyMDN6TTQ1LjU2MzIsMTI1LjU1MzI4Yy0wLjIyMzE5LDAuMDA2MjEgLTAuNDM1MjEsMC4wOTg5NyAtMC41OTEyNSwwLjI1ODY3bC0xLjcyLDEuNzJjLTAuMjI0NjQsMC4yMTU3MSAtMC4zMTUxMiwwLjUzNiAtMC4yMzY1NSwwLjgzNzM3YzAuMDc4NTcsMC4zMDEzNiAwLjMxMzkyLDAuNTM2NzEgMC42MTUyOCwwLjYxNTI4YzAuMzAxMzYsMC4wNzg1NyAwLjYyMTY2LC0wLjAxMTkxIDAuODM3MzcsLTAuMjM2NTVsMS43MiwtMS43MmMwLjI1MzA5LC0wLjI0NzQzIDAuMzI4NzUsLTAuNjI0NjQgMC4xOTA2NywtMC45NTA1NGMtMC4xMzgwOCwtMC4zMjU5IC0wLjQ2MTcxLC0wLjUzMzkzIC0wLjgxNTUyLC0wLjUyNDIzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                            )
                          }
                          onMouseLeave={() =>
                            setDelUrl(
                              "https://img.icons8.com/carbon-copy/100/ffffff/delete-sign.png"
                            )
                          }
                          onClick={() => hideSettings(w.id)}
                        >
                          <img className="list-settings-img" src={delUrl} />{" "}
                          Delete list
                        </div>
                      </div>
                      <div
                        className={`edit-watchlist-main edit-${w.id} hidden`}
                      >
                        <input
                          className="watchlist-edit-input"
                          onKeyPress={(e) =>
                            e.key === "Enter" && editListName(w.id)
                          }
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                        />
                        <div className="edit-btns">
                          <button
                            className="list-edit-yes"
                            onClick={() => editListName(w.id)}
                          >
                            Submit
                          </button>
                          <button
                            className="list-edit-no"
                            onClick={() => showEditSettings(w.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div
                        className={`watchlist-text-2-confirmation list-del-${w.id} hidden`}
                      >
                        Are you sure?
                        <div className="list-del-btns">
                          <button
                            className="list-del-yes"
                            onClick={() => delList(w.id)}
                          >
                            Yes
                          </button>
                          <button
                            className="list-del-no"
                            onClick={() => hideSettings(w.id)}
                          >
                            No
                          </button>
                        </div>
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
                  <div
                    className="watchlist-cryptos"
                    onClick={() => history.push(`/crypto/${crypto.id}`)}
                  >
                    <div className="watchlist-crypto-name">{crypto.symbol}</div>
                    <div className="watchlist-crypto-right">
                      <div className="watchlist-crypto-price">
                        $
                        {crypto.price > 1
                          ? crypto.price.toLocaleString()
                          : crypto.price.toFixed(3)}
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
