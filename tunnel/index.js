const ngrok = require("@ngrok/ngrok");

(async function () {
  const listener = await ngrok.forward({
    addr: 80,
    authtoken_from_env: true,
  });

  console.log(`Ingress established at: ${listener.url()}`);
})();
