# Query Parameters

Query parameters are serialized at runtime to the query string of the URL, meaning they are generally serialized to a string representation and must adhere to the [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) specification. By default, reserved characters are percent-encoded (for example, `?` becomes `%3F`) but this can be disabled by setting `allowReserved` to `true`.

By default, query parameters are serialized using `style: form` and `explode: true` but there are a number of different serialization options available:

- `style: form` - Form style serialization is the default serialization for query parameters. It generally uses ampersands (`&`) to separate multiple values and equals (`=`) to separate the key and value. Defined by [RFC 6570](https://tools.ietf.org/html/rfc6570#section-3.2.8).
- `style: pipeDelimited` - Pipe-delimited serialization uses pipes (`|`) to separate multiple values.
- `style: spaceDelimited` - Space-delimited serialization uses percent-encoded spaces (`%20`) to separate multiple values.
- `style: deepObject` - Deep-object serialization uses nested objects to represent the parameter value.

## Primitive Types As Query Parameters

For primitive types such as `string`, `number`, `integer,` and `boolean`, the serialization is straightforward and the value is serialized as a string. The `style` and `explode` fields have little effect on the serialization.

For the examples below, we will use a query parameter named `limit` with a value of `10`.

| Style            |      Explode == `true`      | Explode == `false` |
| ---------------- | :-------------------------: | :----------------: |
| `form`           | `/query?limit=10` (default) | `/query?limit=10`  |
| `pipeDelimited`  |      `/query?limit=10`      | `/query?limit=10`  |
| `spaceDelimited` |      `/query?limit=10`      | `/query?limit=10`  |
| `deepObject`     |        **NOT VALID**        |   **NOT VALID**    |

## Simple Arrays As Query Parameters

For simple arrays of primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `style` and `explode` fields.

For the examples below, we will use a query parameter named `terms` with a value of `["gin", "vodka", "rum"]`.

| Style            |                 Explode == `true`                  |        Explode == `false`        |
| ---------------- | :------------------------------------------------: | :------------------------------: |
| `form`           | `/query?terms=gin&terms=vodka&terms=rum` (default) |   `/query?terms=gin,vodka,rum`   |
| `pipeDelimited`  |      `/query?terms=gin&terms=vodka&terms=rum`      |  `/query?terms=gin\|vodka\|rum`  |
| `spaceDelimited` |      `/query?terms=gin&terms=vodka&terms=rum`      | `/query?terms=gin%20vodka%20rum` |
| `deepObject`     |                   **NOT VALID**                    |          **NOT VALID**           |

## Simple Objects As Query Parameters

For simple objects whose fields are primitive types such as `string`, `number`, `integer`, and `boolean`, serialization will vary depending on the `style` and `explode` fields.

For the examples below, we will use a query parameter named `filter` with a value of `{"type": "cocktail", "strength": 5}`.

| Style            |                 Explode == `true`                 |               Explode == `false`               |
| ---------------- | :-----------------------------------------------: | :--------------------------------------------: |
| `form`           |    `/query?type=cocktail&strength=5` (default)    |    `/query?filter=type,cocktail,strength,5`    |
| `pipeDelimited`  |         `/query?type=cocktail&strength=5`         |  `/query?filter=type\|cocktail\|strength\|5`   |
| `spaceDelimited` |         `/query?type=cocktail&strength=5`         | `/query?filter=type%20cocktail%20strength%205` |
| `deepObject`     | `/query?filter[type]=cocktail&filter[strength]=5` |                 **NOT VALID**                  |

There is a special case for simple objects with fields that are an array of primitive types such as `string`, `number`, `integer`, and `boolean` that can be handled by `style: deepObject` and `explode: true`. For example, for a query parameter named `filter` with a value of `{"type": ["cocktail", "mocktail"], "strength": [5, 10]}`, this will be serialized like `/query?filter[type]=cocktail&filter[type]=mocktail&filter[strength]=5&filter[strength]=10`.

## Complex Objects and Arrays As Query Parameters

For complex objects and arrays, serialization in a query parameter is only really possible using `content` and not any `style` options.

For example, to serialize using JSON, the following:

```yaml
parameters:
  - name: filter
    in: query
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

Would serialize to `/query?filter=%7B%22type%22%3A%5B%22cocktail%22%2C%22mocktail%22%5D%2C%22strength%22%3A%5B5%2C10%5D%7D`, which is the equivalent of `/query?filter={"type":["cocktail","mocktail"],"strength":[5,10]}` unencoded.
