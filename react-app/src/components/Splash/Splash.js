import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Splash = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="landing">
      <div className="landing-top">
        <div className="landing-top-left">
          <p className="landing-top-text">
            Cryptocurrency for <br />
            Everyone
          </p>
          <p className="landing-top-desc">
            Simulated investing, plus the tools you need to prepare yourself for
            investing in cryptocurrency. Sign up and get started for free.
            Certain limitations apply.
          </p>
          <div className="landing-signup">
            <div className="landing-signup-left">
              {!user ? (
                <NavLink to="/signup" className="landing-signup-btn">
                  Sign Up
                </NavLink>
              ) : (
                <NavLink to="/home" className="landing-signup-btn">
                  Learn More
                </NavLink>
              )}
            </div>
            <div className="landing-signup-right">
              <p className="landing-right-scan">Scan to get the app</p>
              <img
                className="landing-right-img"
                src="https://i.imgur.com/diym3m5.png"
              />
            </div>
          </div>
          <div className="landing-disclosure">
            🛈 Not a Real Trading Application
          </div>
        </div>
        <div className="landing-top-right">
          <img
            className="landing-top-img"
            src="https://lh3.googleusercontent.com/PCtm6TiJF0qJ7Y5QWPZiWAwwNCWc4_9F0D8M4pdFgIw8FQezDDg0b3Edal2t19xL43PByRVNJzIQ9OhK1dqnl0yL=w600"
          />
        </div>
      </div>
      <div className="landing-mid">
        See what you can do without worrying about spending real money.
      </div>
      <div className="landing-lower-mid">
        <img
          className="landing-lower-img"
          src="https://media.istockphoto.com/vectors/cryptocurrency-concept-young-man-sitting-on-golden-stacks-coin-with-vector-id937720116?k=20&m=937720116&s=612x612&w=0&h=HdhODWc1VQlLoYmcrUfffgJhgB-3HF64yA79Z18h-OM="
        />
        <div className="lower-mid-right">
          <p className="lmr-header">Learn More About Crypto Trading</p>
          <p className="lmr-desc">
            Simulate crypto trading to learn more about the market before you
            invest.
          </p>
          <div className="lwr-main">
            <div className="lwr-1">
              <img className="lwr-img" src="https://robinhood.com/us/en/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg" />
              <div className="lwr-lwr">
                <div className="lwr-title">It's your turn</div>
                <div className="lwr-desc">
                  Get up to $50,000,000 in simulated cash.
                </div>
              </div>
            </div>
            <div className="lwr-1">
              <img className="lwr-img" src="https://robinhood.com/us/en/_next/static/images/one-first__d86b9ee63a8475364159f2d21ea5f01f.svg" />
              <div className="lwr-lwr">
                <div className="lwr-title">Be one of the first</div>
                <div className="lwr-desc">
                  It's a brand new application. Go ahead and try it!
                </div>
              </div>
            </div>
            <div className="lwr-1">
              <img className="lwr-img" src="https://robinhood.com/us/en/_next/static/images/fair-shot__fb09db580d0ada2e8626a6e46094bb27.svg" />
              <div className="lwr-lwr">
                <div className="lwr-title">Get a fair shot</div>
                <div className="lwr-desc">
                  Risk-free trading. Get the opportunity to learn about the cryptocurrency market.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
