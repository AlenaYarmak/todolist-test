import { useState } from 'react';
import checkIcon from '../assets/icon-check.svg';

interface CheckboxProps {
    checked: boolean;
    onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onClick }) => {
    return (
        <div 
            className={`checkbox ${checked ? 'checkbox--active' : ''} `}
            onClick={onClick}>
            {checked && (
                <img
                    className='checkbox-icon'
                    src={checkIcon}/>
            )}
        </div>
    )
}

export default Checkbox;