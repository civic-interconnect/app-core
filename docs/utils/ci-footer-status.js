/**
 * utils/ci-footer-status.js
 * Civic Interconnect App Core
 *
 * Patches the <ci-footer> component with version and
 * last updated data fetched from either:
 *    - a VERSION text file
 *    - a JSON endpoint
 *
 * This enables Civic Interconnect apps to dynamically
 * display build or deployment metadata in the shared footer.
 *
 * Usage:
 *
 *   import { patchFooterStatus } from './ci-footer-status.js';
 *
 *   patchFooterStatus('./VERSION');
 *   // or:
 *   patchFooterStatus('./status.json');
 *
 * The function auto-detects file format (text vs JSON).
 */

import { createSlotSpan } from "./ui-utils.js";

/**
 * Loads version info from a file and patches the <ci-footer>.
 *
 * @param {string} [versionPath="./VERSION"]
 *   Path to the VERSION file or JSON file containing:
 *      {
 *        "dashboard_version": "...",
 *        "generated": "..."
 *      }
 */
export async function patchFooterStatus(versionPath = "./VERSION") {
  let version = "v0.0.0";
  let updated = new Date().toISOString().split("T")[0];

  try {
    const res = await fetch(versionPath);

    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const json = await res.json();
        version = json.dashboard_version || version;
        updated = json.generated || updated;
      } else {
        // Assume plain text VERSION file
        version = (await res.text()).trim();
      }
    }
  } catch (e) {
    console.error(`Failed to fetch version info from ${versionPath}:`, e);
  }

  const footer = document.querySelector("ci-footer");
  if (footer) {
    footer
      .querySelector('[slot="version"]')
      ?.replaceWith(
        createSlotSpan("version", `Version: ${version}`)
      );

    footer
      .querySelector('[slot="updated"]')
      ?.replaceWith(
        createSlotSpan("updated", `Updated: ${updated}`)
      );
  }
}
