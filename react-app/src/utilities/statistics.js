export class Simulation {
  constructor(interval,fn=x=>x) {
    this.start = 0;
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

export class LiveCrypto {
  constructor(interval,api) {
    this.start = 0;
    this.interval = interval;
    this.api = api;
    this.domain = [...Array(interval).keys()];
    this.range = [];
  }

  proceed() {
    if(this.start === 0) this.range = this.domain;

    const domain = [];

    for(let x = this.start; x < this.interval; x++)
      domain.push(x);

    this.domain = domain;
    this.range = [...this.range.slice(1), this.api()];

    this.start++;
    this.interval++;

    return {domain: this.domain, range: this.range}
  }
}

export function gauss_boxmuller() {
  let x = 0;
  let y = 0;
  while(x===0) x = Math.random();
  while(y===0) y = Math.random();
  return Math.sqrt(-2.0 * Math.log(x)) * Math.cos(2.0 * Math.PI * y);
}

export function log_normal() {
  return Math.log(gauss_boxmuller());
}

export const rand_walk = x => {
    const sgn = Math.pow(-1, Math.floor(2*Math.random()));
    const step = sgn * Math.floor(4*Math.random());
    return x + step < 0 ? 0 : x + step;
}

export const gaussian = x => {
    const sgn = Math.pow(-1, Math.floor(2*Math.random()));
    const step = sgn * gauss_boxmuller();
    return x + 0.5 * step;
}
