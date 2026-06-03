import React from 'react';
import '../styles/input_field.css'; 

const InputField = ({ 
    label = 'Input', 
    type = 'text', 
    placeholder = 'Masukkan data', 
    value = '', 
    onChange = () => {}, 
    icon = null,
    rightElement = null 
}) => {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            <div className="input-wrapper">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    type={type}
                    className="input-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {/* Menampilkan elemen kanan (tombol mata) jika ada */}
                {rightElement && <span className="input-icon-right">{rightElement}</span>}
            </div>
        </div>
    );
};

export default InputField;