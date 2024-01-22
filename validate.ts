import { Validator } from "@seriousme/openapi-schema-validator";

const validate = async () => {
  const validator = new Validator();
  const res = await validator.validate("./openapi.yaml");
  // const specification = validator.specification;
  // specification now contains a Javascript object containing the specification
  if (res.valid) {
    console.log("Specification matches schema for version", validator.version);
    // const schema = validator.resolveRefs();
    // schema now contains a Javascript object containing the dereferenced schema
  } else {
    console.log("Specification does not match Schema");
    console.log(res.errors);
  }
};

export default validate;
