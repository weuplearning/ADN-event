import React, { useState } from "react";
import "./navigation.css";
import { Webinar } from "../type";
import DropdownCheckbox from '../DropdownCheckbox/DropdownCheckbox';

type Props = {
  onFilterWebinars: (filteredWebinars: any[]) => void;
  onTagFilterWebinars: (filteredWebinars: any[]) => void;
  onFilter: (selectedOptions: string[]) => void;
  webinarData: Webinar[];
  tagFilteredWebinars: Webinar[];
};

type ButtonProps = {
  buttonType: string;
  activeButton: string;
  onClick: () => void;
};

const FilterButton: React.FC<ButtonProps> = ({ buttonType, activeButton, onClick }) => {
  return (
    <button
      type="button"
      className={activeButton === buttonType ? "active" : ""}
      onClick={onClick}
    >
      {buttonType}
    </button>
  );
};

// Navigation component that allows filtering of webinars
const Navigation: React.FC<Props> = ({ onFilterWebinars, onTagFilterWebinars, webinarData, tagFilteredWebinars }) => {
  // State to keep track of whether the "Prochainement" and "bootcamp" button is clicked
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isProchainementClicked, setIsProchainementClicked] = useState(false);
  const [isBootcampClicked, setIsBootcampClicked] = useState(false);
  const [isReplayClicked, setIsReplayClicked] = useState(false);
  const [activeButton, setActiveButton] = useState("Tous");

  // Function to handle button click
  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    setIsProchainementClicked(buttonType === "Prochainement");
    setIsBootcampClicked(buttonType === "Bootcamp précédent");
    setIsReplayClicked(buttonType === "Tous les replays");
  
    let filteredWebinars: Webinar[] = [];
  
    if (buttonType === "Prochainement") {
      const now = new Date();
      filteredWebinars = webinarData.filter((webinar) => new Date(webinar.date) > now);
    } else if (buttonType === "Tous les replays") {
      const today = new Date();
      filteredWebinars = webinarData.filter((webinar) => new Date(webinar.date) < today && webinar.tag !== "bootcamp");
    } else if (buttonType === "Bootcamp précédent") {
      const today = new Date();
      filteredWebinars = webinarData.filter((webinar) => new Date(webinar.date) < today && webinar.tag === "bootcamp");
    } else {
      filteredWebinars = webinarData;
    }
  
    setIsOpen(false);
    setSelectedOptions([]);
    onFilterWebinars(filteredWebinars);
    onTagFilterWebinars(filteredWebinars);
  };

  const filterByTag = (selectedOption: string[]) => {

    if (isReplayClicked || isProchainementClicked) {
      webinarData = tagFilteredWebinars
    }
    const filteredWebinars = webinarData.filter((webinar) =>{
      let webinarTag = webinar.tag.replace(" ", "_").replace(".", "_").toLowerCase()
      return selectedOption.includes(webinarTag)
    } );
    onFilterWebinars(filteredWebinars);
  };
  
  const tagOptions = [
    { id: 'strategy', label: 'Stratégie' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'tech', label: 'Tech' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'sales', label: 'Ventes' },
    { id: 'operations', label: 'Gestion des opérations' },
    { id: 'corporate', label: 'Gestion des entreprises' },
  ];

  const handleOptionChange = (optionId: string, isChecked: boolean) => {
    let newSelectedOptions;
    if (isChecked) {
      newSelectedOptions = [...selectedOptions, optionId];
    } else {
      newSelectedOptions = selectedOptions.filter((id:string) => id !== optionId);
    }
    setSelectedOptions(newSelectedOptions);
    filterByTag(newSelectedOptions);
  };

  // Render the navigation component with buttons for filtering webinars
  return (
    <nav className="navigation">
      <div className="navigation__left">
        <ul>
          <li>
          <FilterButton
            buttonType="Prochainement"
            activeButton={activeButton}
            onClick={() => handleButtonClick("Prochainement")}
          />
          </li>
          <li>
          <FilterButton
            buttonType="Tous les replays"
            activeButton={activeButton}
            onClick={() => handleButtonClick("Tous les replays")}
          />  
          </li>
          <li>
          <FilterButton
            buttonType="Bootcamp précédent"
            activeButton={activeButton}
            onClick={() => handleButtonClick("Bootcamp précédent")}
          />  
          </li>
          <li>
          <FilterButton
            buttonType="Tous"
            activeButton={activeButton}
            onClick={() => handleButtonClick("Tous")}
          />  
          </li>
        </ul>
      </div>
      {
        !isBootcampClicked &&
      <div className="navigation__right">
        <ul>
          {isOpen && (
          <ul className="dropdown-checkbox__menu">
            {tagOptions.map((option) => {
              return (
                <li 
                  key={option.id}
                  className={`dropdown-checkbox__menu_li ${selectedOptions.includes(option.id) ? 'input_checked' : ''}`}
                  >
                  <label>
                    <input
                      type="checkbox"
                      name={option.label}
                      checked={selectedOptions.includes(option.id)}
                      onChange={(event) => handleOptionChange(option.id, event.target.checked)}
                    />
                    {option.label}
                  </label>
                </li>
              );
            })}
          </ul>
          )}
          <li className="navigation__dropdowncheckbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146 1.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10ZM11.207 2.5 3.5 10.207V10.5h.293L11.5 2.793V2.5ZM12 2.5v.293l-1 1L10.5 4 12 2.5ZM2 13.5a.5.5 0 0 0 .5-.5v-.628l.549-.317L2.5 13v.5Z"/>
            </svg>

            <DropdownCheckbox
              title="Filtres"
              options={tagOptions}
              onFilter={filterByTag}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </li>
        </ul>
      </div>
      }

    </nav>
  );
};

export default Navigation;