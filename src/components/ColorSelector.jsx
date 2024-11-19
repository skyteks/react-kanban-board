import React, { useState } from "react";
import jsonData from "../data/data.json";

function ColorSelector({ doChange }) {
    const { colors } = jsonData;
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    function handleColorSelect(e) {
        setSelectedColor(e.target.value);
        doChange(e);
    };

    return (
        <div className="form-group">
            <label>Note Color:</label>
            <div className={"color-selection"} >
                {colors.map((color, index) => (
                    <label key={index} className={`color-option ${selectedColor === color ? "highlight" : ""}`}>
                        <input type="radio" name="color" value={color} onChange={handleColorSelect} required />
                        <div className="color-preview" style={{ backgroundColor: color }} />
                        <span>{color}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default ColorSelector;
