import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";

const HelloPlot = () => {
    const user = useSelector(state => state.session.user)

    if(user) {
        return (
          <h2>HELLO WORLD</h2>
            )
        } else {
        return <Redirect to="/" />
    }
}

export default HelloPlot
