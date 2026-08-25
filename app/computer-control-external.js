"use strict";

const fs = require("node:fs");
const path = require("node:path");

const explicitAdapter = process.env.RUMIAI_COMPUTER_CONTROL_ADAPTER;
const installationHome = process.env.RUMIAI_COMPUTER_CONTROL_HOME;
const adapterPath = explicitAdapter || (installationHome && path.join(
  installationHome,
  "adapters",
  "rumiai",
  "compat.js"
));

if (!adapterPath) {
  throw new Error(
    "External Computer Control is not configured. Set " +
    "RUMIAI_COMPUTER_CONTROL_HOME or RUMIAI_COMPUTER_CONTROL_ADAPTER."
  );
}

if (!fs.existsSync(adapterPath)) {
  throw new Error(
    `RumiAI Computer Control adapter not found: ${adapterPath}. ` +
    "Install rumiai-computer-control through Portable Runtime or set its adapter path."
  );
}

module.exports = require(path.resolve(adapterPath));
