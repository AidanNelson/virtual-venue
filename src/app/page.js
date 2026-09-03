"use client";

import { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";

const GITHUB_URL = "https://github.com/aidannelson/livelabbroadcaster";

const SHOWS = [
  {
    src: "/landing-page-gifs/image1.gif",
    title: "Mano a Mano",
    creator: "Paul Pinto",
    description:
      "In Paul Pinto’s Mano a Mano, the lobby showed a live feed of a backstage camera, which each online audience’s icon partially revealed to give small glimpses of Paul behind the scenes before the show started.",
  },
  {
    src: "/landing-page-gifs/image2.gif",
    title: "Into Uncertain Weathers",
    creator: "kathy wu",
    description:
      "In kathy wu’s lecture/performance Into Uncertain Weathers, online audiences were randomly assigned differently shaped cursor icons, representing different kinds of weather. The artist wrote instructions for the audience to perform as they waited.",
  },
  {
    src: "/landing-page-gifs/image3.gif",
    title: "Protest Grammars: What is This Gesture?",
    creator: "Maryam Kazeem | Resident Artist 2025-2026",
    description:
      "An exploration of the Lagos Lagoon in Nigeria as a site where geology, knowledge, and history are continuously shaped through relation.  During moments in her talk, Maryam paused for input from the audience, asking the recurring question: “What is this gesture?” Each audience member could record a response, audio which Maryam used in her in-person talk the following day.",
  },
  {
    src: "/landing-page-gifs/image4.gif",
    title: "Protest Grammars: What is This Gesture?",
    creator: "Maryam Kazeem | Resident Artist 2025-2026",
   description:
      "Audio recorded from the audience was transcribed and generated as colorful spirals, which were displayed on a layer over the stream.",
  },
  {
    src: "/landing-page-gifs/image5.gif",
    title: "Into Uncertain Weathers",
    creator: "kathy wu | Resident Artist 2025-2026",
    description:
      "An interactive installation and performance of poetry, weather balloons, mylar and haze which asks: What are technology’s affordances and limits in future-telling? Poet and artist kathy wu gave a lecture exploring the question: What are technology’s affordances and limits in future-telling? Online audiences drew clouds and other kinds of weather, which was projected into the room and visible to the in-person audience, where kathy was giving a lecture via overhead projector.",
  },
  {
    src: "/landing-page-gifs/image6.gif",
    title: "Into Uncertain Weathers",
    creator: "kathy wu | Resident Artist 2025-2026",
     description:
      "The role and visual presence of the online audience changed over time. During another section of the artist’s talk, they were represented as clouds.",
  },
];

const CREDITS = [
  {
    role: "Lead Developer / Concept",
    names: "Aidan Nelson",
  },
  {
    role: "Producer / Senior Advisor / Concept",
    names: "Shawn Van Every",
  },
  {
    role: "Concept / Creative Producer",
    names: "Billy Clark, Sangmin Chae, and DeAndra Anthony",
  },
  {
    role: "UI/UX Designer",
    names: "Deron Gopie",
  },
  {
    role: "Interactive Sketch Coders",
    names: "MORAKANA, YG Zhang, and Shuang Cai",
  },
  {
    role: "Project Manager",
    names: "DeAndra Anthony",
  },
];

const HeroBanner = () => {
  return (
    <div className={styles.heroBanner}>
      <p className={styles.welcomeContainer}>
        {Array.from("Welcome To").map((letter, index) => {
          return (
            <span key={index} className={styles.welcomeLetter}>
              {letter}
            </span>
          );
        })}
      </p>
      <h1 className={styles.heroContainer}>
        {Array.from("La MaMa Online").map((letter, index) => {
          return (
            <span key={index} className={styles.heroLetter}>
              {letter}
            </span>
          );
        })}
      </h1>
      <p className={styles.poweredByText}>Powered by LiveLab Broadcaster</p>
    </div>
  );
};

function ShowsGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const show = SHOWS[activeIndex];

  useEffect(() => {
    // start at random index, then every 5 seconds, increment the index
    setActiveIndex(Math.floor(Math.random() * SHOWS.length));
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SHOWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.showsSection} aria-label="Selected works">
      <div
        className={`${styles.showSwitcher} ml-auto mr-auto`}
        role="tablist"
        aria-label="Select a show"
      >
        {SHOWS.map((item, index) => {
          const label = String(index + 1).padStart(2, "0");
          const isActive = index === activeIndex;
          return (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={
                isActive
                  ? `${styles.showSwitcherItem} ${styles.showSwitcherItemActive}`
                  : styles.showSwitcherItem
              }
              onClick={() => setActiveIndex(index)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className={styles.showMedia}>
        <img
          key={show.src}
          src={show.src}
          alt=""
          className={styles.showGif}
        />
      </div>

      <div className={styles.showMeta}>
        <h2 className={styles.showTitle}>{show.title}</h2>
        <p className={styles.showCreator}>{show.creator}</p>
        <p className={styles.showDescription}>{show.description}</p>
      </div>

      
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className={styles.landingPageRoot}>
      <div className={`text-foreground ${styles.landingPageContainer}`}>
        <section className={styles.heroSection} aria-label="Welcome">
          <HeroBanner />
        </section>

        <div className={styles.contentRow}>
          <section className={styles.aboutSection} aria-labelledby="about-heading">
            <h2 id="about-heading" className={styles.aboutHeading}>
              About
            </h2>

            <div className={styles.aboutCopy}>
              <p>
                LiveLab Broadcaster is an open-source platform for interactive,
                networked performance, developed over the past five years by
                CultureHub and NYU&apos;s Interactive Telecommunications Program
                (ITP). Designed to explore hybrid performance as its own medium,
                the software does not try to mimic what works in a live theater,
                but instead creatively translates the joy and energy of live
                performance into an online space.
              </p>
              <p>
                LiveLab Broadcaster is designed to create a sense of ambient
                co-presence for online audiences, or the feeling of a communal
                experience in a shared virtual environment. Because it is open
                source, low latency, and integrates with p5.js, the platform opens
                new creative possibilities. Artists and presenters can customize
                forms of audience interaction to create live feedback loops, give
                them agency over the performance, or bring traces of their digital
                presence into the physical performance space.
              </p>
            </div>

            <div className={styles.credits}>
              <h3 className={styles.creditsHeading}>Development team</h3>
              <ul className={styles.creditsList}>
                {CREDITS.map(({ role, names }) => (
                  <li key={role} className={styles.creditItem}>
                    <span className={styles.creditRole}>{role}</span>
                    <span className={styles.creditNames}>{names}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className={styles.aboutLearnMore}>
              Learn more at our{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutLinkInline}
              >
                Github repository
              </a>
              .
            </p>
          </section>

          <ShowsGallery />
        </div>
      </div>
    </div>
  );
}
