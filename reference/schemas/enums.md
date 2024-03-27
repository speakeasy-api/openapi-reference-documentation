# enums

The OpenAPI Specification (OAS) version 3.x supports the `enum` (enumerated list) keyword for all `schemaObject` object properties, including parameters, request bodies, and responses. Defining an `enum` , according to the JSON Schema Specification. It restricts the value of a JSON property to a fixed set of values. It must be an array with at least one element, and each element must be unique.

For example, the following defines a property called `status`, that must be one of the values `pending`, `approved`, or `rejected`:

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["pending", "approved", "rejected"]
    }
  },
  "required": ["status"]
}

```

Any JSON instance that validates against this schema must have a `status` property with exactly one of the three allowed values, matching case-sensitively. Otherwise, the validation will fail.

The `enum` keyword can be used with any JSON data type, including strings, numbers, objects, arrays, booleans, and the `null` type. The `enum` keyword is however most used with the base `string` and `integer` types. `booleans` are already constrained to the values `true` and `false` (and possibly `null` for a tri-state `boolean`). `enum`s generally make little sense with floating point number types.

Here is an OpenAPI schema that defines a `status` parameter that must be one of the values `pending`, `approved`, or `rejected`:

**YAML**

```yaml
parameters:
  status:
    in: query
    name: status
    required: true
    schema:
      type: string
      enum:
        - pending
        - approved
        - rejected

```

Any API request that includes this `status` parameter must have a value that is one of the three allowed values. Otherwise, the request will be rejected.
