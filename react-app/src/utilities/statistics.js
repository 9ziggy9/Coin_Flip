export class Simulation {
  constructor(history, fn, mu, sigma) {
    this.mu = mu;
    this.sigma = sigma;
    this.realtime = [...history];
    this.fn = fn;
    this.domain = this.realtime.map(datapoint => datapoint.time);
    this.range = this.realtime.map(datapoint => datapoint.price);
    console.log('\n\n\n\n\n simulation created \n\n\n\n\n\n');
  }

  static initialize(length, fn, mu, sigma) {
    if (length < 365) {
      const past = Date.now() - 1000*length
      const domain = (()=>new Array(length).fill(0))().map((_,i) => past + i*1000);
      const range = domain.map(() => fn(mu, sigma));
      return {domain: domain, range: range}
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

  static zip(domain, range) {
    return domain.map((timestamp, t) => ({time:timestamp, price:range[t]}))
  }
}

export class Market {
  constructor(name) {
    this.name = name
    this.domain = [];
    this.range = [];
    console.log('\n\n\n Market initialized \n\n\n')
  }

  async fetchHistory() {
    const res = await fetch(`/api/cryptocurrencies/${this.name}`);
    const history = await res.json();
    return history.prices;
  }

  async proceed(interval) {
    if (interval > 365) {
      console.log('Error: desired time length out of bounds')
      console.log('Pleae supply a number of days less than 365')
      return {domain: 0, range: 0}
    }
    const res = await this.fetchHistory();
    const past = res.slice(-interval);
    console.log('retrieved history')
    this.domain = past.map(datapoint => datapoint[0]);
    this.range = past.map(datapoint => Number(datapoint[1].toFixed(2)));
    return {domain: this.domain, range: this.ranger}
  }

  static async intialize(name, interval) {
    if (interval > 365) {
      console.log('Error: desired time length out of bounds')
      console.log('Pleae supply a number of days less than 365')
      return {domain: 0, range: 0}
    }
    const res = await fetch(`/api/cryptocurrencies/${name}`)
    const history = await res.json();
    const past = history.slice(-interval);
    console.log('retrieved history')
    this.domain = past.map(datapoint => datapoint[0]);
    this.range = past.map(datapoint => Number(datapoint[1].toFixed(2)));
    return {domain: this.domain, range: this.ranger}
  }
}

// This is the Box-Muller transform implemented in JavaScript. For a mean value
// mu and standard deviation sigma, we transform as follows
// https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
export function gaussianNoise_boxmuller(mu, sigma) {
  let x = 0;
  let y = 0;
  while(x===0) x = Math.random();
  while(y===0) y = Math.random();
  const magnitude = sigma * Math.sqrt(-2.0 * Math.log(x))
  return (magnitude * (Math.sqrt(-2.0 * Math.log(x))
                    * Math.cos(2.0 * Math.PI * y))) + mu;
}

// By definition, a variable has a lognormal distribution if the natural log
// of its sample space is normall distributed
//NOTE: You need to convert to the variance space of the log distribution.
//https://www.quora.com/How-do-I-transform-between-log-normal-distribution-and-normal-distribution
export function log_normal(mu, sigma) {
  const sigma_log = Math.sqrt(Math.log(1 + (sigma/mu)*(sigma/mu)))
  const mu_log = Math.log(mu) - (1/2)*sigma_log*sigma_log
  return Math.exp(gaussianNoise_boxmuller(mu_log, sigma_log));
}

export const rand_walk = x => {
  const sgn = Math.pow(-1, Math.floor(2*Math.random()));
  const step = sgn * Math.floor(4*Math.random());
  return x + step < 0 ? 0 : x + step;
}
