import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import ThumbnailGallery from "./ThumbnailGallery";
import webinarData from "../data/webinarData.json";
import Banner from "./Banner";

type Webinar = {
  title: string;
  date: string;
  description: string;
  speaker: {
    name: string;
    position: string;
  };
  tag: string;
  image: string;
};

function App() {
  const [webinars, setWebinars] = useState<Webinar[]>(webinarData);

  const handleFilterWebinars = (filteredWebinars: Webinar[]) => {
    setWebinars(filteredWebinars);
  };

  return (
    <div>
      <Banner webinarData={webinarData} />
      <Navigation onFilterWebinars={handleFilterWebinars} webinarData={webinarData} />
      <ThumbnailGallery webinarData={webinarData} webinars={webinars} isProchainementClicked={false} />
    </div>
  );
}

export default App;
