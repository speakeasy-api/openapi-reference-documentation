
# Path Parameters

Path parameters are serialized at runtime to the path of the URL, meaning they are generally serialized to a string representation and must adhere to the [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) specification. Reserved characters are percent-encoded (for example, `?` becomes `%3F`).

By default, path parameters are serialized using `style: simple` and `explode: false` but there are a number of different serialization options available:

- `style: simple` - Simple style serialization is the default serialization for path parameters, using commas (`,`) to separate multiple values. Defined by [RFC 6570](https://tools.ietf.org/html/rfc6570#section-3.2.7).
- `style: label` - Label-style serialization uses dots (`.`) to separate multiple values. Defined by [RFC 6570](https://tools.ietf.org/html/rfc6570#section-3.2.6).
- `style: matrix` - Matrix-style serialization uses semicolons (`;`) to separate multiple values. Defined by [RFC 6570](https://tools.ietf.org/html/rfc6570#section-3.2.5).

## Primitive Types As Path Parameters

Primitive types such as `string`, `number`, `integer`, and `boolean` are serialized as a string. The `style` and `explode` fields determine the prefix for the value generally.

For the examples below, we will use a path parameter named `type` with a value of `cocktail` for a path-templated URL of `/drinks/{type}`.

| Style    |    Explode == `true`     |    Explode == `false`    |
| -------- | :----------------------: | :----------------------: |
| `simple` |    `/drinks/cocktail`    |    `/drinks/cocktail`    |
| `label`  |   `/drinks/.cocktail`    |   `/drinks/.cocktail`    |
| `matrix` | `/drinks/;type=cocktail` | `/drinks/;type=cocktail` |

## Simple Arrays As Path Parameters

For simple arrays of primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `style` and `explode` fields.

For the examples below, we will use a path parameter named `types` with a value of `["gin", "vodka", "rum"]` for a path-templated URL of `/drinks/{types}`.

| Style    |             Explode == `true`              |        Explode == `false`         |
| -------- | :----------------------------------------: | :-------------------------------: |
| `simple` |          `/drinks/gin,vodka,rum`           | `/drinks/gin,vodka,rum` (default) |
| `label`  |          `/drinks/.gin.vodka.rum`          |     `/drinks/.gin,vodka,rum`      |
| `matrix` | `/drinks/;types=gin;types=vodka;types=rum` |  `/drinks/;types=gin,vodka,rum`   |

## Simple Objects As Path Parameters

For simple objects whose fields are primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `style` and `explode` fields.

For the examples below, we will use a path parameter named `filter` with a value of `{"type": "cocktail", "strength": 5}` for a path-templated URL of `/drinks/{filter}`.

| Style    |          Explode == `true`          |              Explode == `false`              |
| -------- | :---------------------------------: | :------------------------------------------: |
| `simple` | `/drinks/type=cocktail,strength=5`  | `/drinks/type,cocktail,strength,5` (default) |
| `label`  | `/drinks/.type=cocktail.strength=5` |     `/drinks/.type,cocktail,strength,5`      |
| `matrix` | `/drinks/;type=cocktail;strength=5` |  `/drinks/;filter=type,cocktail,strength,5`  |

## Complex Objects and Arrays As Path Parameters

For complex objects and arrays, serialization in a path parameter is only really possible using `content` and not any `style` options.

For example, to serialize using JSON, the following:

```yaml
parameters:
  - name: filter
    in: path
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

Would serialize to `/drinks/%7B%22type%22%3A%5B%22cocktail%22%2C%22mocktail%22%5D%2C%22strength%22%3A%5B5%2C10%5D%7D`, which is the equivalent of `/drinks/{"type":["cocktail","mocktail"],"strength":[5,10]}` unencoded.