import georiganTransliteratorPreview from "../assets/georgian-transliterator-preview.png";
import twoFramesPreview from "../assets/two-frames-preview.png";
import selfworkPreview from "../assets/selfwork-preview.png";

export type TPastWorkDataItem = {
  projectName: string;
  isCommercial: boolean;
  fields: string[];
  description: string;
  linkLive: string;
  linkRepo?: string;
  imgSrc: string;
};

export const pastWorkData: TPastWorkDataItem[] = [
  {
    projectName: "Selfwork",
    isCommercial: true,
    fields: ["HR-tech", "Fintech"],
    description:
      "I built a scheduled notification system and migrated the main entry point landing page (vanilla HTML/CSS/JS –> Astro/Tailwind/Preact) – among many other things",
    linkLive: "https://selfwork.com/",
    imgSrc: selfworkPreview,
  },
  {
    projectName: "Georgian Transliterator",
    isCommercial: false,
    fields: ["Edtech"],
    description:
      "I built this frontend-only tool for learners of Georgian with React",
    linkLive: "https://effervescent-bonbon-a623d1.netlify.app/",
    linkRepo: "https://github.com/elmijail1/georgian-transliterator",
    imgSrc: georiganTransliteratorPreview,
  },
  {
    projectName: "2 Frames",
    isCommercial: false,
    fields: ["Test app"],
    description:
      "A small test app to get more experience with Tanstack Query, Express, sorting, and queueing",
    linkLive: "https://two-frames-select-and-sort.onrender.com/",
    linkRepo: "https://github.com/elmijail1/two-frames-select-and-sort",
    imgSrc: twoFramesPreview,
  },
];
