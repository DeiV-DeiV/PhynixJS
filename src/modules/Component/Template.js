import {deepValue} from '../../helpers/deepValue.js'
import { getDataArray } from "./getDataArray.js";



export function Template(html) {
  const parts = html.split(/{{\s*(.*?)\s*}}/g);

  function renderSingle(data) {
    let out = "";
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        out += parts[i]; // text plane
      } else {
        out += deepValue(parts[i], data); // placeholders
      }
    }
    return out;
  }

  return function render({ data, limits }) {
    const dataArr = getDataArray(data);

    const limitArr =
      typeof limits === "number" ? dataArr.slice(0, limits) : dataArr;

    return limitArr.map(renderSingle).join("");
  };
}
