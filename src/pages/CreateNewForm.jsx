import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Form.css"
import FormTextfields from "../components/FormTextfields";
import ColorSelector from "../components/ColorSelector.jsx";
import PinnedNote from "../components/PinnedNote";
import colorsData from "../data/colors.json";
import { useThemeContext } from "../context/ThemeContextProvider.jsx";

function CreateNewForm() {
    const [count, setCount] = useState(1);
    const maxCount = 4;
    const [entry, setEntry] = useState({});
    const [formChanged, setFormChanged] = useState(false);
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const colors = colorsData.colors;
    const { postNote } = useAxiosAPI();

    function handleFormInput(e) {
        if (!e.target.name || e.target.value === undefined || entry[e.target.name] === e.target.value || (!entry[e.target.name] && !e.target.value)) {
            return;
        }
        const entryChanged = { ...entry };
        if (typeof (e.target.value) === "string" && e.target.value.length == 0) {
            delete entryChanged[e.target.name];
        }
        else {
            entryChanged[e.target.name] = e.target.value;
        }
        console.log(e.target.name + ": ", entry[e.target.name], " --> ", e.target.value);
        setEntry(entryChanged);
        setFormChanged(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (typeof (entry) !== "object" || Object.keys(entry).length == 0 || JSON.stringify(entry) === "{}" || Object.values(entry).some((value) => !value)) {
            return;
        }

        const requestBody = { data: entry };
        const token = getToken();

        const { success, statusCode } = await postNote(requestBody, token);
        if (success) {
        }
        else {
            navigate(("/error/" + statusCode));
        }
    }

    function handleClear(e) {
        setFormChanged(false);
        setEntry({});
        setCount(1);
        document.querySelector('textarea[name="text1"]').setAttribute("style", "");
    }

    return (
        <main className={theme ? "dark" : "light"}>
            <form onSubmit={handleSubmit} onClick={handleFormInput} onKeyUp={handleFormInput}>
                <div className="form-block">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" onChange={handleFormInput} required={true} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select name="status" id="status" onChange={handleFormInput} required={true}>
                            <option value="backlog" defaultChecked={true}>Backlog</option>
                            <option value="todo">To Do</option>
                            <option value="doing">Doing</option>
                            <option value="test">Test</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <ColorSelector doChange={handleFormInput} />
                </div>
                <div className="form-block">
                    <FormTextfields count={count} onChange={handleFormInput} />
                    {count <= maxCount && (
                        <div className="form-group">
                            <button type="button" onClick={() => setCount(count + 1)}>
                                Add another text-field
                            </button>
                        </div>
                    )}
                </div>
                <div className="form-block">
                    <div className="form-group">
                        <label>Preview:</label>
                        <div className="form-preview">
                            <div style={{ display: entry.color ? "block" : "none" }}>
                                <PinnedNote entry={{ ...entry, color: entry.color ? entry.color : colors[0] }} handleDrag={null} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Submit:</label>
                        <button type="reset" onClick={handleClear}>Clear</button>
                        <button type="submit" disabled={!formChanged}>Create</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default CreateNewForm;
