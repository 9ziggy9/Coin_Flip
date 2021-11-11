import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";

const Transactions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const portfolios = useSelector(state => Object.values(state.portfolio))

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
    }, [dispatch]);

    if (user) {
        return (
            <h1>Welcome to the Transactions Page</h1>
        )
    }

}

export default Transactions
