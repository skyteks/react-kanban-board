import pin from "../assets/pin.png"

function NoteText({ noteTextArray }) {

    return (
        <div >
            <ul >
                {noteTextArray.map((text) => {
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