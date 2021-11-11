import React from 'react';
import {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
// Simulation class
import { Simulation } from "../../utilities/statistics.js";
// Transformation from uniform -> normal distributions
import { gaussian } from "../../utilities/statistics.js";
// Finnhub API

const SimPlot = () => {
  const user = useSelector(state => state.session.user)
  const mock_history = [
    12.22,
    13.45,
    14.87,
    11.24,
    13.10,
    12.07,
    10.88,
    9.10,
    8.2,
    7.3
  ];

  const test_sim = new Simulation(mock_history, x => gaussian(x));
  test_sim.proceed();

  const [X, setDomain] = useState(test_sim.domain);
  const [Y, setRange] = useState(test_sim.range);

  useEffect(() => {
    const intervalPointer = setInterval(() => {
      test_sim.proceed();
      setDomain(test_sim.domain);
      setRange(test_sim.range);
    }, 1000)
    return () => clearInterval(intervalPointer);
  }, [setDomain])

  if(user) {

    const layout = {
      autosize: true,
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      scene: [{align:'left', bordercolor:'green',
               font: {color:'white'},
               text:'HELLO WORLD'}]
    }

    return (
      <Plot
        data={[
          {
            x: X,
            y: Y,
            type: 'scatter',
            showlegend: true,
            legendgrouptitle: {font: {color: 'white'}, text: 'hello world'},
            mode: 'lines+markers',
            marker: {color: 'green'},
          },
        ]}
        layout={layout}
        style={{'width':'100%', height:'100%'}}
        useResizeHandler={true}
      />
    )
  } else {
    return <Redirect to="/" />
  }
}

export default SimPlot
