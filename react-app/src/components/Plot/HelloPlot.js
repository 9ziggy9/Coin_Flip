import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";

class Simulation {
  constructor(stop,interval,fn=x=>x) {
    this.start = 0;
    this.stop = stop;
    this.interval = interval;
    this.fn = fn;
  }

  map_domain(domain) {
    return domain.map(x => this.fn(x))
  }

  run() {
    const domain = [];

    for(let x = this.start; x < this.interval; x++)
      domain.push(x);

    const range = this.map_domain(domain);

    this.start++;
    this.interval++;

    return {domain, range}
  }
}

const HelloPlot = () => {
  const user = useSelector(state => state.session.user)
  const delay = time => new Promise(resolve => setTimeout(resolve,time));

  const sim = new Simulation(100, 10, x => 2*x);
  const {domain,range} = sim.run()

  if(user) {
    return (
      <Plot
        data={[
          {
            x: domain,
            y: range,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'contour', x: domain, y: range},
        ]}
        layout={{width: 1200, height: 800, title: 'Test Plot'}}
      />
    )
  } else {
    return <Redirect to="/" />
  }
}

export default HelloPlot
