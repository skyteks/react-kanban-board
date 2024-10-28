import React, { useState } from 'react';
import "../pages/CreateNewForm.css";
import colorsData from "../data/colors.json";

function ColorSelector({doChange}) {
    const colors = colorsData.colors;
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    function handleColorSelect(e){
        setSelectedColor(e.target.value);
        doChange(e);
    };

    return (
        <div className='form-group'>
            <label>Note Color:</label>
            <div className={`color-selection`} >
                {colors.map((color, index) => (
                    <label key={index} className={`color-option ${selectedColor === color ? 'highlight' : ''}`}>
                        <input type="radio" name="color" value={color} onChange={handleColorSelect} checked={selectedColor === color} />
                        <div className="color-preview" style={{ backgroundColor: color }} />
                        <span>{color}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default ColorSelector;
