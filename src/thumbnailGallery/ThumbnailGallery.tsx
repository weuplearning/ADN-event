import React from "react";
import { Webinar } from "../type";
import moment from "moment";
import 'moment/locale/fr'; // import the French locale
import "./thumbnail-gallery.css";

type Props = {
  webinars: Webinar[];
};

// Thumbnail gallery component that displays webinars

const ThumbnailGallery: React.FC<Props> = ({ webinars }) => {
  const today = new Date();
  return (
    <div className="thumbnail-gallery">
      {webinars.map((webinar) => {
        const dateObj = new Date(webinar.date);
        const options = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        const formattedDate = dateObj.toLocaleDateString("fr", options)

        const passedWebinar = today > new Date(webinar.date)
        
        return (
          <>
            <div className="thumbnail" key={webinar.title}>
              <img className="thumbnail__image" src={webinar.image} alt={webinar.title} />
              <div className="thumbnail__content">
                <div className="thumbnail__title-date">
                  <h3 className="thumbnail__title">{webinar.title}</h3>
                  <p className="thumbnail__date">{formattedDate}</p>
                </div>
                {webinar.description && (
                  <p className="thumbnail__description">
                    {webinar.description.map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                )}
                <p className="thumbnail__speaker">{webinar.speaker.name}</p>
                <p className="thumbnail__speaker_position">{webinar.speaker.position}</p>
                <p className="thumbnail__tag">#{webinar.tag}</p>
                {
                  passedWebinar && webinar.url_video ?
                  <button className="thumbnail__button" onClick={() => window.open(webinar.url_video, "_blank")}>
                  Je regarde
                </button>
                : passedWebinar && !webinar.url_video ?
                  <button className="thumbnail__button" disabled>
                  Je regarde
                </button>
                  : 
                  <button className="thumbnail__button" onClick={() =>  window.open(webinar.url_enroll, "_blank")}>
                  Je m'inscris
                </button>
                }
              </div>
            </div>
          </>
        )
      })}
    </div>
  );
};

export default ThumbnailGallery;
