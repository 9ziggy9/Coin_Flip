import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./About.css";

const About = () => {
  const [person, setPerson] = useState();
  const user = useSelector((state) => state.session?.user);
  const [bio, setBio] = useState();
  const [fave, setFave] = useState();
  const [linkedIn, setLinkedIn] = useState();
  const [github, setGithub] = useState();

  const revan = () => {
    setPerson("Revan Fajardo");
    setBio("Aspiring Software Engineer with an affinity for JavaScript/React.");
    setFave("Dogecoin");
    setLinkedIn(
      "https://www.linkedin.com/in/john-elijah-revan-fajardo-33a189a3/"
    );
    setGithub(
      "https://cdn.dribbble.com/users/6569/screenshots/16742885/media/361dccdf11984b210043e69cb871fc93.png?compress=1&resize=400x300"
    );
  };

  const harrison = () => {
    setPerson("Harrison Gerdes");
    setBio("Student at App Academy");
    setFave("Bitcoin");
    setLinkedIn("https://www.linkedin.com/in/harrison-gerdes-31991a95/");
    setGithub("https://github.com/HGerdes");
  };

  const victor = () => {
    setPerson("Victor Hou");
    setBio("Student at App Academy");
    setFave("Bitcoin");
    setLinkedIn("https://www.linkedin.com/in/victor-hou-a77b3a223/");
    setGithub("https://github.com/Thereal-victorhou");
  };

  const david = () => {
    setPerson("David Rogers");
    setBio("Student at App Academy");
    setFave("Bitcoin");
    setLinkedIn("https://github.com/9ziggy9");
    setGithub("https://github.com/9ziggy9");
  };

  return (
    <div className="about-main">
      <div className="about-title">About the Site Creators</div>
      <div className="about-lower">
        <div className="about-left">
          <div className="about-name">
            {person?.length > 0
              ? person
              : "Please select a person on the right to view their information."}
          </div>
          <div className="about-left-lower">
            <div className="about-bio">About Me: {bio}</div>
            <div className="about-fav-crypto">Favorite Crypto: {fave}</div>
          </div>
          <div className="about-me">
            <a href={linkedIn} target="_blank" className="linkedin">
              <img
                className="linkedin-img"
                src="https://icon-library.com/images/linkedin-icon-logo/linkedin-icon-logo-9.jpg"
              />
              LinkedIn
            </a>
            <a className="linkedin" href={github} target="_blank">
              <img
                className="linkedin-img"
                src="https://cdn.dribbble.com/users/6569/screenshots/16742885/media/361dccdf11984b210043e69cb871fc93.png?compress=1&resize=400x300"
              />
              Github
            </a>
          </div>
        </div>
        <div className="about-right">
          <div className="revan" onClick={() => revan()}>
            Revan Fajardo
          </div>
          <div className="revan" onClick={() => harrison()}>
            Harrison Gerdes
          </div>
          <div className="revan" onClick={() => victor()}>
            Victor Hou
          </div>
          <div className="revan" onClick={() => david()}>
            David Rogers
          </div>
          {user?.id ? (
            <NavLink className="revan aboutlink" to="/home">
              Return to Homepage
            </NavLink>
          ) : (
            <NavLink className="revan aboutlink" to="/">
              Return to Front Page
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
