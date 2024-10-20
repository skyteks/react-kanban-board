import { useState } from "react";
import FormTextfields from "../components/FormTextfields";

function CreateNewForm() {
    const [count, setCount] = useState(1);
    const maxCount = 4;

    const [obj, setObj] = useState({});

    function handleFormInput(e) {
        obj[e.target.name] = e.target.value;
        setObj(obj);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted: ", obj);
        // TODO: submit data
    }

    return (
        <div style={{ margin: "20px" }}>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateNewForm;
