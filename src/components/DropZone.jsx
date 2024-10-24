import { useDrop } from 'react-dnd'

function DropZone({ visible, keyName }) {
    const angle = 0;
    const display = visible ? "flex" : "none";

    const [{ canDrop, isOver }, dropRef] = useDrop(() => {
        return {
            accept: "NOTE",
            dropRef: () => {
                return {
                    name: `${keyName} DropZone`,
                    keyName,
                };
            },
            collect: (monitor) => {
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                };
            },
        };
    }, [keyName])
    const isActive = canDrop && isOver

    return (
        <div style={{ width: "300px", height: "300px", display: display, justifyContent: "center", alignItems: "center" }}>
            <div ref={dropRef} style={{ width: "80%", height: "80%", backgroundColor: "rgba(0,0,0,.1)", rotate: angle + "deg", borderWidth: "3px", borderStyle: "dashed", borderColor: "rgba(0,0,0,.5)", borderRadius: "9%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h4 style={{ color: "rgba(0,0,0,.5)", rotate: -angle + "deg" }}>
                    {isActive ? "Release to drop" : "Drag a note here"}
                </h4>
            </div>
        </div>
    );
}

export default DropZone;