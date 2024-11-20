import { useState } from "react";
import "../Form.css"
import { useThemeContext } from "../context/ThemeContextProvider";
import useAxiosAPI from "../axiosAPI"
import { Link, useNavigate } from "react-router-dom";


function RegistrationForm() {
    const empty = { username: "", email: "", password: "" }
    const [account, setAccount] = useState({ ...empty });
    const [formChanged, setFormChanged] = useState(false);
    const { theme } = useThemeContext();
    const [samePassword, setSamePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { postUser } = useAxiosAPI();
    const [responseMessage, setResponseMessage] = useState(undefined);
    const [submitted, setSubmitted] = useState(false);

    function handleFormInput(e) {
        if (!e.target.name || e.target.name.lenght == 0 || e.target.value === undefined || account[e.target.name] === e.target.value || (!account[e.target.name] && !e.target.value)) {
            return;
        }
        if (e.target.name !== "password2" && e.target.name !== "show") {
            //console.log(e.target.name + ": ", account[e.target.name], " --> ", e.target.value);
            console.log(e.target.name + ": ", e.target.value);
            const accountChanged = { ...account };
            accountChanged[e.target.name] = e.target.value;
            setAccount(accountChanged);
        }
        setFormChanged(true);
        setSamePassword(checkPassword());
        setResponseMessage(undefined);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        clearPassword();
        setSubmitted(true);
        const { statusCode, message, success } = await postUser("/register", account);
        setResponseMessage({ message, statusCode, success });
        if (success) {
            setTimeout(() => {
                setSubmitted(false);
                navigate("/login/" + account.username);
            }, 1000);
        }
        else {
            handleClear(e, false);
        }
    }

    function handleClear(e, clearResponseMessage = true) {
        setFormChanged(false);
        setAccount({ ...empty });
        setSamePassword(false);
        setShowPassword(false);
        if (clearResponseMessage) {
            setResponseMessage(undefined);
        }
        setSubmitted(false);
    }

    function clearPassword() {
        const pwInput1 = document.querySelector('input[name="password"]');
        const pwInput2 = document.querySelector('input[name="password2"]');
        pwInput1.value = "";
        pwInput2.value = "";
    }

    function checkPassword() {
        const pwInput1 = document.querySelector('input[name="password"]');
        const pwInput2 = document.querySelector('input[name="password2"]');
        return pwInput1.value === pwInput2.value && pwInput1.value !== "";
    }

    function toggleShowPassword(e) {
        setShowPassword(e.target.checked);
    }

    return (
        <main className={theme}>
            <form onSubmit={handleSubmit} onClick={handleFormInput} onKeyUp={handleFormInput}>
                <div className="form-block">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" onChange={handleFormInput} required={true} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-Mail:</label>
                        <input type="email" name="email" onChange={handleFormInput} required={true} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type={showPassword ? "text" : "password"} name="password" onChange={handleFormInput} required={true} />
                        <input type={showPassword ? "text" : "password"} name="password2" onChange={handleFormInput} required={true} placeholder="confirm password" />
                        <div>
                            <input type="checkbox" onChange={toggleShowPassword} checked={showPassword} required={!samePassword} />
                            <span>{showPassword ? "Hide" : "Show"}</span>
                        </div>
                    </div>
                </div>
                <div className="form-block">
                    <div className="form-group">
                        <label>Submit:</label>
                        <button type="reset" onClick={handleClear}>Clear</button>
                        <button type="submit" disabled={(!formChanged || submitted)}>Register</button>
                        <p style={responseMessage && { color: (responseMessage.success ? "green" : "red") }}>{responseMessage ? responseMessage.message : " "}</p>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default RegistrationForm;
