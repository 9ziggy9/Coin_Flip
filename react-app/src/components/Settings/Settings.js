import { useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import SettingsModal from "../SettingsModal/SettingsModal";
import { confirm } from 'react-confirm-box';
import './Settings.css';
import { logout } from '../../store/session';

const Settings = () => {
    const user = useSelector(state => state.session.user)
    const [delTask, setDelTask] = useState(false)

    const dispatch = useDispatch();

    const handleDeactivate = async () => {
        
        if (user) {
            await fetch(`/api/auth/${user.id}/delete`);
            dispatch(logout());
        }
    }

    const handleConfirmationBox = (e) => {
        e.preventDefault();

        if (!delTask) {
            document.querySelector(".confirm-background").style.display = "flex"
            document.querySelector(".container").style.display = "flex"
            setDelTask(true)
        } else {
            document.querySelector(".confirm-background").style.display = "none"
            document.querySelector(".container").style.display = "none"
            setDelTask(false)
        }
    }

    if (user) {
        return (
            <div className="settings_main">
                <div className="settings_upper_container">
                    <div className="user_name_container">
                        <h2 className="user_name_text">{user.username}</h2>
                        <div className="settings_label_container">
                            <h3 className="settings_label">Settings</h3>
                        </div>
                    </div>
                </div>
                <div className="settings_lower_container">
                    <div className="account_information_container">
                        <div className="account_information_title_container">
                            <h3 className="account_information_title">Account Information</h3>
                            <h4 className="account_text_label">Account</h4>
                        </div>
                        <div className="account_username_container">
                            <p className="username_label">User Name</p>
                            <p className="username">{user.username}</p>
                        </div>
                        <div className="account_number_container">
                            <p className="account_number_label">Account Number</p>
                            <p className="account_number">{user.id}</p>
                        </div>
                        <div className="account_email_container">
                            <p className="account_email_label">Email Address</p>
                            <p className="account_email">{user.email}</p>
                        </div>
                        {/* <div className="account_password_container">
                            <p className="account_password_label">Password</p>
                            <SettingsModal user={user}/>
                        </div> */}
                        <div className="account_deactivation_container">
                            <button type="button" className="account_deactivation_button" onClick={handleConfirmationBox}>
                                <h4 className="account_deactivation_text">Deactivate your account</h4>
                            </button>
                        </div>
                        {/* Confirmation Box */}
                        <div className="container">
                            <div className="confirmation-text">
                                Are you sure you want to deactivate your account?
                            </div>
                            <div className="button-container">
                                <button
                                    className="cancel-button"
                                    onClick={handleConfirmationBox}>
                                    Cancel
                                </button>
                                <button
                                    className="confirmation-button"
                                    onClick={handleDeactivate}>
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div
                            className="confirm-background">
                            onClick={() => handleConfirmationBox()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;
