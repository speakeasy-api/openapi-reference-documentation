# Composition and Inheritance

OpenAPI allows us to combine object schemas using the keywords `allOf`, `anyOf`, and `oneOf`.

These keywords correspond to the following logical operators:

| Keyword | Operator | Description                                                                      | How to use                                                |
| ------- | -------- | -------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `oneOf` | `XOR`    | An exclusive disjunction. Instances must satisfy **exactly one of** A, B, or C.  | Use for describing Union Types         |
| `allOf` | `AND`    | A union of all subschemas. Instances must satisfy **all of** A, B, and C.        | Use for describing model composition: the creation of complex schemas via the composition of simpler schemas. |
| `anyOf` | `OR`     | An inclusive disjunction. Instances must satisfy **at least one of** A, B, or C. | There is no established convention about how anyOf should be interpreted. **Use with extreme caution**        |

The example below illustrates the different composition keywords:

```yaml
components:
  schemas:
    # ... Other schemas ...
    Negroni:
      description: A Negroni cocktail. Contains gin, vermouth and campari.
      allOf:
        - $ref: "#/components/schemas/Vermouth"
        - $ref: "#/components/schemas/Gin"
        - $ref: "#/components/schemas/Campari"
    Martini:
      description: A Martini cocktail. Contains gin and vermouth, or vodka and vermouth.
      oneOf:
        - $ref: "#/components/schemas/Vodka"
        - $ref: "#/components/schemas/Gin"
      - $ref: "#/components/schemas/Vermouth"
    Punch:
      description: A Punch cocktail. Contains any combination of alcohol.
      anyOf:
        - $ref: "#/components/schemas/Rum"
        - $ref: "#/components/schemas/Brandy"
        - $ref: "#/components/schemas/Whisky"
        - $ref: "#/components/schemas/Vodka"
        - $ref: "#/components/schemas/Gin"
```

## Discriminator Object

When using `oneOf` to indicate that a request body or response contains exactly one of multiple [Schema Objects](/openapi/schemas), a discriminator object can help the client or server figure out which schema is included in the request or response.

The discriminator object in OpenAPI tells a client or server which field can be used to discriminate between different schemas.

| Field          | Type                      | Required | Description                                                                                                      |
| -------------- | ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `propertyName` | String                    | ✅       | The property name used to discriminate between schemas.                                                          |
| `mapping`      | Map[string, string]       |          | An optional map of values and schema reference strings.                                                          |
| `x-*`          | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the discriminator object that can be used by tooling and vendors. |

In the example below, the Speakeasy Bar can receive one of two order types: A drink order with a bar-counter reference or an ingredient order with a delivery address:

```yaml
components:
  responses:
    OrderResponse:
      oneOf:
        - $ref: "#/components/schemas/DrinkOrder"
        - $ref: "#/components/schemas/IngredientOrder"
```

If we include a discriminator object, the client can indicate the order type so that the server does not need to figure that out:

```yaml
components:
  responses:
    OrderResponse:
      oneOf:
        - $ref: "#/components/schemas/DrinkOrder"
        - $ref: "#/components/schemas/IngredientOrder"
      discriminator:
        propertyName: orderType
```

In the previous example, the value of the `orderType` property will determine the order type. The value of `orderType` must match one of the schema components, so must be either `DrinkOrder` or `IngredientOrder`.

To use values that don't match a schema key, a discriminator object can include a `mapping` property that maps values to schemas. Here's an example:

```yaml
components:
  responses:
    OrderResponse:
      oneOf:
        - $ref: "#/components/schemas/DrinkOrder"
        - $ref: "#/components/schemas/IngredientOrder"
      discriminator:
        propertyName: orderType
        mapping:
          drink: "#/components/schemas/DrinkOrder"
          ingredient: "#/components/schemas/IngredientOrder"
```