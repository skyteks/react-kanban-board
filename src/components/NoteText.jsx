import pin from "../assets/pin.png"

function NoteText({ entry }) {

    let temp = [];
    for (const [key, value] of Object.entries(entry)) {
        if (key.toString().includes("text")) {
            temp.push(value);
        }
    }

    return (
        <div className="note-text">
            <ul >
                {temp.map((text) => {
                    return (
                        <li key={text}>
                            <p>{text}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default NoteText;