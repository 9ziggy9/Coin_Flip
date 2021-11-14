import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AddFunds.css";

const AddFunds = () => {
  const [amount, setAmount] = useState("");
  const user = useSelector((state) => state.session.user);

  const changeAmount = (e) => {
    let count = 0;
    if (amount?.includes(".")) {
      e.target.value.split("").filter((i) => (i === "." ? count++ : null));
    }

    if (count > 1) {
      return;
    }

    if (amount[amount.length - 3] === "." && e.target.value[e.target.value.length - 4] === ".") {
      return
    }

    const replace = e.target.value.replace(/[^\d\.-]/g, "");

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
      <button className="add-submit">Submit</button>
    </div>
  );
};

export default AddFunds;
