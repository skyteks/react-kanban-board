import { useEffect, useState } from "react";
import pin from "../assets/pin.png"
import NoteText from "./NoteText";

function PinnedNote({ noteTextArray }) {

    const colors = ["rgb(255, 255, 113)", "rgb(204, 251, 135)", "rgb(168, 233, 251)", "rgb(255, 191, 252)"];
    const [color, setColor] = useState("white");

    const maxAngle = 15;
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        setColor(colors.at(Math.floor(Math.random() * colors.length)));
        setAngle(Math.random() * maxAngle - maxAngle * 0.5);
    }, [])

    return (
        <div style={{ width: "400px", height: "400px", backgroundColor: "rgba(0,0,0,0)", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div style={{ width: "80%", height: "80%", backgroundColor: "rgba(0,0,0,0)", rotate: angle + "deg", display: "flex", alignItems: "center", flexDirection: "column", boxShadow: "rgba(0,0,0,0.5) -8px 20px 9px" }}>
                <img src={pin} style={{ width: "50px", height: "50px", alignSelf: "center", marginLeft: "25px", position: "absolute" }} />
                <div style={{ width: "100%", height: "100%", backgroundColor: color }}>
                    <div style={{ height: "80%", margin: "15% 5% 5%", backgroundColor: "rgba(0,0,0,0)", }}>
                        <NoteText noteTextArray={(noteTextArray === undefined ? [] : noteTextArray)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PinnedNote;