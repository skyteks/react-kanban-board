function NoteText({ entry }) {
    const count = Object.keys(entry).length;
    const textArray = [];
    for (let i = 0; i < count; i++) {
        const text = entry["text" + (i + 1)];
        if (text) {
            textArray.push(text);
        }
    }

    return (
        <div className="note-text">
            <ul >
                {textArray.map((text) => {
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