import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { userPortfolios } from "../../store/portfolio";


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(userPortfolios(user?.id))
    }, [dispatch]);

    if(user) {
        return (
            <div className="home-main">
                Welcome to home page
            </div>
            )
        } else {
        return <Redirect to="/" />
    }
}

export default Home
