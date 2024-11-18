import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import pin from "../assets/pin.png"
import NoteText from "./NoteText";

function PinnedNote({ entry, handleDrag }) {
    const color = entry.color;
    const maxAngle = 10;
    const [angle, setAngle] = useState(0);
    const size = 15;

    useEffect(() => {
        const tmpAngle = Math.random() * maxAngle - maxAngle * 0.5;
        setAngle(tmpAngle);
    }, [entry])

    const [{ dragging }, dragRef] = !handleDrag ? [{ dragging: false }, () => { }] : useDrag(() => {
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
        if (!handleDrag) {
            return;
        }
        handleDrag(e._reactName, entry);
    }

    return (
        <div style={{ width: size + "vw", height: size + "vw", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div style={{ opacity: (dragging ? 0.2 : 1), width: "85%", height: "85%", rotate: angle + "deg", display: "flex", alignItems: "center", flexDirection: "column", boxShadow: "rgba(0,0,0,0.5) -8px 20px 9px" }}>
                <img src={pin} style={{ opacity: (dragging ? 0.5 : 1), width: "30%", maxWidth: "55px", bottom: "85%", alignSelf: "center", marginLeft: "10%", position: "absolute", pointerEvents: "none", userSelect: "none" }} />
                <div ref={dragRef} onDragStart={handleDragLocal} onDragEnd={handleDragLocal} style={{ width: "100%", height: "100%", backgroundColor: color, transitionDuration: "unset" }}>
                    <div style={{ height: "80%", margin: "15% 5% 5%" }}>
                        <NoteText entry={entry} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PinnedNote;