// src/ui/button/Button.tsx
import React from 'react';
import './Button.module.css';

interface ButtonProps {
    onClick: () => void;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => (
    <button className="button" onClick={onClick}>
        {label}
    </button>
);

export default Button;
