# Examples

OpenAPI examples improve your API's documentation and SDK developer experience. We can add examples to objects, parameters, or properties using either the `example` or `examples` keyword.

Here's how these keywords differ:

- `example`: A single [Example Object](/openapi/examples).
- `examples`: A map of strings to [Example Objects](/openapi/examples).

In OpenAPI 3.1, the `examples` keyword from JSON Schema is preferred.

Unlike JSON Schema, the OpenAPI `examples` keyword expects an object instead of an array.

It is recommended to add reusable [Example Objects](/openapi/examples) to the `components` object under the `examples` keyword.

## Example Object

We can use the Example Object to add an example of a schema, parameter, or response.

| Field           | Type                      | Required | Description                                                                                                                                |
| --------------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `summary`       | String                    |          | A brief summary of the example.                                                                                                            |
| `description`   | String                    |          | A detailed description of the example. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.   |
| `value`         | Any                       |          | The example value. Mutually exclusive with the `externalValue` field.                                                                      |
| `externalValue` | String                    |          | A URL that points to the example. This is useful if the example is too large to include inline. Mutually exclusive with the `value` field. |
| `x-*`           | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the Example Object that can be used by tooling and vendors.                                 |

The example below illustrates how to add an example to a schema:

```yaml
components:
  examples:
    SugarSyrup:
      summary: An example of a sugar syrup ingredient.
      value:
        name: Sugar Syrup
        type: long-life
        stock: 10
        photo: https://speakeasy.bar/ingredients/sugar_syrup.jpg
```

The example below illustrates how to add an example to an object property:

```yaml
components:
  schemas:
    Ingredient:
      type: object
      properties:
        name:
          type: string
          examples:
            - value: Sugar Syrup
              summary: An example of a sugar syrup ingredient.
              description: A sugar syrup used to sweeten cocktails.
        type:
          $ref: "#/components/schemas/IngredientType"
        stock:
          type: integer
          readOnly: true
          examples:
            - value: 10
              summary: An example of the number of units in stock.
              description: The number of units of the ingredient in stock, only available when authenticated.
        productCode:
          $ref: "#/components/schemas/IngredientProductCode"
        photo:
          type: string
          format: uri
          examples:
            - value: https://example.com/sugarsyrup.jpg
```
