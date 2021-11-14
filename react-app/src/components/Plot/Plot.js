import React from 'react';
import {useEffect} from 'react';
import Plot from 'react-plotly.js';

export const SimPlot = ({X, Y, mu, sigma}) => {
  if(true) {
    const layout = {
      autosize: true,
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      title: 'Lognormal',
      font: {color: 'white'},
      xaxis: {
        type:'date',
      },
      yaxis: {
        range: [mu - 20*sigma,
                mu + 20*sigma],
        type: 'linear'
      },
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
        config={{scrollZoom: true}}
        useResizeHandler={true}
      />
    )
  }
}

export const MarketPlot = ({X, Y}) => {
  if(true) {
    const layout = {
      autosize: true,
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      font: {color: 'white'},
      xaxis: {
        type:'date',
      },
      yaxis: {
        type: 'linear'
      },
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
        config={{scrollZoom: true}}
        useResizeHandler={true}
      />);
  }
}
