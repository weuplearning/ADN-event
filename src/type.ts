// types.ts

export type Webinar = {
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
  