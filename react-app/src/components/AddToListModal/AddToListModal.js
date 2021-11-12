import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromList,
  getUserList,
  updateUserList,
} from "../../store/watchlist";
import { useListModal } from "../../context/ListModal";
import "./AddToList.css";

const AddToListModal = ({ cryptoId }) => {
  const dispatch = useDispatch();
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

  return (
    <div className="add-to-list-modal">
      <div className="add-top">Add {crypto.name} to Your Lists</div>
      <div className="add-list-main">
        {watchlists &&
          watchlists?.map((list, i) => (
            <div key={list.id} className="add-list-card">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => handleChange(i)}
              />
              <div className="list-name">{list.name}</div>
            </div>
          ))}
      </div>
      <button onClick={submit}>Save Changes</button>
    </div>
  );
};

export default AddToListModal;
