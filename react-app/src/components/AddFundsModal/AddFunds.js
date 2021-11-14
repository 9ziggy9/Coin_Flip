import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFunds } from "../../store/session";
import { useListModal } from "../../context/ListModal";
import "./AddFunds.css";

const AddFunds = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState(0);
  const [errors, setErrors] = useState([]);
  const { setBool } = useListModal();
  const user = useSelector((state) => state.session.user);

  const submit = () => {
    const err = [];

    if (user?.cash > 49999999) {
      err.push("You are over the cash limit.");
    }

    if (user?.cash + number >= 50000000) {
      err.push(
        `Adding $${number.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} to your bank account will put you over the cash limit.`
      );
    }

    if (err.length > 0) {
      return setErrors(err);
    }

    dispatch(addFunds(number));
    setBool(false);
  };

  const changeAmount = (e) => {
    let count = 0;
    if (amount?.includes(".")) {
      e.target.value.split("").filter((i) => (i === "." ? count++ : null));
    }

    if (count > 1) {
      return;
    }

    if (
      amount[amount.length - 3] === "." &&
      e.target.value[e.target.value.length - 4] === "."
    ) {
      return;
    }

    const replace = e.target.value.replace(/[^\d\.-]/g, "");

    setNumber(Number(replace));

    if (
      replace[replace.length - 2] === "." &&
      replace[replace.length - 1] === "0"
    ) {
      const newNum =
        Number(replace).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + ".0";
      return setAmount("$" + newNum);
    }

    if (
      (replace[replace.length - 3] === "." &&
        replace[replace.length - 1] === "0") ||
      (replace[replace.length - 4] === "." &&
        replace[replace.length - 2] === "0")
    ) {
      const newNum =
        Number(replace).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + "0";
      return setAmount("$" + newNum);
    }

    if (replace[replace.length - 1] === ".") {
      const newNum =
        Number(replace).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + ".";
      return setAmount("$" + newNum);
    }

    const num = Number(replace).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    setAmount("$" + num);
  };

  return (
    <div className="add-funds-main">
      <div className="add-close" onClick={() => setBool(false)}>
        <img
          className="add-img"
          alt="svgImg"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiNmZmZmZmY7Ij48cGF0aCBkPSJNIDQuNzA3MDMxMiAzLjI5Mjk2ODggTCAzLjI5Mjk2ODggNC43MDcwMzEyIEwgMTAuNTg1OTM4IDEyIEwgMy4yOTI5Njg4IDE5LjI5Mjk2OSBMIDQuNzA3MDMxMiAyMC43MDcwMzEgTCAxMiAxMy40MTQwNjIgTCAxOS4yOTI5NjkgMjAuNzA3MDMxIEwgMjAuNzA3MDMxIDE5LjI5Mjk2OSBMIDEzLjQxNDA2MiAxMiBMIDIwLjcwNzAzMSA0LjcwNzAzMTIgTCAxOS4yOTI5NjkgMy4yOTI5Njg4IEwgMTIgMTAuNTg1OTM4IEwgNC43MDcwMzEyIDMuMjkyOTY4OCB6Ij48L3BhdGg+PC9zdmc+"
        />
      </div>
      <div className="add-form">
        {errors?.length > 0 &&
          errors?.map((err) => <div className="add-error">• {err}</div>)}
        <h2 className="add-title">Add Funds</h2>
        <div className="add-inpt">
          <div className="add-amount">
            Amount{" "}
            <span className="add-warning">(Total Cash Limit: $50,000,000)</span>
          </div>
          <input
            autoComplete="off"
            autoFocus="on"
            type="text"
            value={amount}
            placeholder="$0.00"
            onChange={(e) => changeAmount(e)}
            className="add-input"
          />
        </div>
        <button onClick={submit} className="add-submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddFunds;
