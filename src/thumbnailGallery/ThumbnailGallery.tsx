import React from "react";
import { Webinar } from "../type";
import moment from "moment";
import "./thumbnail-gallery.css";

type Props = {
  webinars: Webinar[];
};

// Thumbnail gallery component that displays webinars
const ThumbnailGallery: React.FC<Props> = ({ webinars }) => {

  // Render the thumbnail gallery with the filtered webinars
  return (
    <div className="thumbnail-gallery">
      {webinars.map((webinar) => (
        <div className="thumbnail" key={webinar.title}>
          <img className="thumbnail__image" src={webinar.image} alt={webinar.title} />
          <div className="thumbnail__content">
            <h3 className="thumbnail__title">{webinar.title}</h3>
            <p className="thumbnail__date">{moment(webinar.date).format("dddd Do MMMM YYYY, h:mm a")}</p>
            <p className="thumbnail__description">{webinar.description}</p>
            <p className="thumbnail__speaker">{webinar.speaker.name}</p>
            <p className="thumbnail__speaker_position">{webinar.speaker.position}</p>
            <p className="thumbnail__tag">{webinar.tag}</p>
            <button className="thumbnail__button">Je m'inscris</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailGallery;
