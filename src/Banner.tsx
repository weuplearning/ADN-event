import React, { useState, useEffect } from "react";
import moment from "moment";
// import webinarData from '../data/webinarData.json'
import "./banner.css";

type Props = {
  webinarData: Webinar[];
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

const Banner: React.FC<Props> = ({ webinarData }) => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [nextWebinar, setNextWebinar] = useState<Webinar | null>(null);

  useEffect(() => {
    setWebinars(webinarData);
  }, []);

  useEffect(() => {
    const sortedWebinars = webinars.sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
    const now = moment();
    const next = sortedWebinars.find((webinar) => moment(webinar.date).isAfter(now));
    const last = sortedWebinars[sortedWebinars.length - 1];
    setNextWebinar(next || last);
  }, [webinars]);

  if (!nextWebinar) {
    return null;
  }

  const { title, tag, description, date, image } = nextWebinar;

  return (
    <div className="container">
      <div className="left-block">
        <p>Ne loupez pas le prochain webinaire</p>
        <h2>{title}</h2>
        <span className="webinaire_tag">{tag}</span>
        <p>{description}</p>
        <p>{moment(date).format("dddd Do MMMM YYYY, h:mm a")}</p>
      </div>
      <div className="right-block">
        <img src={image} alt={title} />
        <button>Je m'inscris au webinaire</button>
      </div>
    </div>
  );
};

export default Banner;
