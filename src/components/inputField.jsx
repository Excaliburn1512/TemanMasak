import React from 'react';
import '../styles/input_field.css';

const InputField = ({
    label = 'Input',
    type = 'text',
    placeholder = 'Masukkan data',
    value = '',
    onChange = () => {},

    // Versi lama
    icon = null,
    rightElement = null,

    // Versi yang kamu pakai di LoginForm/RegisterForm
    prefixIcon = null,
    suffixWidget = null,
}) => {
    const finalPrefixIcon = prefixIcon || icon;
    const finalRightElement = suffixWidget || rightElement;

    return (
        <div className="input-group">
            <label className="input-label">{label}</label>

            <div className="input-wrapper">
                {finalPrefixIcon && (
                    <span className="input-icon">
                        {finalPrefixIcon}
                    </span>
                )}

                <input
                    type={type}
                    className="input-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {finalRightElement && (
                    <span className="input-icon-right">
                        {finalRightElement}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;