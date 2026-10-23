"use strict";

const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { isBluettiDevice } = require("../lib/scanner");

describe("isBluettiDevice", () => {
  test("matches known advertised-name prefixes, case-insensitively", () => {
    assert.equal(isBluettiDevice("AC180P1234"), true);
    assert.equal(isBluettiDevice("el100v2xyz"), true);
    assert.equal(isBluettiDevice("BLUETTI-1"), true);
  });

  test("rejects other names and a missing name", () => {
    assert.equal(isBluettiDevice("Ruuvi 1234"), false);
    assert.equal(isBluettiDevice("Apple, Inc."), false);
    assert.equal(isBluettiDevice("Espressif Inc."), false);
    assert.equal(isBluettiDevice(""), false);
    assert.equal(isBluettiDevice(undefined), false);
  });

  test("matches BLE Manager's vendor-name substitute for an unnamed device", () => {
    assert.equal(isBluettiDevice("SHENZHEN POWEROAK NEWENER CO., LTD"), true);
  });

  test("matches an unnamed device by PowerOak manufacturer data company ID", () => {
    assert.equal(isBluettiDevice(undefined, ["3846"]), true);
    assert.equal(isBluettiDevice("", [3846]), true);
    assert.equal(isBluettiDevice(undefined, ["76"]), false);
  });
});
