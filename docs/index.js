/**
 * index.js
 * @fileoverview Entry point for the Civic Interconnect App Core.
 */

import "./components/ci-footer/ci-footer.js";
import "./components/ci-header/ci-header.js";
import { patchFooterStatus } from "./utils/ci-footer-status.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("Civic Interconnect App Core initialized");
  patchFooterStatus("./VERSION");
});
