import { setMaxListeners } from "process";
import { useState } from "react";
import "./About.css";

const About = () => {
    const [person, setPerson] = useState()

  return (
    <div className="about-main">
      <div className="about-title">About the Site Creators</div>
      <div className="about-lower">
        <div className="about-left">{person?.length > 0 ? person : "Please select a person on the right"}</div>
        <div className="about-right">
            <div className="revan" onClick={() => setPerson('Revan Fajardo')}>Revan Fajardo</div>
            <div className="revan" onClick={() => setPerson('Harrison Gerdes')}>Harrison Gerdes</div>
            <div className="revan" onClick={() => setPerson('Victor Hou')}>Victor Hou</div>
            <div className="revan" onClick={() => setPerson('David Rogers')}>David Rogers</div>
        </div>
      </div>
    </div>
  );
};

export default About;
