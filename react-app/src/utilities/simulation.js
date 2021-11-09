export class Simulation {
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

export function gauss_boxmuller() {
  let x = 0;
  let y = 0;
  while(x===0) x = Math.random();
  while(y===0) y = Math.random();
}
