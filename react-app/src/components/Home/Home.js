import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";


const Home = () => {
    const user = useSelector(state => state.session.user)

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
