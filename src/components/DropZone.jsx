import { useEffect, useState } from "react";

function DropZone({ visible }) {
    const angle = 0;
    const display = visible ? "flex" : "none";

    return (
        <div style={{ width: "300px", height: "300px", display: display, justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "80%", height: "80%", backgroundColor: "rgba(0,0,0,.1)", rotate: angle + "deg", borderWidth: "3px", borderStyle: "dashed", borderColor: "rgba(0,0,0,.5)", borderRadius: "9%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h4 style={{ color: "rgba(0,0,0,.5)", rotate: -angle + "deg" }}>Drop Here</h4>
            </div>
        </div>
    );
}

export default DropZone;