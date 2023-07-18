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
    selectedOptions: string[]; 
    setSelectedOptions: (newSelectedOptions: string[]) => void; 
  };
  

  const DropdownCheckbox: React.FC<Props> = ({ title, options, onFilter, isOpen, setIsOpen, selectedOptions, setSelectedOptions }) => {
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };


  return (
    <>
    <div className="dropdown-checkbox">
      <button onClick={toggleDropdown} className="dropdown-checkbox__toggle">
        {title}
      </button>
    </div>

    </>
  );
  };
  

export default DropdownCheckbox;
