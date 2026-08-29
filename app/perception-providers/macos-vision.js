"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const SOURCE = path.join(__dirname, "macos-vision-text-region.swift");
const CACHE_DIR = process.env.RUMIAI_PERCEPTION_CACHE_DIR ||
  path.join(os.tmpdir(), "rumiai-computer-use-perception");
const EXPLICIT_HELPER = process.env.RUMIAI_MACOS_VISION_HELPER || "";

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding:"utf8",
    maxBuffer:32 * 1024 * 1024,
    ...options,
  });
}

function swiftcAvailable() {
  if (process.platform !== "darwin") return false;
  if (!fs.existsSync("/usr/bin/xcrun")) return false;
  const found = run("/usr/bin/xcrun", ["--find", "swiftc"]);
  return (found.status ?? 1) === 0 && Boolean(String(found.stdout || "").trim());
}

function macOSVisionAvailability() {
  if (process.platform !== "darwin") {
    return {available:false, reason:"PLATFORM_NOT_DARWIN"};
  }

  if (EXPLICIT_HELPER) {
    return fs.existsSync(EXPLICIT_HELPER)
      ? {available:true, reason:"EXPLICIT_HELPER_AVAILABLE"}
      : {available:false, reason:"EXPLICIT_HELPER_MISSING"};
  }

  if (!fs.existsSync(SOURCE)) {
    return {available:false, reason:"PROVIDER_SOURCE_MISSING"};
  }

  if (!swiftcAvailable()) {
    return {available:false, reason:"SWIFTC_UNAVAILABLE"};
  }

  return {available:true, reason:"LOCAL_VISION_TOOLCHAIN_AVAILABLE"};
}

function helperPath() {
  if (EXPLICIT_HELPER) return EXPLICIT_HELPER;
  return path.join(CACHE_DIR, "macos-vision-text-region");
}

function ensureHelper() {
  const availability = macOSVisionAvailability();
  if (!availability.available) {
    return {
      ok:false,
      error:"PERCEPTION_PROVIDER_UNAVAILABLE",
      detail:availability.reason,
      recoveryPolicy:"NONE",
    };
  }

  const helper = helperPath();
  if (EXPLICIT_HELPER) return {ok:true, helper};

  try {
    fs.mkdirSync(CACHE_DIR, {recursive:true});
    const sourceMtime = fs.statSync(SOURCE).mtimeMs;
    const helperFresh = fs.existsSync(helper) && fs.statSync(helper).mtimeMs >= sourceMtime;

    if (!helperFresh) {
      const compiled = run("/usr/bin/xcrun", [
        "swiftc",
        "-framework", "Vision",
        "-framework", "AppKit",
        SOURCE,
        "-o", helper,
      ]);

      if ((compiled.status ?? 1) !== 0 || !fs.existsSync(helper)) {
        return {
          ok:false,
          error:"PERCEPTION_PROVIDER_BUILD_FAILED",
          detail:String(compiled.stderr || compiled.stdout || "swiftc failed").trim().slice(0, 1200),
          recoveryPolicy:"NONE",
        };
      }
    }
  } catch (error) {
    return {
      ok:false,
      error:"PERCEPTION_PROVIDER_BUILD_FAILED",
      detail:error?.message || "helper build failed",
      recoveryPolicy:"NONE",
    };
  }

  return {ok:true, helper};
}

function observe(frame) {
  const prepared = ensureHelper();
  if (!prepared.ok) return prepared;

  let png;
  try {
    png = Buffer.from(String(frame?.dataBase64 || ""), "base64");
  } catch (error) {
    return {
      ok:false,
      error:"PERCEPTION_PROVIDER_FRAME_INVALID",
      detail:error?.message || "invalid base64 frame",
      recoveryPolicy:"NONE",
    };
  }

  if (!png.length) {
    return {
      ok:false,
      error:"PERCEPTION_PROVIDER_FRAME_INVALID",
      detail:"empty frame payload",
      recoveryPolicy:"NONE",
    };
  }

  const executed = spawnSync(prepared.helper, [], {
    input:png,
    encoding:"utf8",
    maxBuffer:32 * 1024 * 1024,
  });

  if ((executed.status ?? 1) !== 0) {
    return {
      ok:false,
      error:"PERCEPTION_PROVIDER_FAILED",
      detail:String(executed.stderr || "macOS Vision helper failed").trim().slice(0, 1200),
      recoveryPolicy:"NONE",
    };
  }

  try {
    return JSON.parse(String(executed.stdout || "").trim());
  } catch (error) {
    return {
      ok:false,
      error:"PERCEPTION_PROVIDER_RESPONSE_INVALID",
      detail:error?.message || "invalid helper response",
      recoveryPolicy:"NONE",
    };
  }
}

function createMacOSVisionTextRegionProvider() {
  return {
    id:"rumiai.local.macos-vision-text-region",
    locality:"local",
    capabilities:["text-region"],
    availability:{check:macOSVisionAvailability},
    requirements:{
      platform:"darwin",
      network:false,
      account:false,
      cloudApi:false,
    },
    observe,
  };
}

module.exports = {
  SOURCE,
  macOSVisionAvailability,
  createMacOSVisionTextRegionProvider,
};
