
import "./components/ci-footer/ci-footer.js";
import "./components/ci-header/ci-header.js";





function createSlotSpan(name, value = "—") {
  const span = document.createElement("span");
  span.setAttribute("slot", name);
  span.textContent = value;
  return span;
}
