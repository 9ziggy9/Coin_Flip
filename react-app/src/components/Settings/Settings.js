import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import './Settings.css';

const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    if (user) {
        return (
            <h1>Welcome to Settings Page</h1>
        )
    }
}

export default Settings;
