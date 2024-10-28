import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import pin from "../assets/pin.png"
import NoteText from "./NoteText";
import colorsData from "../data/colors.json";

function PinnedNote({ entry, handleDrag }) {
    const colors = colorsData.colors;
    const color = entry.color;//[color, setColor] = useState("white");

    const maxAngle = 10;
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        //const tmpColor = colors.at(Math.floor(Math.random() * colors.length));
        //setColor(tmpColor);
        const tmpAngle = Math.random() * maxAngle - maxAngle * 0.5;
        setAngle(tmpAngle);
    }, [])

    const [{ dragging }, dragRef] = useDrag(() => {
        return {
            type: "NOTE",
            item: entry,
            end(item, monitor) {
                const dropResult = monitor.getDropResult()
                const isDropAllowed = (item && dropResult) ? true : false;
                //&& (dropResult.allowedDropEffect === 'any' || dropResult.allowedDropEffect === dropResult.dropEffect);
            },
            collect: (monitor) => {
                const drag = monitor.isDragging();
                return {
                    opacity: drag,
                    dragging: drag,
                };
            },
        };
    }, [entry]);

    function handleDragLocal(e) {
        console.log(e._reactName, e);
        handleDrag(e._reactName, entry);
    }

    return (
        <div style={{ width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div style={{ opacity: (dragging ? 0.2 : 1), width: "80%", height: "80%", rotate: angle + "deg", display: "flex", alignItems: "center", flexDirection: "column", boxShadow: "rgba(0,0,0,0.5) -8px 20px 9px" }}>
                <img src={pin} style={{ opacity: (dragging ? 0.5 : 1), width: "50px", top: "-15px", alignSelf: "center", marginLeft: "25px", position: "absolute" }} />
                <div ref={dragRef} onDragStart={handleDragLocal} onDragEnd={handleDragLocal} style={{ width: "100%", height: "100%", backgroundColor: color }}>
                    <div style={{ height: "80%", margin: "15% 5% 5%" }}>
                        <NoteText entry={entry} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PinnedNote;