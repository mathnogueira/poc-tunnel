const tunnelmole = require("tunnelmole/cjs");
const { spawn } = require("child_process");

(async function () {
  const url = await tunnelmole({
    port: 80,
  });

  console.log(`Ingress established at: ${url}`);

  process.env.TARGET_URL = url;

  const playwright = spawn("npx", ["playwright", "test"]);

  playwright.stdout.on("data", (data) => {
    console.log(`Playwright output: ${data}`);
  });

  playwright.stderr.on("data", (data) => {
    console.error(`Playwright error: ${data}`);
  });

  playwright.on("close", (code) => {
    console.log(`Playwright process exited with code ${code}`);
    process.exit(code);
  });
})();
