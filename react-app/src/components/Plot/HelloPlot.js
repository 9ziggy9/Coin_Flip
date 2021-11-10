import React from 'react';
import {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
// Simulation class
import { Simulation } from "../../utilities/simulation.js";
// Transformation from uniform -> normal distributions
import { gauss_boxmuller } from "../../utilities/simulation.js";
// Finnhub API

const HelloPlot = () => {
  const user = useSelector(state => state.session.user)

  const rand_walk = x => {
    const sgn = Math.pow(-1, Math.floor(2*Math.random()));
    const step = sgn * Math.floor(4*Math.random());
    return x + step < 0 ? 0 : x + step;
  }

  const gaussian = x => {
    const sgn = Math.pow(-1, Math.floor(2*Math.random()));
    const step = sgn * gauss_boxmuller();
    return x + 0.5 * step;
  }

  const test_sim = new Simulation(60, x => gaussian(x));
  test_sim.proceed();

  const [X, setDomain] = useState(test_sim.domain);
  const [Y, setRange] = useState(test_sim.range);

  useEffect(() => {
    const intervalPointer = setInterval(() => {
      test_sim.proceed();
      setDomain(test_sim.domain);
      setRange(test_sim.range);
    }, 2000)
    return () => clearInterval(intervalPointer);
  }, [setDomain])

  if(user) {
    return (
      <Plot
        data={[
          {
            x: X,
            y: Y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'green'},
          },
          {type: 'contour', x: X, y: Y},
        ]}
        layout={{width: 1200, height: 800, title: 'Gauss Coin'}}
      />
    )
  } else {
    return <Redirect to="/" />
  }
}

export default HelloPlot
