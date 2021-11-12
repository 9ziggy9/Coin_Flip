import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../../store/watchlist";
import "./AddToList.css";

const AddToListModal = ({ cryptoId }) => {
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.session.user);
  const crypto = useSelector((state) => state.crypto.getOneCrypto[0]);
  const [checked, setChecked] = useState(
    new Array(watchlists?.length).fill(false)
  );

  const handleChange = (index) => {
    const updated = checked.map((bool, i) => (i === index ? !bool : bool));
    setChecked(updated);
  };

  useEffect(() => {
      dispatch(getUserList(user.id));
  }, [dispatch]);

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
    </div>
  );
};

export default AddToListModal;
