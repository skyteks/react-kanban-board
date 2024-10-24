import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import pin from "../assets/pin.png"
import NoteText from "./NoteText";

function PinnedNote({ entry, isDragging, setIsDragging }) {
    const colors = ["rgb(255, 255, 113)", "rgb(204, 251, 135)", "rgb(168, 233, 251)", "rgb(255, 191, 252)"];
    const [color, setColor] = useState("white");

    const maxAngle = 10;
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const tmpColor = colors.at(Math.floor(Math.random() * colors.length));
        setColor(tmpColor);
        const tmpAngle = Math.random() * maxAngle - maxAngle * 0.5;
        setAngle(tmpAngle);
    }, [])

    const [{ opacity }, dragRef] = useDrag(() => {
        return {
            type: "NOTE",
            item: { entry },
            end(item, monitor) {
                const dropResult = monitor.getDropResult()
                if (item && dropResult) {
                    let alertMessage = ''
                    const isDropAllowed =
                        dropResult.allowedDropEffect === 'any' ||
                        dropResult.allowedDropEffect === dropResult.dropEffect
                    if (isDropAllowed) {
                        const isCopyAction = dropResult.dropEffect === 'copy'
                        const actionName = isCopyAction ? 'copied' : 'moved'
                        alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
                    } else {
                        alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
                    }
                    console.log(alertMessage)
                }
                console.log(item, dropResult)
            },
            collect: (monitor) => {
                const drag = monitor.isDragging();
                return {
                    opacity: drag
                };
            },
        };
    }, [entry]);

    return (
        <div style={{ width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div style={{ opacity: (opacity ? 0.5 : 1), width: "80%", height: "80%", rotate: angle + "deg", display: "flex", alignItems: "center", flexDirection: "column", boxShadow: "rgba(0,0,0,0.5) -8px 20px 9px" }}>
                <img src={pin} style={{ opacity: (opacity ? 1 : 1), width: "50px", top: "-15px", alignSelf: "center", marginLeft: "25px", position: "absolute" }} />
                <div ref={dragRef} style={{ width: "100%", height: "100%", backgroundColor: color }}>
                    <div style={{ height: "80%", margin: "15% 5% 5%" }}>
                        <NoteText entry={entry} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PinnedNote;