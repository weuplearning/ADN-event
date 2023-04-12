import React, { useState } from "react";
import "./navigation.css";

type Props = {
  onFilterWebinars: (filteredWebinars: any[]) => void;
  webinarData: any[];
};

const Navigation: React.FC<Props> = ({ onFilterWebinars, webinarData }) => {
  const [isProchainementClicked, setIsProchainementClicked] = useState(false);

  const handleProchainementClick = () => {
    setIsProchainementClicked(true);
    const now = new Date();
    const filteredWebinars = webinarData.filter(
      (webinar) => new Date(webinar.date) > now
    );
    console.log(filteredWebinars)
    onFilterWebinars(filteredWebinars);
  };

  const handleAllClick = () => {
    setIsProchainementClicked(false);
    onFilterWebinars(webinarData);
  };

  return (
    <nav className="navigation">
      <div className="navigation__left">
        <ul>
          <li>
            <button type="button" onClick={handleProchainementClick}>Prochainement</button>
          </li>
          <li>
            <button type="button">Tous les replays</button>
          </li>
          <li>
            <button type="button">Bootcamp précédent</button>
          </li>
          <li>
            <button onClick={handleAllClick} type="button">Tous</button>
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
