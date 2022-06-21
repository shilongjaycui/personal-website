import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import StoryWindow from "../components/StoryWindow";
import Korea from "../images/about/south_korea.png";
import Japan from "../images/about/japan.png";
import China from "../images/about/china.png";
import US from "../images/about/US.png";
import BYU from "../images/about/BYU.png";
import markov_chain from "../images/about/markov_chain.png";
import react from "../images/about/react.png";
import calisthenics from "../images/about/calisthenics.png";
import accordion from "../images/about/accordion.png";

export default function About() {
  const MACBOOK_MIN_WIDTH = 1200;
  const [onLaptop, setOnLaptop] = useState(
    window.innerWidth >= MACBOOK_MIN_WIDTH
  );

  useEffect(() => {
    function handleResize() {
      setOnLaptop(window.innerWidth >= MACBOOK_MIN_WIDTH);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="relative w-screen h-screen">
      <Header hideNavMenu={true} />
      {onLaptop ? (
        <div className="bg-cyborg_commando bg-top bg-cover h-fit">
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={Korea} label="ethnic Korean" onLaptop={onLaptop} />
            <StoryWindow src={Japan} label="born in Japan" onLaptop={onLaptop} />
            <StoryWindow src={China} label="raised in China" onLaptop={onLaptop} />
            <StoryWindow src={US} label="living in the US" onLaptop={onLaptop} />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={BYU} label="undergraduate student" onLaptop={onLaptop} />
            <StoryWindow src={markov_chain} label="applied mathematician" onLaptop={onLaptop} />
            <StoryWindow src={react} label="software engineer" onLaptop={onLaptop} />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={calisthenics} label="calisthenics athlete" onLaptop={onLaptop} />
            <StoryWindow src={accordion} label="accordionist" onLaptop={onLaptop} />
          </div>
        </div>
      ) : (
        <div className="bg-cyborg_commando bg-top bg-cover h-full">
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={Korea} label="ethnic Korean" onLaptop={onLaptop} />
            <StoryWindow src={Japan} label="born in Japan" onLaptop={onLaptop} />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={China} label="Chinese citizen" onLaptop={onLaptop} />
            <StoryWindow src={US} label="living in the US" onLaptop={onLaptop} />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={BYU} label="undergraduate student" onLaptop={onLaptop} />
            <StoryWindow src={markov_chain} label="applied mathematician" onLaptop={onLaptop} />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={react} label="software engineer" onLaptop={onLaptop} />
            <StoryWindow src={calisthenics} label="calisthenics athlete" onLaptop={onLaptop} />
          </div>
          <div className="flex flex-row justify-center items-baseline">
            <StoryWindow src={accordion} label="accordionist" onLaptop={onLaptop} />
          </div>
        </div>
      )}
    </div>
  );
}
