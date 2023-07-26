import React, { useState, useEffect} from "react";
import Navigation from "./navigation/Navigation";
import ThumbnailGallery from "./thumbnailGallery/ThumbnailGallery";
import Banner from "./banner/Banner";
import { Webinar } from "./type";
import "./App.css";

function App() {
  // State to keep track of the list of webinars
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [webinarData, setWebinarData] = useState<Webinar[]>([]);
  const [tagFilteredWebinars, setTagFilteredWebinars] = useState<Webinar[]>([]);

  // Callback function to handle changes to the list of webinars
  const handleFilterWebinars = (filteredWebinars: Webinar[]) => {
    setWebinars(filteredWebinars);
  };

  const handleTagFilterWebinars = (filteredWebinars: Webinar[]) => {
    setTagFilteredWebinars(filteredWebinars);
  };

  const baseUrl = window.location.origin

  useEffect(() => {
    //for development and go through CORS limitation, use cors-anywhere - need to connect to the url and request an acces to the server
    // fetch("https://cors-anywhere.herokuapp.com/https://amazon.koa.qualif.dev/media/microsites/amazon/react_event/data.json")
    fetch(baseUrl+"/media/microsites/amazon/react_event/data.json")
      .then(response => response.json())
      .then(data => {
        setWebinars(data);
        setWebinarData(data);
        setTagFilteredWebinars(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  console.log(webinars)
  console.log(webinarData)
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
      <ThumbnailGallery webinars={webinars} />
    </div>
  );
}

export default App;
