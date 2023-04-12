import React, { useState, useEffect } from "react";
import moment from "moment";
import "./thumbnail-gallery.css";

type Props = {
  webinars: Webinar[];
  isProchainementClicked: boolean;
};

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

const ThumbnailGallery: React.FC<Props> = ({ webinars, isProchainementClicked }) => {
  const [filteredWebinars, setFilteredWebinars] = useState<Webinar[]>([]);

  useEffect(() => {
    const now = moment();
    const filtered = isProchainementClicked ? webinars.filter(webinar => moment(webinar.date).isAfter(now)) : webinars;
    setFilteredWebinars(filtered);
  }, [isProchainementClicked, webinars]);

  return (
    <div className="thumbnail-gallery">
      {filteredWebinars.map((webinar) => (
        <div className="thumbnail" key={webinar.title}>
          <img className="thumbnail__image" src={webinar.image} alt={webinar.title} />
          <div className="thumbnail__content">
            <h3>{webinar.title}</h3>
            <span className="thumbnail__tag">{webinar.tag}</span>
            <p>{webinar.description}</p>
            <p className="thumbnail__date">{moment(webinar.date).format("dddd Do MMMM YYYY, h:mm a")}</p>
            <button className="thumbnail__button">Je m'inscris</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailGallery;
