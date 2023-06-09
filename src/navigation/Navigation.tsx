import React, { useState } from "react";
import "./navigation.css";
import { Webinar } from "../type";
import DropdownCheckbox from '../DropdownCheckbox/DropdownCheckbox';

type Props = {
  onFilterWebinars: (filteredWebinars: any[]) => void;
  onTagFilterWebinars: (filteredWebinars: any[]) => void;
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
    { id: 'data_analysis', label: 'Data Analysis' },
    { id: 'user_experience', label: 'User Experience' },
    { id: 'digital_marketing', label: 'Digital Marketing' },
    { id: 'java_programming', label: 'Java Programming' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'data_science', label: 'Data Science' },
    { id: 'node_js', label: 'Node.js' },
  ];

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
          <li>
            <span className="navigation__filter">Filtres</span>
          </li>
          <li className="navigation__dropdowncheckbox">
            <DropdownCheckbox
              title="Thématique"
              options={tagOptions}
              onFilter={filterByTag}
              // activeButton="eeee"
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