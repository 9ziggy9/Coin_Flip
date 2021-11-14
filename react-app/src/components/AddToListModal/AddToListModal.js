import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromList,
  getUserList,
  updateUserList,
} from "../../store/watchlist";
import { newUserList } from "../../store/watchlist";
import { useListModal } from "../../context/ListModal";
import "./AddToList.css";

const AddToListModal = ({ cryptoId }) => {
  const dispatch = useDispatch();
  const listInput = useRef(null);
  const createNew = useRef(null);
  const [input, setInput] = useState();
  const { setShowModal } = useListModal();
  const watchlists = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);
  const crypto = useSelector((state) => state.crypto.getOneCrypto[0]);
  const [checked, setChecked] = useState(
    new Array(watchlists?.length).fill(false)
  );

  const handleChange = (index) => {
    const updated = checked.map((bool, i) => (i === +index ? !bool : bool));
    setChecked(updated);
  };

  useEffect(() => {
    dispatch(getUserList(user.id)).then(() => {
      const arr = new Array(watchlists?.length).fill(false);

      watchlists?.forEach((li, num) => {
        li.cryptos.forEach((c) => {
          if (c.id === +cryptoId) {
            arr[num] = true;
          }
        });
      });
      setChecked(arr);
    });
  }, [dispatch]);

  useEffect(() => {
    const arr = new Array(watchlists?.length).fill(false);

    watchlists?.forEach((li, num) => {
      li.cryptos.forEach((c) => {
        if (c.id === +cryptoId) {
          arr[num] = true;
        }
      });
    });
    setChecked(arr);
  }, [watchlists]);

  const submit = () => {
    checked.forEach((c, i) => {
      if (c === true) {
        dispatch(updateUserList(watchlists[i].id, cryptoId, user.id));
      } else {
        dispatch(deleteFromList(watchlists[i].id, cryptoId));
      }
    });

    dispatch(getUserList(user.id));
    const arr = new Array(watchlists?.length).fill(false);

    watchlists?.forEach((li, num) => {
      li.cryptos.forEach((c) => {
        if (c.id === +cryptoId) {
          arr[num] = true;
        }
      });
    });
    setChecked(arr);
    setShowModal(false);
  };

  const submitNew = (e) => {
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
    createNew.current.classList.remove("hidden");
  };

  const cancel = (e) => {
    e.preventDefault();
    setInput("");
    listInput.current.classList.add("hidden");
    createNew.current.classList.remove("hidden");
  };

  const show = () => {
    createNew.current.classList.add("hidden");
    listInput.current.classList.remove("hidden");
  };

  return (
    <div className="add-to-list-modal">
      <div className="add-top">Add {crypto.name} to Your Lists</div>
      <div className="add-list-main">
        <div className="list-create-img" ref={createNew}>
          <img src="https://img.icons8.com/material-outlined/24/ffffff/plus-math--v1.png" />
          <div onClick={show} className="crypto-create-list">
            Create New List
          </div>
        </div>
        <form
          className="create-list hidden"
          ref={listInput}
          onSubmit={(e) => submitNew(e)}
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
        {watchlists &&
          watchlists?.map((list, i) => (
            <div key={list.id} className="add-list-card">
              <input
                className="checkbox"
                type="checkbox"
                checked={checked[i]}
                onChange={() => handleChange(i)}
              />
              <div className="list-info">
                <div className="list-name">{list.name}</div>
                <div className="list-amount">
                  {list.cryptos.length > 0
                    ? list.cryptos.length === 1
                      ? list.cryptos.length + " item"
                      : list.cryptos.length + " items"
                    : "0 items"}
                </div>
              </div>
            </div>
          ))}
      </div>
      <button onClick={submit}>Save Changes</button>
    </div>
  );
};

export default AddToListModal;
