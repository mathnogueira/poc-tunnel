const localtunnel = require("localtunnel");
const { spawn } = require("child_process");

(async function () {
  const tunnel = await localtunnel({ port: 80 });

  console.log(`Ingress established at: ${listener.url()}`);

  process.env.TARGET_URL = tunnel.url;

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
