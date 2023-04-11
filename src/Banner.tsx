import React from 'react';

import './banner.css';

function Banner() {
  return (
    <div className="container">
      <div className="left-block">
      <p>Ne loupez pas le prochain webinaire</p>
        <h2>Nom du webinaire</h2>
        <span className="webinaire_tag">Tag thématique</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ipsa, ex et aperiam sed vel unde fugit rerum, minima facere facilis cupiditate minus optio aliquid voluptate reprehenderit tempora incidunt sit.</p>
        <p>date</p>
      </div>
      <div className="right-block">
        <img src="https://via.placeholder.com/150" alt="Placeholder" />
        <button>Je m'inscris au webinaire</button>
      </div>
    </div>
  );
}

export default Banner;