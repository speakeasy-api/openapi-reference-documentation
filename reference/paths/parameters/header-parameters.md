# Header Parameters

Header parameters are serialized at runtime to the HTTP headers of the request. Types are generally serialized to a string representation, and only `simple` style is available.

Explode defaults to `false`.

There are a few reserved headers that cannot be used as parameter names and are enabled by other OpenAPI features:

- `Accept` - Defining content types in the [Response Object](/openapi/paths/operations/responses#response-object) `content` field, documents the available values for the `Accept` header.
- `Authorization` - Defining security requirements in the [Security Requirement Object](/openapi/security#security-requirement-object) `security` field, documents that the `Authorization` header is required.
- `Content-Type` - Defining content types in the [Request Body Object](/openapi/paths/operations/requests) `content` field, documents that the `Content-Type` header is required and the acceptable values.

If using headers for authentication, it is recommended to use the OpenAPI [`security`](/openapi/security) field to document a security scheme instead of a header parameter.

## Primitive Types As Headers

Primitive types such as `string`, `number`, `integer`, and `boolean` are serialized as a string.

For the example below, we will use a header parameter named `X-Drink-Limit` with a value of `5`.

| Style    | Explode == `true` |     Explode == `false`      |
| -------- | :---------------: | :-------------------------: |
| `simple` | `X-Drink-Type: 5` | `X-Drink-Type: 5` (default) |

## Simple Arrays As Headers

For simple arrays of primitive types such as `string`, `number`, `integer`, and `boolean`, the `style` and `explode` fields have little effect on the serialization.

For the example below, we will use a header parameter named `X-Drink-Types` with a value of `["gin", "vodka", "rum"]`.

| Style    |       Explode == `true`       |           Explode == `false`            |
| -------- | :---------------------------: | :-------------------------------------: |
| `simple` | `X-Drink-Type: gin,vodka,rum` | `X-Drink-Type: gin,vodka,rum` (default) |

## Simple Objects As Headers

For simple objects whose fields are primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `explode` field.

For the example below, we will use a header parameter named `X-Drink-Filter` with a value of `{"type": "cocktail", "strength": 5}`.

| Style    |            Explode == `true`             |                 Explode == `false`                 |
| -------- | :--------------------------------------: | :------------------------------------------------: |
| `simple` | `X-Drink-Type: type=cocktail,strength=5` | `X-Drink-Type: type,cocktail,strength,5` (default) |

## Complex Objects and Arrays As Headers

For complex objects and arrays, serialization in a header parameter is only really possible using `content` and not any `style` options.

For example, to serialize using JSON, the following:

```yaml
parameters:
  - name: X-Drink-Filter
    in: header
    content:
      application/json:
        schema:
          type: object
          properties:
            type:
              type: array
              items:
                type: string
            strength:
              type: array
              items:
                type: integer
```

Would serialize to `X-Drink-Filter: {"type":["cocktail","mocktail"],"strength":[5,10]}`.