import readline from "readline";
import crypto from "crypto";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];

function bar(score) {
  const max = 1000;
  const percent = Math.min(score / max, 1);
  const filled = Math.floor(percent * 20);
  return "█".repeat(filled) + "░".repeat(20 - filled);
}

function tier(score) {
  if (score >= 1000) return "◆ ELITE";
  if (score >= 500) return "◆ TRUSTED";
  if (score >= 200) return "◆ STANDARD";
  return "◆ LOW";
}

function decay(user) {
  const now = Date.now();
  const hours = (now - user.last) / (1000 * 60 * 60);
  const loss = user.score * 0.02 * hours;
  user.score = Math.max(0, user.score - loss);
  user.last = now;
}

function header() {
  console.clear();
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║        CYCLE REPUTE  •  GRID PANEL          ║");
  console.log("║        Reputation Decay Dashboard v2        ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log("");
}

function render() {
  header();

  if (users.length === 0) {
    console.log("┌──────────────────────────────────────────────┐");
    console.log("│  No registered users                        │");
    console.log("└──────────────────────────────────────────────┘\n");
  }

  users.forEach(u => {
    decay(u);
    console.log("┌──────────────────────────────────────────────┐");
    console.log("│ ID     :", u.id.padEnd(30), "│");
    console.log("│ Name   :", u.name.padEnd(30), "│");
    console.log("│ Score  :", u.score.toFixed(2).padEnd(30), "│");
    console.log("│ Tier   :", tier(u.score).padEnd(30), "│");
    console.log("│ Bar    :", bar(u.score).padEnd(30), "│");
    console.log("└──────────────────────────────────────────────┘\n");
  });

  console.log("COMMANDS");
  console.log("────────────────────────");
  console.log("register  | gain");
  console.log("lose      | history");
  console.log("list      | exit");
  console.log("");
}

function prompt() {
  rl.question("repute-grid> ", handle);
}

function registerUser() {
  rl.question("Username: ", name => {
    users.push({
      id: crypto.randomBytes(3).toString("hex"),
      name,
      score: 100,
      history: [],
      last: Date.now()
    });
    render();
    prompt();
  });
}

function modify(type) {
  rl.question("User ID: ", id => {
    const user = users.find(u => u.id === id);
    if (!user) return prompt();

    rl.question("Amount: ", amt => {
      const val = parseFloat(amt);
      decay(user);

      if (type === "gain") user.score += val;
      if (type === "lose") user.score = Math.max(0, user.score - val);

      user.history.push({ type, val, time: Date.now() });

      render();
      prompt();
    });
  });
}

function showHistory() {
  rl.question("User ID: ", id => {
    const user = users.find(u => u.id === id);
    if (!user) return prompt();

    console.log("\n┌──────── HISTORY ────────┐");
    user.history.forEach(h => {
      console.log(h.type.toUpperCase(), h.val, new Date(h.time).toLocaleString());
    });
    console.log("└──────────────────────────┘\n");
    prompt();
  });
}

function handle(cmd) {
  switch (cmd.trim()) {
    case "register":
      registerUser();
      break;
    case "gain":
      modify("gain");
      break;
    case "lose":
      modify("lose");
      break;
    case "history":
      showHistory();
      break;
    case "list":
      render();
      prompt();
      break;
    case "exit":
      console.log("\nEngine terminated.");
      rl.close();
      break;
    default:
      render();
      prompt();
  }
}

render();
prompt();
