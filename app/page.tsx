"use client";

import React, { useEffect } from "react";
import Hero from "./home_sections/hero";
import Skill from "./home_sections/skill";
import CareerJourney from "./home_sections/career_journey";

import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 80,
      easing: "ease-out-cubic",
    });

    AOS.refresh();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <div data-aos="flip-up">
        <CareerJourney />
      </div>

      <div data-aos="flip-up">
        <Skill data-aos="flip-up" />
      </div>
    </div>
  );
};

export default Page;
