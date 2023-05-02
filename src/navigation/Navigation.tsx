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

// Navigation component that allows filtering of webinars
const Navigation: React.FC<Props> = ({ onFilterWebinars, onTagFilterWebinars, webinarData, tagFilteredWebinars }) => {
  // State to keep track of whether the "Prochainement" and "bootcamp" button is clicked
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isProchainementClicked, setIsProchainementClicked] = useState(false);
  const [isBootcampClicked, setIsBootcampClicked] = useState(false);
  const [isReplayClicked, setIsReplayClicked] = useState(false);
  const [activeButton, setActiveButton] = useState("Tous");

  // Function to handle "Prochainement" button click
  const handleProchainementClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsProchainementClicked(true);
    setIsBootcampClicked(false);
    setIsReplayClicked(false);
    setIsOpen(false);
    setSelectedOptions([])
    const now = new Date();
    const filteredWebinars = webinarData.filter(
      (webinar) => new Date(webinar.date) > now
    );
    onFilterWebinars(filteredWebinars);
    onTagFilterWebinars(filteredWebinars)
  };

  // Function to handle "Tous" button click
  const handleAllClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsProchainementClicked(false);
    setIsBootcampClicked(false);
    setIsReplayClicked(false);
    onFilterWebinars(webinarData);
    setIsOpen(false);
    setSelectedOptions([])

  };

  // Function to handle "Bootcamp" button click
  const handleBootcampClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsBootcampClicked(true);
    setIsProchainementClicked(false);
    setIsReplayClicked(false);
    const today = new Date();
    const filteredWebinars = webinarData.filter((webinar) => {
      const webinarDate = new Date(webinar.date);
      return webinar.tag === "bootcamp" && webinarDate < today;
    });
    onFilterWebinars(filteredWebinars);
  };

  // Function to handle "Bootcamp" button click
  const handleReplayClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsReplayClicked(true);
    setIsBootcampClicked(false);
    setIsProchainementClicked(false);
    setIsOpen(false);
    setSelectedOptions([])
    const today = new Date();
    const filteredWebinars = webinarData.filter((webinar) => {
      const webinarDate = new Date(webinar.date);
      return webinar.tag !== "bootcamp" && webinarDate < today;
    });
    onFilterWebinars(filteredWebinars);
    onTagFilterWebinars(filteredWebinars)
  };

  const filterByTag = (selectedOption: string) => {

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
            <button 
            type="button"
            className={activeButton === "Prochainement" ? "active" : ""}
            onClick={() => handleProchainementClick("Prochainement")}
            >
              Prochainement
            </button>
          </li>
          <li>
            <button 
            type="button"
            className={activeButton === "Tous les replays" ? "active" : ""}
            onClick={() => handleReplayClick("Tous les replays")}
            >Tous les replays</button>
          </li>
          <li>
          <button
              type="button"
              className={activeButton === "Bootcamp précédent" ? "active" : ""}
              onClick={() => handleBootcampClick("Bootcamp précédent")}
            >
              Bootcamp précédent
            </button>
          </li>
          <li>
            <button
              type="button"
              className={activeButton === "Tous" ? "active" : ""}
              onClick={() => handleAllClick("Tous")}
            >
              Tous
            </button>
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
              activeButton="eeee"
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