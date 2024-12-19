const ngrok = require("@ngrok/ngrok");
const { spawn } = require("child_process");

(async function () {
  const listener = await ngrok.forward({
    addr: 80,
    authtoken_from_env: true,
  });

  console.log(`Ingress established at: ${listener.url()}`);

  process.env.TARGET_URL = listener.url();

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
