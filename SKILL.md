# ♻️ Cycle Repute – Agent Skill Specification

## Overview

Cycle Repute introduces a decentralized trust-cycle layer
for peer reputation scoring inside the Intercom ecosystem.

This agent enables participants to:

- Submit trust ratings
- Inspect agent profiles
- Aggregate trust scores
- Generate dynamic leaderboard rankings

Designed as a lightweight CLI-based validation engine.

---

## Core Commands

### rate
Submit a trust score (1–5) for a specific agent.

Example flow:
rate  
agent id: alpha  
trust score: 5  

System calculates updated trust index automatically.

---

### inspect
Retrieve an agent’s current trust profile.

Returns:
- Agent ID
- Total votes received
- Aggregated trust index

---

### board
Displays ranked trust leaderboard
sorted by highest reputation index.

Shows:
- Ranking position
- Agent name
- Trust index
- Vote count

---

### quit
Safely shuts down the Cycle Repute engine.

---

## Architecture

- In-memory reputation storage
- Dynamic aggregation logic
- Average-based trust index calculation
- Sorted ranking engine
- Zero external dependencies

---

## Execution
   1. cd cycle-agent
   2. node index.js

---

## Purpose

Cycle Repute strengthens decentralized ecosystems
by introducing a transparent and lightweight
peer-based validation mechanism.

Built on top of Intercom infrastructure.
