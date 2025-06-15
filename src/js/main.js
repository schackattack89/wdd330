import { loadHeaderFooter } from "./utils.mjs";
import loadAlerts from "./alerts.mjs";

loadHeaderFooter()
loadAlerts();

renderListWithTemplate(productCardTemplate, el, data);