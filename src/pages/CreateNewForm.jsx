import { useState } from "react";
import axios from "axios";
import "./CreateNewForm.css"
import FormTextfields from "../components/FormTextfields";
import ColorSelector from "../components/ColorSelector.jsx";
import { useNavigate } from "react-router-dom";

function CreateNewForm() {
    const [count, setCount] = useState(1);
    const maxCount = 4;
    const [entry, setEntry] = useState({});
    const url = "https://kanban-board-rest-api.up.railway.app/posts";
    const [formChanged, setFormChanged] = useState(false);
    const navigate = useNavigate();

    function handleFormInput(e) {
        if (typeof (e.target.value) === "string" && e.target.value.length == 0) {
            delete entry[e.target.name];
        }
        else {
            entry[e.target.name] = e.target.value;
        }
        setEntry(entry);
        setFormChanged(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (entry.status === undefined) {
            entry.status = "backlog";
        }
        postData();
        setFormChanged(false);
    }

    function handleClear(e) {
        setFormChanged(false);
        setEntry({});
        setCount(1);
        document.querySelector('textarea[name="text1"]').setAttribute('style', '');
    }

    function postData() {
        if (typeof (entry) !== "object" || Object.keys(entry).length == 0) {
            return;
        }
        console.log("POST: ", entry);
        axios.post(url, entry)
            .then((result) => {
                console.log("POST", getStatusMeaning(result.status));
            })
            .catch((error) => {
                console.log("POST", getStatusMeaning(error.status));
                navigate(("/error/" + error.status), error.status);
            })
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                {/* Block for Title and Status */}
                <div className="form-block">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" onChange={handleFormInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select name="status" id="status" onChange={handleFormInput}>
                            <option value="backlog">Backlog</option>
                            <option value="todo">To Do</option>
                            <option value="doing">Doing</option>
                            <option value="test">Test</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <ColorSelector doChange={handleFormInput} />
                </div>

                {/* Block for FormTextfields */}
                <div className="form-block">
                    <FormTextfields count={count} doChange={handleFormInput} />
                    {count <= maxCount && (
                        <div className="form-group">
                            <button type="button" onClick={() => setCount(count + 1)}>
                                Add another text-field
                            </button>
                        </div>
                    )}
                </div>

                {/* Block for Submit and Reset Buttons */}
                <div className="form-block">
                    <div className="form-group">
                        <button type="reset" onClick={handleClear}>Clear</button>
                        <button type="submit" disabled={!formChanged}>Create</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default CreateNewForm;
