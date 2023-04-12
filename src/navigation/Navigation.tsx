import React, { useState } from "react";
import "./navigation.css";
import { Webinar } from "../type";

type Props = {
  onFilterWebinars: (filteredWebinars: any[]) => void;
  webinarData: Webinar[];
};

// Navigation component that allows filtering of webinars
const Navigation: React.FC<Props> = ({ onFilterWebinars, webinarData }) => {
  // State to keep track of whether the "Prochainement" button is clicked
  const [isProchainementClicked, setIsProchainementClicked] = useState(false);

  // Function to handle "Prochainement" button click
  const handleProchainementClick = () => {
    setIsProchainementClicked(true);
    const now = new Date();
    const filteredWebinars = webinarData.filter(
      (webinar) => new Date(webinar.date) > now
    );
    onFilterWebinars(filteredWebinars);
  };

  // Function to handle "Tous" button click
  const handleAllClick = () => {
    setIsProchainementClicked(false);
    onFilterWebinars(webinarData);
  };

  // Render the navigation component with buttons for filtering webinars
  return (
    <nav className="navigation">
      <div className="navigation__left">
        <ul>
          <li>
            <button type="button" onClick={handleProchainementClick}>
              Prochainement
            </button>
          </li>
          <li>
            <button type="button">Tous les replays</button>
          </li>
          <li>
            <button type="button">Bootcamp précédent</button>
          </li>
          <li>
            <button onClick={handleAllClick} type="button">
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
            <a href="/">Thématique | Toutes</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
