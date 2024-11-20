import { useEffect, useState } from "react";
import "../Form.css";
import { useThemeContext } from "../context/ThemeContextProvider";
import useAxiosAPI from "../axiosAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

function LoginForm() {
    const empty = { username: "", password: "" }
    const [account, setAccount] = useState({ ...empty });
    const [formChanged, setFormChanged] = useState(false);
    const { theme } = useThemeContext();
    const [showPassword, setShowPassword] = useState(false);
    const { postUser } = useAxiosAPI();
    const [responseMessage, setResponseMessage] = useState(undefined);
    const { authenticateUser, storeToken, isLoggedIn } = useUserContext();
    const navigate = useNavigate();
    const paramsUsername = useParams()?.username;
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (paramsUsername) {
            account.username = paramsUsername;
            setAccount(account);
        }
    }, []);

    function handleFormInput(e) {
        if (!e.target.name || e.target.name.lenght == 0 || e.target.value === undefined || account[e.target.name] === e.target.value || (!account[e.target.name] && !e.target.value)) {
            return;
        }
        //console.log(e.target.name + ": ", account[e.target.name], " --> ", e.target.value);
        console.log(e.target.name + ": ", e.target.value);
        const accountChanged = { ...account };
        accountChanged[e.target.name] = e.target.value;
        setAccount(accountChanged);
        setFormChanged(true);
        setResponseMessage(undefined);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        clearPassword();
        setSubmitted(true);
        const { data, statusCode, message, success } = await postUser("/login", account);
        setResponseMessage({ message, statusCode, success });
        if (success) {
            if (data.authToken) {
                storeToken(data.authToken);
            }
            await authenticateUser();
            setTimeout(() => {
                setSubmitted(false);
                navigate("/");
            }, 1000);
        }
        else {
            handleClear(e, false);
        }
    }

    function handleClear(e, clearResponseMessage = true) {
        setFormChanged(false);
        setAccount({ ...empty });
        setShowPassword(false);
        if (clearResponseMessage) {
            setResponseMessage(undefined);
        }
        setSubmitted(false);
    }

    function clearPassword() {
        const pwInput = document.querySelector('input[name="password"]');
        pwInput.value = "";
    }

    function toggleShowPassword(e) {
        setShowPassword(e.target.checked);
    }

    return (
        <main className={theme ? "dark" : "light"}>
            <form onSubmit={handleSubmit} onClick={handleFormInput} onKeyUp={handleFormInput}>
                <div className="form-block">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" onChange={handleFormInput} required={true} defaultValue={paramsUsername ? paramsUsername : ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type={showPassword ? "text" : "password"} name="password" onChange={handleFormInput} required={true} />
                        <div>
                            <input type="checkbox" onChange={toggleShowPassword} checked={showPassword} />
                            <span>{showPassword ? "Hide" : "Show"}</span>
                        </div>
                    </div>
                </div>
                <div className="form-block">
                    <div className="form-group">
                        <label>Submit:</label>
                        <button type="reset" onClick={handleClear}>Clear</button>
                        <button type="submit" disabled={(!formChanged || submitted || isLoggedIn)}>Login</button>
                        <p style={responseMessage && { color: (responseMessage.success ? "green" : "red") }}>{responseMessage ? responseMessage.message : " "}</p>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default LoginForm;
