import validate from "./validate";

const args = process.argv.slice(2);
if (args[0] === "--validate") {
  validate();
}
