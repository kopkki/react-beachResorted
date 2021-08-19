import React from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaCocktail />,
      title: "Free cocktails",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque.",
    },
    {
      icon: <FaHiking />,
      title: "Endless Hiking",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque.",
    },
    {
      icon: <FaShuttleVan />,
      title: "Free shuttle",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque.",
    },
    {
      icon: <FaBeer />,
      title: "Strongest Beer",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque.",
    },
  ];

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((item, index) => {
          const { icon, title, info } = item;
          return (
            <article key={index} className="service">
              <span>{icon}</span>
              <h6>{title}</h6>
              <p>{info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
