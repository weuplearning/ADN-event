import React, { useState, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import ThumbnailGallery from "./thumbnailGallery/ThumbnailGallery";
import webinarData from "../data/webinarData.json";
import Banner from "./banner/Banner";
import { Webinar } from "./type";

function App() {
  // State to keep track of the list of webinars
  const [webinars, setWebinars] = useState<Webinar[]>(webinarData);

  // Callback function to handle changes to the list of webinars
  const handleFilterWebinars = (filteredWebinars: Webinar[]) => {
    setWebinars(filteredWebinars);
  };

  return (
    <div>
      {/* Banner component that displays information about the next webinar */}
      <Banner webinarData={webinarData} />

      {/* Navigation component that allows filtering of webinars */}
      <Navigation onFilterWebinars={handleFilterWebinars} webinarData={webinarData} />

      {/* Thumbnail gallery component that displays webinars */}
      <ThumbnailGallery webinars={webinars} isProchainementClicked={false} webinarData={webinarData} />
    </div>
  );
}

export default App;
