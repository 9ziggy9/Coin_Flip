import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFunds } from "../../store/session";
import "./AddFunds.css";

const AddFunds = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState(0);
  const [errors, setErrors] = useState([]);
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
      <div className="close">X</div>
      {errors?.length > 0 && errors?.map(err => (
        <div className="add-error">{err}</div>
      ))}
      <div className="add-title">Add Funds</div>
      <div className="add-amount">Amount</div>
      <input
        autoComplete="off"
        autoFocus="on"
        type="text"
        value={amount}
        placeholder="$0.00"
        onChange={(e) => changeAmount(e)}
        className="add-input"
      />
      <button onClick={submit} className="add-submit">
        Submit
      </button>
    </div>
  );
};

export default AddFunds;
