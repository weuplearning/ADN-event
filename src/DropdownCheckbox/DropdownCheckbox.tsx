import React, { useState } from 'react';
import './dropdowncheckbox.css';

type DropdownOption = {
    id: string;
    label: string;
  };
  
  type Props = {
    title: string;
    options: DropdownOption[];
    onFilter: (selectedOptions: string[]) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedOption: (newSelectedOptions: string[]) => void;
    setSelectedOptions : string[];
  };

  const DropdownCheckbox: React.FC<Props> = ({ title, options, onFilter, isOpen, setIsOpen, selectedOptions, setSelectedOptions }) => {
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

  const handleOptionChange = (optionId: string, isChecked: boolean) => {
    let newSelectedOptions;
    if (isChecked) {
      newSelectedOptions = [...selectedOptions, optionId];
    } else {
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    }
    setSelectedOptions(newSelectedOptions);
    onFilter(newSelectedOptions);
  };

  return (
    <div className="dropdown-checkbox">
      <button onClick={toggleDropdown} className="dropdown-checkbox__toggle">
        {title}
      </button>
      {isOpen && (
        <ul className="dropdown-checkbox__menu">
          {options.map((option) => (
            <li key={option.id}>
              <label>
                <input
                  type="checkbox"
                  name={title}
                  checked={selectedOptions.includes(option.id)}
                  onChange={(event) => handleOptionChange(option.id, event.target.checked)}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownCheckbox;
