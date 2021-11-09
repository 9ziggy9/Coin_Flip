import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { purchase } from "../../store/dev";

const DevForm = () => {
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState(0);
  const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const updateAmount = (e) => setAmount(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const onPurchase = async (e) => {
        e.preventDefault();
        const data = await dispatch(purchase(amount, price));
        if (data) return data;
    };

    if(user) {
        return (
            <form onSubmit={onPurchase}>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        name="amount"
                        type="number"
                        placeholder="amount"
                        value={amount}
                        onChange={updateAmount}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={updatePrice}
                    />
                    <button type="submit">Purchase</button>
                </div>
            </form>
        )
        } else {
            return <Redirect to="/" />
    }
}

export default DevForm
