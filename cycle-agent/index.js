const readline = require("readline");
const Cycle = require("./engine");

const cycle = new Cycle();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function header() {
  console.clear();
  console.log("╔════════════════════════════════════╗");
  console.log("║        ♻️  CYCLE REPUTE v2        ║");
  console.log("╚════════════════════════════════════╝\n");

  console.log("type one of the commands below:\n");
  console.log("• rate        → submit trust score");
  console.log("• inspect     → check agent profile");
  console.log("• board       → show trust ranking");
  console.log("• quit        → shutdown system\n");
}

function prompt() {
  rl.question("cycle> ", (cmd) => {

    if (cmd === "rate") {
      rl.question("agent id: ", (name) => {
        rl.question("trust score (1-5): ", (score) => {

          const result = cycle.rate(name, parseInt(score));

          console.log("\n━━━━━━━━━━━━━━━━━━━━");
          console.log("✓ TRUST UPDATED");
          console.log("━━━━━━━━━━━━━━━━━━━━");
          console.log(`agent       : ${result.agent}`);
          console.log(`total votes : ${result.votes}`);
          console.log(`trust index : ${result.reputation}`);
          console.log("━━━━━━━━━━━━━━━━━━━━\n");

          prompt();
        });
      });

    } else if (cmd === "inspect") {
      rl.question("agent id: ", (name) => {

        const result = cycle.summary(name);

        console.log("\n━━━━━━━━━━━━━━━━━━━━");
        console.log("🔎 AGENT PROFILE");
        console.log("━━━━━━━━━━━━━━━━━━━━");

        if (result) {
          console.log(`agent       : ${result.agent}`);
          console.log(`total votes : ${result.votes}`);
          console.log(`trust index : ${result.reputation}`);
        } else {
          console.log("no reputation record found.");
        }

        console.log("━━━━━━━━━━━━━━━━━━━━\n");

        prompt();
      });

    } else if (cmd === "board") {

      const board = cycle.leaderboard();

      console.log("\n════════ TRUST BOARD ════════");

      if (board.length === 0) {
        console.log("no agents rated yet.");
      } else {
        board.forEach((a, i) => {
          console.log(`#${i + 1}  ${a.agent}  →  ${a.reputation} (${a.votes} votes)`);
        });
      }

      console.log("═════════════════════════════\n");

      prompt();

    } else if (cmd === "quit") {
      console.log("\ncycle repute shutting down…\n");
      rl.close();

    } else {
      console.log("\nunknown command.\n");
      prompt();
    }

  });
}

header();
prompt();
