import React from 'react';
import {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
// Simulation class
import { Simulation } from "../../utilities/statistics.js";
// Transformation from uniform -> normal distributions
import { log_normal } from "../../utilities/statistics.js";
// Finnhub API

const SimPlot = () => {
  const user = useSelector(state => state.session.user)
  const mock_history = [
    {time: 1636664211, price: 12.22},
    {time: 1636664212, price: 12.22},
    {time: 1636664213, price: 12.22},
    {time: 1636664214, price: 12.22},
    {time: 1636664215, price: 12.22},
    {time: 1636664216, price: 12.22},
    {time: 1636664217, price: 12.22},
    {time: 1636664218, price: 12.22},
    {time: 1636664219, price: 12.22},
    {time: 1636664220, price: 12.22},
    {time: 1636664221, price: 12.22},
    {time: 1636664222, price: 12.22},
    {time: 1636664223, price: 12.22},
  ];

  // mu = mean value; sigma = standard deviation
  const test_sim = new Simulation(mock_history, log_normal, 200, 0.25);
  test_sim.proceed();

  const [X, setDomain] = useState(test_sim.domain);
  const [Y, setRange] = useState(test_sim.range);

  useEffect(() => {
    const intervalPointer = setInterval(() => {
      console.log(test_sim.proceed());
      setDomain(test_sim.domain);
      setRange(test_sim.range);
    }, 4000)
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
            x: X.map(x => {let t = new Date(x); return t.toLocaleString();}),
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
