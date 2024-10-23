import { useState } from "react";
import axios from "axios";
import "./CreateNewForm.css"
import FormTextfields from "../components/FormTextfields";

function CreateNewForm() {
    const [count, setCount] = useState(1);
    const maxCount = 4;
    const [obj, setObj] = useState({});
    const url = "https://kanban-board-rest-api.up.railway.app/posts";
    const [formChanged, setFormChanged] = useState(false);

    function handleFormInput(e) {
        obj[e.target.name] = e.target.value;
        setObj(obj);
        setFormChanged(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted: ", obj);
        postData();
        setFormChanged(false);
    }

    function clear() {
        setFormChanged(false);
        setObj({});
    }

    function postData() {
        axios.post(url, obj)
            .then((result) => {
                console.log("success", result);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
            });
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                {/* Block for Title and Status */}
                <div className="form-block">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" onChange={handleFormInput} />
                        <br />
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
                        <br />
                    </div>
                </div>

                {/* Block for FormTextfields */}
                <div className="form-block">
                    <FormTextfields count={count} doChange={handleFormInput} />
                    {count <= maxCount && (
                        <div className="form-group">
                            <button type="button" onClick={() => setCount(count + 1)}>
                                Add another text-field
                            </button>
                            <br />
                        </div>
                    )}
                </div>

                {/* Block for Submit and Reset Buttons */}
                <div className="form-block">
                    <div className="form-group">
                        <button type="reset" onClick={clear}>Clear</button>
                        <br />
                        <button type="submit" disabled={!formChanged}>Create</button>
                        <br />
                    </div>
                </div>
            </form>
        </main>
    );
}

export default CreateNewForm;
