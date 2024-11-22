import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import pin from "../assets/pin.png";
import NoteText from "./NoteText";
import "./PinnedNote.css";

function PinnedNote({ hide, entry, handleDrag }) {
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
        <div className="pinned-note" style={{ width: size + "vw", display: (hide ? "none" : "flex") }}>
            <div style={{ opacity: (dragging ? 0.2 : 1), rotate: angle + "deg", }}>
                <img src={pin} style={{ opacity: (dragging ? 0.5 : 1) }} />
                <div ref={dragRef} onDragStart={handleDragLocal} onDragEnd={handleDragLocal} style={{ backgroundColor: color }}>
                    <NoteText entry={entry} />
                </div>
            </div>
        </div>
    );
}

export default PinnedNote;