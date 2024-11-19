import { useDrop } from 'react-dnd'

function DropZone({ visible, info, setInfo }) {
    const size = 15;
    const multi = 0.3;

    const [{ canDrop, isOver }, dropRef] = useDrop(() => {
        return {
            accept: "NOTE",
            dropRef: () => {
                return {
                    name: "DropZone",
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
    }, [info])
    const isActive = canDrop && isOver

    function handleDrop(e) {
        setInfo(info);
    }
    
    return (
        <div style={{ width: size + "vw", height: (size * multi) + "vw", display: (visible ? "flex" : "none"), justifyContent: "center", alignItems: "center" }}>
            <div ref={dropRef} onDrop={handleDrop} style={{ width: "85%", height: "85%", backgroundColor: "rgba(0,0,0,.1)", borderWidth: "3px", borderStyle: "dashed", borderColor: "rgba(0,0,0,.5)", borderRadius: "1vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h4 style={{ color: "rgba(0,0,0,.5)" }}>
                    {isActive ? "Release to drop" : "Drag a note here"}
                </h4>
            </div>
        </div>
    );
}

export default DropZone;