export class Simulation {
  constructor(history, fn, mu, sigma) {
    this.mu = mu;
    this.sigma = sigma;
    this.realtime = [...history];
    this.fn = fn;
    this.domain = this.realtime.map(datapoint => datapoint.time);
    this.range = this.realtime.map(datapoint => datapoint.price);
  }

  initialize() {
    if (!this.realtime.length) {
      const interval = 50;
      const past = Date.now() - 1000*interval
      this.domain = (()=>new Array(interval).fill(0))().map((_,i) => past + i*1000);
      this.realtime = this.domain
                          .map(d => ({time:d, price:this.fn(this.mu, this.sigma)}));
    }
  }

  proceed() {
    const uTime = Date.now()

    this.realtime = [...this.realtime.slice(1),
                     {time: uTime, price: this.fn(this.mu, this.sigma)}];

    this.domain = this.realtime.map(datapoint => datapoint.time);
    this.range = this.realtime.map(datapoint => datapoint.price);

    return {domain: this.domain, range: this.range}
  }

  zip() {
    return JSON.stringify(
      this.domain.map((timestamp, t) => ({time:timestamp, price:this.range[t]}))
    );
  }
}

export class Market {
  constructor(name) {
    this.name = name
    this.history = [];
    this.realtime = [];
    this.domain = this.realtime.map(datapoint => datapoint.time);
    this.range = this.realtime.map(datapoint => datapoint.price);
  }

  async fetchHistory() {
    console.log('hello from fetchHistory()')
    const res = await fetch(`/api/cryptocurrencies/${this.name}`);
    console.log('awaiting json response')
    const history = await res.json();
    console.log('history: ', history)
    return history
  }

  initialize() {
    if (!this.realtime.length) {
      const interval = 15;
      const past = Date.now() - 1000*interval
      this.domain = (()=>new Array(interval).fill(0))().map((_,i) => past + i*1000);
      this.realtime = this.domain
                          .map(d => ({time:d, price:this.api_call}));
    }
  }

  proceed() {
    const uTime = Date.now()
    this.realtime = [...this.realtime.slice(1),
                     {time: uTime, price: this.api_call}];

    this.domain = this.realtime.map(datapoint => datapoint.time);
    this.range = this.realtime.map(datapoint => datapoint.price);

    return {domain: this.domain, range: this.range}
  }

  zip() {
    return JSON.stringify(
      this.domain.map((timestamp, t) => ({time:timestamp, price:this.range[t]}))
    );
  }
}

// This is the Box-Muller transform implemented in JavaScript. For a mean value
// mu and standard deviation sigma, we transform as follows
// https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
export function gaussianNoise_boxmuller(mu, sigma) {
  let x = 0;
  let y = 0;
  while(x===0) x = Math.random();
  while(y===0) y = Math.random();  const magnitude = sigma * Math.sqrt(-2.0 * Math.log(x))
  return (magnitude * (Math.sqrt(-2.0 * Math.log(x))
                    * Math.cos(2.0 * Math.PI * y))) + mu;
}

// By definition, a variable has a lognormal distribution if
export function log_normal(mu, sigma) {
  //You need to convert to the variance space of the log distribution.
  //https://www.quora.com/How-do-I-transform-between-log-normal-distribution-and-normal-distribution
  const sigma_log = Math.sqrt(Math.log(1 + (sigma/mu)*(sigma/mu)))
  const mu_log = Math.log(mu) - (1/2)*sigma_log*sigma_log
  return Math.exp(gaussianNoise_boxmuller(mu_log, sigma_log));
}

export const rand_walk = x => {
  const sgn = Math.pow(-1, Math.floor(2*Math.random()));
  const step = sgn * Math.floor(4*Math.random());
  return x + step < 0 ? 0 : x + step;
}
