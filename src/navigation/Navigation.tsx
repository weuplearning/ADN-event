import React, { useState } from "react";
import "./navigation.css";
import { Webinar } from "../type";
import DropdownCheckbox from '../DropdownCheckbox/DropdownCheckbox';

type Props = {
  onFilterWebinars: (filteredWebinars: any[]) => void;
  webinarData: Webinar[];
};

// Navigation component that allows filtering of webinars
const Navigation: React.FC<Props> = ({ onFilterWebinars, webinarData }) => {
  // State to keep track of whether the "Prochainement" and "bootcamp" button is clicked
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
    const now = new Date();
    const filteredWebinars = webinarData.filter(
      (webinar) => new Date(webinar.date) > now
    );
    onFilterWebinars(filteredWebinars);
  };

  // Function to handle "Tous" button click
  const handleAllClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsProchainementClicked(false);
    setIsBootcampClicked(false);
    setIsReplayClicked(false);
    onFilterWebinars(webinarData);
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
    const today = new Date();
    const filteredWebinars = webinarData.filter((webinar) => {
      const webinarDate = new Date(webinar.date);
      return webinar.tag !== "bootcamp" && webinarDate < today;
    });
    onFilterWebinars(filteredWebinars);
  };

  const filterByDate = (selectedOptions: string) => {
    const today = new Date();
    const filteredWebinars =
        selectedOptions.length > 0 && !selectedOptions.includes('all')
        ? webinarData.filter((webinar) => new Date(webinar.date) < today)
        : webinarData;
    onFilterWebinars(filteredWebinars);
  };

  const filterByTag = (selectedOption: string) => {
    const filteredWebinars = webinarData.filter((webinar) =>{
      let webinarTag = webinar.tag.replace(" ", "_").replace(".", "_").toLowerCase()
      return selectedOption.includes(webinarTag)
    } );
    onFilterWebinars(filteredWebinars);
  };
  
  // const dateOptions = [
  //   { id: 'previously', label: 'Précédemment' },
  //   { id: 'all', label: 'Tous' },
  // ];

  const tagOptions = [
    { id: 'data_analysis', label: 'Data Analysis' },
    { id: 'user_experience', label: 'User Experience' },
    { id: 'digital_marketing', label: 'Digital Marketing' },
    { id: 'java_programming', label: 'Java Programming' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'data_science', label: 'Data Science' },
    { id: 'node_js', label: 'Node.js' },
    { id: 'bootcamp', label: 'Bootcamp' },
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
      <div className="navigation__right">
        <ul>
          <li>
            <span className="filter">Filtres</span>
          </li>
          <li>
            {/* <DropdownCheckbox
              title="Dates"
              options={dateOptions}
              onFilter={filterByDate}
            /> */}
            <DropdownCheckbox
              title="Tags"
              options={tagOptions}
              onFilter={filterByTag}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;