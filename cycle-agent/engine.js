class CycleRepute {
  constructor() {
    this.network = {};
  }

  rate(agent, score) {
    if (!this.network[agent]) {
      this.network[agent] = [];
    }

    this.network[agent].push(score);
    return this.summary(agent);
  }

  summary(agent) {
    const scores = this.network[agent];
    if (!scores) return null;

    const total = scores.reduce((a, b) => a + b, 0);
    const avg = total / scores.length;

    return {
      agent,
      votes: scores.length,
      reputation: avg.toFixed(2)
    };
  }

  leaderboard() {
    return Object.keys(this.network)
      .map(a => this.summary(a))
      .sort((a, b) => b.reputation - a.reputation);
  }
}

module.exports = CycleRepute;
