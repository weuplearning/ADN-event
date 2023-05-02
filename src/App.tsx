import React, { useState, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import ThumbnailGallery from "./thumbnailGallery/ThumbnailGallery";
import webinarData from "../data/webinarData.json";
import Banner from "./banner/Banner";
import { Webinar } from "./type";
import "./App.css";

function App() {
  // State to keep track of the list of webinars
  const [webinars, setWebinars] = useState<Webinar[]>(webinarData);
  const [tagFilteredWebinars, setTagFilteredWebinars] = useState<Webinar[]>(webinarData);

  // Callback function to handle changes to the list of webinars
  const handleFilterWebinars = (filteredWebinars: Webinar[]) => {
    setWebinars(filteredWebinars);
  };

  const handleTagFilterWebinars = (filteredWebinars: Webinar[]) => {
    setTagFilteredWebinars(filteredWebinars);
  };

  return (
    <div>
      {/* Banner component that displays information about the next webinar */}
      <Banner webinarData={webinarData} />

      {/* Navigation component that allows filtering of webinars */}
      <Navigation 
        onFilterWebinars={handleFilterWebinars}
        onTagFilterWebinars={handleTagFilterWebinars} 
        webinarData={webinarData} 
        tagFilteredWebinars={tagFilteredWebinars} 
      />
      {/* Thumbnail gallery component that displays webinars */}
      <ThumbnailGallery webinars={webinars} webinarData={webinarData} />
    </div>
  );
}

export default App;
