import SheetLoader from "./sheet-loader.js"
import PageEducators from "./pages/educators.js"
import PageEducatorsMap from "./pages/educators-map.js"
import ComponentEducator from "./components/educator.js"

customElements.define("sheet-loader", SheetLoader);
customElements.define("page-educators", PageEducators);
customElements.define("page-educators-map", PageEducatorsMap);
customElements.define("component-educator", ComponentEducator);

console.log("Hello from HipHopEduRo!")
