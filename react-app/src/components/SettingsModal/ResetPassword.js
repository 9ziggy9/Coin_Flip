import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ResetPassword.css';

const ResetPassword = ({ user }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const onReset = async (e) => {
        e.preventDefault();
        // const data = await dispatch()
        // if (data) {
        //     setErrors(data);
        // }
        setErrors(["Testing Errors Div", "Hello world"])
    }

    const updateOldPassword = (e) => {
        setOldPassword(e.target.value);
    }

    const updateNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    return (
        <div>
            <div className="reset_password_form_container">
                <form onSubmit={onReset} className="reset_password_form" autoComplete="off">
                    <div className="errors">
                        {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className="old_password">
                        <label className="old_password_label" htmlFor="old_password">
                        Old Password
                        </label>
                        <input
                        className="old_password_input"
                        name="old_passsword"
                        type="password"
                        value={oldPassword}
                        onChange={updateOldPassword}
                        />
                    </div>
                    <div className="new_password">
                        <label className="new_password_label" htmlFor="new_password">
                        New Password
                        </label>
                        <input
                        className="new_password_input"
                        name="new_password"
                        type="password"
                        value={newPassword}
                        onChange={updateNewPassword}
                        />
                    </div>
                        <div className="reset_lower">
                            <button className="reset_password_btn" type="submit">
                                <h4 className="reset_password_text">Reset Password</h4>
                            </button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
