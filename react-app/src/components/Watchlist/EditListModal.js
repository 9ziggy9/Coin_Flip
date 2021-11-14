import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserList } from "../../store/watchlist";
import { getUserList } from "../../store/watchlist";
import { useListModal } from "../../context/ListModal";

export default function EditListModal({ editInput, num }) {
  const user = useSelector((state) => state.session.user);
  const [edit, setEditInput] = useState(editInput);
  const { setShown } = useListModal();
  const dispatch = useDispatch();

  const editListName = (id) => {
    if (edit.length < 1) {
      return;
    }

    dispatch(editUserList(id, edit)).then(() =>
      dispatch(getUserList(user?.id))
    );

    setShown(false);
  };

  return (
    <div className="edit-modal">
      <div className="edit-list-name">
        <p>Edit List</p>
        <img
          className="e-list-close"
          alt="svgImg"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiNmZmZmZmY7Ij48cGF0aCBkPSJNIDQuNzA3MDMxMiAzLjI5Mjk2ODggTCAzLjI5Mjk2ODggNC43MDcwMzEyIEwgMTAuNTg1OTM4IDEyIEwgMy4yOTI5Njg4IDE5LjI5Mjk2OSBMIDQuNzA3MDMxMiAyMC43MDcwMzEgTCAxMiAxMy40MTQwNjIgTCAxOS4yOTI5NjkgMjAuNzA3MDMxIEwgMjAuNzA3MDMxIDE5LjI5Mjk2OSBMIDEzLjQxNDA2MiAxMiBMIDIwLjcwNzAzMSA0LjcwNzAzMTIgTCAxOS4yOTI5NjkgMy4yOTI5Njg4IEwgMTIgMTAuNTg1OTM4IEwgNC43MDcwMzEyIDMuMjkyOTY4OCB6Ij48L3BhdGg+PC9zdmc+"
          onClick={() => setShown(false)}
        />
      </div>
      <div className="edit-input-cont">
        <input
          className="watchlist-edit-input"
          onKeyPress={(e) => e.key === "Enter" && editListName(num)}
          value={edit}
          onChange={(e) => setEditInput(e.target.value)}
        />
        <div className="edit-btns">
          <button className="list-edit-yes" onClick={() => editListName(num)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
