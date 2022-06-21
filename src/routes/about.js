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
  return (
    <div className="relative w-screen h-screen">
      <Header hideNavMenu={true} />
      <div className="bg-cyborg_commando bg-top bg-cover MacBook:h-fit iPad:h-screen iPhone:h-screen">
        <div className="flex flex-row justify-center items-baseline">
          <StoryWindow src={Korea} label="ethnic Korean" />
          <StoryWindow src={Japan} label="born in Japan" />
          <StoryWindow src={China} label="Chinese citizen" />
          <StoryWindow src={US} label="living in the US" />
        </div>
        <div className="flex flex-row justify-center items-baseline">
          <StoryWindow src={BYU} label="undergraduate student" />
          <StoryWindow src={markov_chain} label="applied mathematician" />
          <StoryWindow src={react} label="software engineer" />
        </div>
        <div className="flex flex-row justify-center items-baseline">
          <StoryWindow src={calisthenics} label="calisthenics athlete" />
          <StoryWindow src={accordion} label="accordionist" />
        </div>
      </div>
    </div>
  );
}
