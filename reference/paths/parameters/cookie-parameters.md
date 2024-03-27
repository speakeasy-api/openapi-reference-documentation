# Cookie Parameters

Cookie parameters are serialized at runtime to an HTTP cookie header. Types are generally serialized to a string representation, and only `form` style is available.

Currently, cookies are not well supported by OpenAPI and this may change in the future, so using the default `style: form` and `explode: true` values results in serialization incompatible with most cookie parsers.

Therefore, it is recommended to only use cookies for primitive types or arrays with `explode: false`, but the current serialization behaviors are included below for completeness.

If using cookies for authentication, it is recommended to use the OpenAPI [`security`](/openapi/security) field to document a security scheme instead of a cookie parameter.

## Primitive Types As Cookies

Primitive types such as `string`, `number`, `integer`, and `boolean` are serialized as a string.

For the example below, we will use a cookie parameter named `drink-limit` with a value of `5`.

| Style  |         Explode == `true`         |   Explode == `false`    |
| ------ | :-------------------------------: | :---------------------: |
| `form` | `Cookie: drink-limit=5` (default) | `Cookie: drink-limit=5` |

## Simple Arrays As Cookies

For simple arrays of primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `explode` field.

For the example below, we will use a cookie parameter named `drink-types` with a value of `["gin", "vodka", "rum"]`.

| Style  |                           Explode == `true`                           |         Explode == `false`          |
| ------ | :-------------------------------------------------------------------: | :---------------------------------: |
| `form` | `Cookie: drink-types=gin&drink-types=vodka&drink-types=rum` (default) | `Cookie: drink-types=gin,vodka,rum` |

## Simple Objects As Cookies

For simple objects whose fields are primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `explode` field.

For the example below, we will use a cookie parameter named `drink-filter` with a value of `{"type": "cocktail", "strength": 5}`.

| Style  |              Explode == `true`               |               Explode == `false`                |
| ------ | :------------------------------------------: | :---------------------------------------------: |
| `form` | `Cookie: type=cocktail&strength=5` (default) | `Cookie: drink-filter=type,cocktail,strength,5` |

## Complex Objects and Arrays As Cookies

For complex objects and arrays, serialization in a cookie parameter is only really possible using `content` and not any `style` options.

For example, to serialize using JSON, the following:

```yaml
parameters:
  - name: drink-filter
    in: cookie
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

Would serialize to `Cookie: drink-filter={"type":["cocktail","mocktail"],"strength":[5,10]}`.