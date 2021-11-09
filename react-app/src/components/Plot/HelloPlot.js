import React from 'react';
import {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";

class Simulation {
  constructor(stop,interval,fn=x=>x) {
    this.start = 0;
    this.stop = stop;
    this.interval = interval;
    this.fn = fn;
    this.domain = [...Array(interval).keys()];
    this.range = [];
  }

  map_domain(domain) {
    return domain.map(x => this.fn(x))
  }

  proceed() {
    if(this.start === 0) this.range = this.map_domain(this.domain);

    const live = this.range[this.range.length-1];

    const domain = [];

    for(let x = this.start; x < this.interval; x++)
      domain.push(x);

    this.domain = domain;
    this.range = [...this.range.slice(1), this.fn(live)];

    this.start++;
    this.interval++;

    return {domain: this.domain, range: this.range}
  }
}

const HelloPlot = () => {
  const user = useSelector(state => state.session.user)
  const delay = (time) => new Promise(resolve => setTimeout(resolve,time));

  async function runSimulation(sim,time) {
    while(sim.interval <= sim.stop) {
        console.log(sim.proceed());
        await delay(time);
    }
  }

  const rand_walk = x => {
    const sgn = Math.pow(-1, Math.floor(2*Math.random()));
    const step = sgn * Math.floor(4*Math.random());
    return x + step < 0 ? 0 : x + step;
  }

  const test_sim = new Simulation(30,10, x => rand_walk(x));
  const {domain, range} = test_sim.proceed();

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
