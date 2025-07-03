/**
 * components/ci-footer/ci-footer.js
 * Civic Interconnect App Core
 *
 * Web component for a shared Civic Interconnect footer.
 *
 * This footer provides standardized branding and metadata links,
 * including:
 *   - site URL
 *   - source code URL
 *   - dashboard version
 *   - last updated date
 *   - copyright notice
 *
 * Default values are provided, but client apps can override
 * any content via:
 *   - attributes
 *   - slotted elements
 *
 * Usage Example:
 *
 *   <ci-footer
 *     dashboardVersion="v0.0.1"
 *     lastUpdated="2025-07-01"
 *     siteURL="https://civic-interconnect.github.io/geo-explorer/"
 *     sourceURL="https://github.com/civic-interconnect/geo-explorer"
 *   ></ci-footer>
 *
 * Or:
 *
 *   <ci-footer>
 *     <a slot="siteURL" href="https://example.com">Custom Site</a>
 *     <span slot="copyright">&copy; 2026 My Company</span>
 *   </ci-footer>
 */

const styleURL = new URL("./ci-footer.css", import.meta.url);
const templateURL = new URL("./ci-footer.html", import.meta.url);

/**
 * Defines the <ci-footer> web component.
 */
class CiFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Loads the template and CSS, and fills slots with
   * attribute-based defaults if no slotted content is provided.
   */
  async connectedCallback() {
    const [style, html] = await Promise.all([
      fetch(styleURL).then((res) => res.text()),
      fetch(templateURL).then((res) => res.text()),
    ]);

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${html}
    `;

    this.setSlotText(
      "version",
      `Version: ${this.getAttribute("dashboardVersion") || "v0.0.0"}`
    );

    this.setSlotText(
      "updated",
      `Updated: ${
        this.getAttribute("lastUpdated") || new Date().toLocaleDateString()
      }`
    );

    this.setSlotText(
      "copyright",
      this.getAttribute("copyright") ||
        `© ${new Date().getFullYear()} Civic Interconnect`
    );

    this.setSlotHref(
      "siteURL",
      this.getAttribute("siteURL") ||
        "https://civic-interconnect.github.io/app-core/"
    );

    this.setSlotHref(
      "sourceURL",
      this.getAttribute("sourceURL") ||
        "https://github.com/civic-interconnect/app-core"
    );
  }

  /**
   * Replaces the fallback content of a slot with
   * a new text span if no content is slotted.
   *
   * @param {string} slotName - The slot name.
   * @param {string} fallbackText - The fallback text.
   */
  setSlotText(slotName, fallbackText) {
    const slot = this.shadowRoot.querySelector(`slot[name="${slotName}"]`);
    if (slot && slot.assignedNodes().length === 0) {
      slot.innerHTML = fallbackText;
    }
  }

  /**
   * Updates the href of a default anchor in a slot if
   * no content is slotted by the client.
   *
   * @param {string} slotName - The slot name.
   * @param {string} fallbackHref - The fallback URL.
   */
  setSlotHref(slotName, fallbackHref) {
    const slot = this.shadowRoot.querySelector(`slot[name="${slotName}"]`);
    if (slot && slot.assignedNodes().length === 0) {
      const defaultAnchor = slot.querySelector("a");
      if (defaultAnchor) {
        defaultAnchor.setAttribute("href", fallbackHref);
      }
    }
  }
}

customElements.define("ci-footer", CiFooter);
