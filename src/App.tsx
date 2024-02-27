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
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/media/microsites/amazon/react_event/data.json?${Date.now()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Sort webinars by date, most recent first
        const sortedWebinars = data.sort((a: Webinar, b: Webinar) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA; // For descending order
        });
        setWebinars(sortedWebinars);
        setWebinarData(sortedWebinars);
        setTagFilteredWebinars(sortedWebinars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
