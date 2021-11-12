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
  const [market, setMarket] = useState([]);

  const mock_history = [
    {time: 1636665211, price: 12.22},
    {time: 1636666212, price: 15.22},
    {time: 1636667213, price: 20.22},
    {time: 1636668214, price: 12.22},
    {time: 1636669215, price: 101.22},
    {time: 1636670216, price: 200.22},
    {time: 1636671217, price: 260.22},
    {time: 1636672218, price: 124.22},
    {time: 1636673219, price: 261.22},
    {time: 1636674220, price: 246.22},
    {time: 1636675221, price: 200.22},
    {time: 1636676222, price: 391.22},
    {time: 1636677223, price: 10.22},
  ];

  // const data = async () => {
  //   const res = await fetch("/api/cryptocurrencies/prices");
  //   const d = await res.json();
  //   setMarket(d);
  // };

  // useEffect(() => {data()}, []);
  // console.log(market)

  // mu = mean value; sigma = standard deviation
  const test_sim = new Simulation(mock_history, log_normal, 200, 2);
  test_sim.initialize()

  const [X, setDomain] = useState(test_sim.domain);
  const [Y, setRange] = useState(test_sim.range);

  useEffect(() => {
    const intervalPointer = setInterval(() => {
      test_sim.proceed();
      setDomain(test_sim.domain);
      setRange(test_sim.range);
    }, 1000)
    return () => clearInterval(intervalPointer);
  }, [])

  if(true) {
    const layout = {
      autosize: true,
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      title: 'Lognormal',
      font: {color: 'white'}
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
  }
}

export default SimPlot
