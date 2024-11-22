import { useDrop } from 'react-dnd';

function DropZone({ hide, info, setInfo }) {
    const size = 15;
    const mult = 0.26;

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
        <div className='dropzone' style={{ width: size + "vw", height: size * mult + "vw", display: (hide ? "none" : "flex") }}>
            <div ref={dropRef} onDrop={handleDrop} >
                <h4 style={{ color: "" }}>{isActive ? "Release to drop" : "Drag a note here"}</h4>
            </div>
        </div>
    );
}

export default DropZone;