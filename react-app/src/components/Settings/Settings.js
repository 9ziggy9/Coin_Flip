import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SettingsModal from "../SettingsModal/SettingsModal";
import './Settings.css';
import { logout } from '../../store/session';

const Settings = () => {
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    const handleDeactivate = async(e) => {
        e.preventDefault();
        if (user) {
            const data = await fetch(`/api/auth/${user.id}/delete`);
            dispatch(logout());
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
                        <div className="account_password_container">
                            <p className="account_password_label">Password</p>
                            <SettingsModal user={user}/>
                        </div>
                    </div>
                    <div className="account_deactivation_container">
                        <button type="button" className="account_deactivation_button" onClick={handleDeactivate}>
                            <h4 className="account_deactivation_text">Deactivate your account</h4>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;
