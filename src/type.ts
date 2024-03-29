// types.ts

export type Webinar = {
  title: string;
  date: string;
  description: string[];
  speaker: {
    name: string;
    position: string;
  };
  tag: string;
  image: string;
  url_enroll: string;
  url_video: string;
};