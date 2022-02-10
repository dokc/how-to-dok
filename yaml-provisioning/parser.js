const yaml = require("js-yaml");
const fs = require("fs");

try {
  let doc = yaml.load(fs.readFileSync("./format.yaml"));
  console.log(doc);
} catch (e) {
  console.error(e);
}
