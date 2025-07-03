/**
 *
 * utils/ui-utils.js
 * Civic Interconnect App Core
 *
 * Shared utility functions for Civic Interconnect UI components
 * and data handling.
 *
 * These utilities support composable web components
 * by providing reusable helpers for slot management
 * and data operations.
 *
 * Usage Example:
 *
 *   import {
 *     createSlotSpan,
 *     sortByKey
 *   } from './ui-utils.js';
 *
 *   // Create a span for a slot
 *   const span = createSlotSpan('version', 'Version: v1.2.3');
 *
 *   // Sort an array of objects
 *   const sorted = sortByKey(myArray, 'label');
 */

/**
 * Creates a <span> element assigned to a named slot
 * with optional text content.
 *
 * This helps dynamically patch slotted content
 * in web components without manually creating
 * DOM nodes each time.
 *
 * @param {string} name - The slot name.
 * @param {string} [value="—"] - The text content for the span.
 * @returns {HTMLSpanElement} The span element with slot assigned.
 */
export function createSlotSpan(name, value = "—") {
  const span = document.createElement("span");
  span.setAttribute("slot", name);
  span.textContent = value;
  return span;
}

/**
 * Sorts an array of objects alphabetically by a given key.
 *
 * Returns a new array, leaving the original array unchanged.
 *
 * @param {Array<Object>} array - The array of objects to sort.
 * @param {string} [key="label"] - The object property to sort by.
 * @returns {Array<Object>} A new sorted array.
 */
export function sortByKey(array, key = "label") {
  return array.slice().sort((a, b) => {
    const aVal = a[key] || "";
    const bVal = b[key] || "";
    return aVal.localeCompare(bVal);
  });
}
