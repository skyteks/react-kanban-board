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
    }

    return (
        <div style={{ margin: "20px" }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" onChange={handleFormInput} />
                <br />
                <FormTextfields count={count} doChange={handleFormInput} />
                {
                    count <= maxCount &&
                    <button type="button" onClick={() => setCount(count + 1)}>Add another text-field</button>
                }
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateNewForm;
