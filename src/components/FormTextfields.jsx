function FormTextfields({count, doChange}) {
    let temp = [];
    for (let i = 1; i < (count + 1); i++) {
        temp.push("text" + i)
    }

    return temp.map((name, index) => {
        return (
            <div key={index}>
                <label htmlFor={name}>Text {index + 1}: </label>
                <textarea type="text" name={name} onChange={doChange} rows="2" cols="50" />
                <br />
            </div>
        );
    });
}

export default FormTextfields;