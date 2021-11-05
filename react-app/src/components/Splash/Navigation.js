import { useEffect, useState, useRef } from "react";

const Navigation = () => {
  const nav = useRef(null);
  const arrow1 = useRef(null);
  const arrow2 = useRef(null);
  const arrow3 = useRef(null);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (num === 0) {
      nav?.current.classList.add("hidden");
    } else {
      nav?.current.classList.remove("hidden");
    }
  }, [num]);

  const arrowUp = (n) => {
    if (num === n) {
      arrow1.current.innerText = "▼";
      arrow2.current.innerText = "▼";
      arrow3.current.innerText = "▼";
      return setNum(0);
    }

    if (n === 1) {
      arrow1.current.innerText = "▲";
      arrow2.current.innerText = "▼";
      arrow3.current.innerText = "▼";
      return setNum(1);
    }

    if (n === 2) {
      arrow2.current.innerText = "▲";
      arrow1.current.innerText = "▼";
      arrow3.current.innerText = "▼";
      return setNum(2);
    }

    if (n === 3) {
      arrow3.current.innerText = "▲";
      arrow1.current.innerText = "▼";
      arrow2.current.innerText = "▼";
      return setNum(3);
    }
  };

  return (
    <div className="combined-bar">
      <div className="navbar">
        <img
          src="https://fontmeme.com/permalink/211103/80dc09475ec374f44b603d9a56f8f4c0.png"
          className="nav-img"
        />
        <img
        className="nav-coin"
        src="https://thumbs.gfycat.com/SkinnyAccomplishedBoa-size_restricted.gif" />
        <div className="navlinks">
          <p className="links products" onClick={() => arrowUp(1)}>
            Products{" "}
            <p className="arrow" ref={arrow1}>
              ▼
            </p>
          </p>
          <p className="links learn" onClick={() => arrowUp(2)}>
            Learn{" "}
            <p className="arrow" ref={arrow2}>
              ▼
            </p>
          </p>
          <p className="links">Support</p>
          <p className="links who" onClick={() => arrowUp(3)}>
            Who we are{" "}
            <p className="arrow" ref={arrow3}>
              ▼
            </p>
          </p>
        </div>
        <div className="nav-right">
          <p className="login">Log In</p>
          <p className="signup">Sign Up</p>
        </div>
      </div>
      <div className="bottom-nav" ref={nav}>
        {num === 1 && <div>Test</div>}
        {num === 2 && <div>Test2</div>}
        {num === 3 && <div>Test3</div>}
      </div>
    </div>
  );
};

export default Navigation;
