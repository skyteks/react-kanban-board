import { useState } from "react";
import "../Form.css";
import { useThemeContext } from "../context/ThemeContextProvider.jsx";
import useAxiosAPI from "../axiosAPI.js";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

function LoginForm() {
    const empty = { email: "", password: "" }
    const [account, setAccount] = useState({ ...empty });
    const [formChanged, setFormChanged] = useState(false);
    const { theme } = useThemeContext();
    const [showPassword, setShowPassword] = useState(false);
    const { postData } = useAxiosAPI();
    const [resonseMessage, setResponseMessage] = useState(undefined);
    const { storeToken, authenticateUser } = useUserContext();

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
    }

    async function handleSubmit(e) {
        e.preventDefault();
        clearPassword();
        const success = await postData("/login", account, setResponseMessage, storeToken);
        if (success) {
            await authenticateUser();
            //navigate("/");
        }
        else {
            //handleClear(e);
        }
    }

    function handleClear(e) {
        setFormChanged(false);
        setAccount({ ...empty });
        setShowPassword(false);
        setResponseMessage(undefined)
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
                        <label htmlFor="email">E-Mail:</label>
                        <input type="email" name="email" onChange={handleFormInput} required={true} />
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
                        <button type="submit" disabled={(!formChanged)}>Login</button>
                        {resonseMessage && <p>{resonseMessage}</p>}
                    </div>
                </div>
            </form>
        </main>
    );
}

export default LoginForm;
