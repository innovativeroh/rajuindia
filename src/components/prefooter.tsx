"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from '@/app/styles.module.css';

// Configuration and Event Interfaces
interface Config {
  theme: "system" | "light" | "dark";
  animate: boolean;
  snap: boolean;
  start: number;
  end: number;
  scroll: boolean;
  debug: boolean;
}

const IndiaDescriptionPage: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);

  // Comprehensive list of descriptive adjectives about India
  const adjectives: string[] = [
    "vibrant", "diverse", "cultural", "spiritual", "colorful",
    "historic", "traditional", "festive", "enchanting", "majestic",
    "architectural", "dynamic", "flourishing", "exotic", "timeless",
    "sacred", "heritage-rich", "mythical", "inviting", "breathtaking",
    "spectacular", "soulful"
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Configuration
    const config: Config = {
      theme: "dark",
      animate: true,
      snap: true,
      start: gsap.utils.random(0, 100, 1),
      end: gsap.utils.random(900, 1000, 1),
      scroll: true,
      debug: false,
    };

    let items: HTMLElement[] = [];
    let scrollerScrub: ScrollTrigger | undefined;
    let dimmerScrub: ScrollTrigger | undefined;
    let chromaEntry: gsap.core.Tween | undefined;
    let chromaExit: gsap.core.Tween | undefined;

    // Set the list count dynamically
    if (listRef.current) {
      listRef.current.style.setProperty("--count", adjectives.length.toString());
    }

    // Update function to manage dynamic configuration
    const update = () => {
      document.documentElement.dataset.theme = config.theme;
      document.documentElement.dataset.syncScrollbar = config.scroll.toString();
      document.documentElement.dataset.animate = config.animate.toString();
      document.documentElement.dataset.snap = config.snap.toString();
      document.documentElement.dataset.debug = config.debug.toString();

      if (listRef.current) {
        listRef.current.style.setProperty("--start", config.start.toString());
        listRef.current.style.setProperty("--end", config.end.toString());
      }

      if (!config.animate) {
        // Disable animations when animate is false
        chromaEntry?.scrollTrigger?.disable(true, false);
        chromaExit?.scrollTrigger?.disable(true, false);
        dimmerScrub?.disable(true, false);
        scrollerScrub?.disable(true, false);
        gsap.set(items, { opacity: 1 });
        
        if (listRef.current) {
          listRef.current.style.setProperty("--chroma", "0");
        }
      } else {
        // Enable animations with dynamic opacity
        gsap.set(items, { opacity: (i: number) => (i !== 0 ? 0.2 : 1) });
        dimmerScrub?.enable(true, true);
        scrollerScrub?.enable(true, true);
        chromaEntry?.scrollTrigger?.enable(true, true);
        chromaExit?.scrollTrigger?.enable(true, true);
      }
    };



    // Fallback for browsers without native scroll timeline support
    if (!CSS.supports("(animation-timeline: scroll()) and (animation-range: 0% 100%)")) {
      items = gsap.utils.toArray<HTMLLIElement>(`ul li`);

      gsap.set(items, { opacity: (i: number) => (i !== 0 ? 0.2 : 1) });

      const dimmer = gsap
        .timeline()
        .to(items.slice(1), { opacity: 1, stagger: 0.5 })
        .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

      dimmerScrub = ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: "center center",
        end: "center center",
        animation: dimmer,
        scrub: 0.2,
      });

      const scroller = gsap.timeline().fromTo(
        listRef.current,
        { "--hue": config.start },
        { "--hue": config.end, ease: "none" }
      );

      scrollerScrub = ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: "center center",
        end: "center center",
        animation: scroller,
        scrub: 0.2,
      });

      chromaEntry = gsap.fromTo(
        listRef.current,
        { "--chroma": 0 },
        {
          "--chroma": 0.3,
          ease: "none",
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[0],
            start: "center center+=40",
            end: "center center",
          },
        }
      );

      chromaExit = gsap.fromTo(
        listRef.current,
        { "--chroma": 0.3 },
        {
          "--chroma": 0,
          ease: "none",
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[items.length - 2],
            start: "center center",
            end: "center center-=40",
          },
        }
      );
    }

    update();

    // Cleanup function
    return () => {
      scrollerScrub?.kill();
      dimmerScrub?.kill();
      chromaEntry?.kill();
      chromaExit?.kill();
    };
  }, [adjectives.length]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className={styles.body}>
      <div className={styles.mainTextContainer}>
        <h1 className={`${styles.text} ${styles.mainTitle} playfairDisplay font-extrabold pr-10`}>
          The Beauty Of<br />India.
        </h1>
      </div>
      <section className={`${styles.stick} ${styles.text}`}>
        <h2 className="text-gray-800">
          <span>India is&nbsp;</span>
          <span className={styles.smallText}>India is</span>
        </h2>
        <ul
          ref={listRef}
          aria-hidden="true"
          style={{ "--count": adjectives.length } as React.CSSProperties}
          data-snap="true"
          className={styles.effect}
        >
          {adjectives.map((adj, index) => (
            <li
              key={index}
              style={{ "--i": index } as React.CSSProperties}
              className={index === adjectives.length - 1 ? styles.lastLi : "montserrat"}
            >
              {adj}.
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.heightFixer}>
        <h2 className={styles.text}></h2>
      </section>
    </div>
  );
};

export default IndiaDescriptionPage;