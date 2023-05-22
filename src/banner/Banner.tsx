import React, { useState, useEffect } from "react";
import moment from "moment";
import { Webinar } from "../type";
import "./banner.css";

type Props = {
  webinarData: Webinar[];
};

// Banner component that displays information about the next webinar
const Banner: React.FC<Props> = ({ webinarData }) => {
  // State for the list of webinars and the next webinar
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [nextWebinar, setNextWebinar] = useState<Webinar | null>(null);

  // Load webinar data on component mount
  useEffect(() => {
    setWebinars(webinarData);
  }, [webinarData]);

  // Find the next webinar and set it to state whenever the webinars state changes
  useEffect(() => {
    const sortedWebinars = webinarData.sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
    const now = moment();
    const next = sortedWebinars.find((webinar) => moment(webinar.date).isAfter(now));
    const last = sortedWebinars[sortedWebinars.length - 1];
    setNextWebinar(next || last);
  }, [webinars]);

  // Return null if there's no next webinar to display
  if (!nextWebinar) {
    return null;
  }

  const { title, tag, description, date, image, url_enroll } = nextWebinar;

  const handleEnrollClick = () => {
    window.location.href = url_enroll;
  };

  // Render the banner with the next webinar's details
  return (
    <div className="banner-container">
      <div className="left-block">
        <p className="left-block-text">Ne loupez pas le prochain webinaire</p>
        <h2 className="left-block-title">{title}</h2>
        <p className="webinaire-tag">{tag}</p>
        <p className="left-block-text">{description}</p>
        <p className="webinaire-date">{moment(date).format("dddd Do MMMM YYYY, h:mm a")}</p>
        <button className="webinaire-button" onClick={handleEnrollClick}>
          Je m'inscris au webinaire
        </button>
      </div>
      <div className="right-block">
        <img className="webinaire-image" src={image} alt={title} />
      </div>
    </div>
  );
};

export default Banner;
