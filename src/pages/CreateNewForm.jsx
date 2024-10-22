import { useState } from "react";
import axios from "axios";
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
        clear();
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
        <main >
            <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" onChange={handleFormInput} />
                <br />
                <FormTextfields count={count} doChange={handleFormInput} />
                {count <= maxCount && <button type="button" onClick={() => setCount(count + 1)}>Add another text-field</button>}
                <br />
                <label htmlFor="status">Status</label>
                <select name="status" id="status" onChange={handleFormInput} >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="test">Test</option>
                    <option value="done">Done</option>
                </select>
                <br />
                <button type="reset" onClick={clear}>Clear</button>
                <button type="submit" disabled={formChanged}>Create</button>
            </form>
        </main>
    );
}

export default CreateNewForm;
