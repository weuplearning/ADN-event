import React, { useState, useEffect} from "react";
import Navigation from "./navigation/Navigation";
import ThumbnailGallery from "./thumbnailGallery/ThumbnailGallery";
import webinarData from "../data/webinarData.json";
import Banner from "./banner/Banner";
import { Webinar } from "./type";
import "./App.css";

//replace all webinarData by webinars // don't forget to update the props type

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

  useEffect(() => {
    //for development and go through CORS limitation, use cors-anywhere - need to connect to the url and request an acces to the server
    // fetch("https://cors-anywhere.herokuapp.com/https://amazon.koa.qualif.dev/media/microsites/amazon/react_event/data.json")
    fetch("https://amazon.koa.qualif.dev/media/microsites/amazon/react_event/data.json")
      .then(response => response.json())
      .then(data => {
        setWebinars(data);
        setTagFilteredWebinars(data);
        console.log("***************************")
        console.log(data)
      })
      .catch(error => console.error("Error:", error));
  }, []);


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
