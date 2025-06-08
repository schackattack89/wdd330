import { productList } from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import loadAlerts from "./alerts.mjs";

loadHeaderFooter()
loadAlerts();
productList(".product-list", "tents");