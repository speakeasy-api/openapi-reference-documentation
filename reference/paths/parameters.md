# Parameters

Parameters are used to describe inputs to an operation. Parameters can be defined at the path or operation level and are merged with any duplicates at the operation level, overriding any defined at the path level.

Each parameter needs to be uniquely identified by a combination of its `name` and `in` fields in an [operation](/openapi/paths/operations).

A parameter in the list can either be a [Parameter Object](/openapi/paths/parameters#parameter-object) or a [Reference](/openapi/references) to a [Parameter Object](/openapi/paths/parameters#parameter-object) defined in the [Components Object](/openapi/components) under the `parameters` field.

Parameters can represent a number of different input types, including:

- Path Parameters
- Query Parameters
- Headers
- Cookies

Example:

```yaml
paths:
  /drinks/{type}:
    parameters:
      - name: type
        in: path
        description: The type of drink to filter by.
        required: true
        schema:
          $ref: "#/components/schemas/DrinkType"
      - name: Cache-Control
        in: header
        description: The cache control header.
        required: false
        schema:
          type: string
          enum:
            - no-cache
            - no-store
            - must-revalidate
            - max-age=0
            - max-age=3600
            - max-age=86400
            - max-age=604800
            - max-age=2592000
            - max-age=31536000
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      security:
        - {}
      tags:
        - drinks
      parameters:
        - name: limit
          in: query
          description: The maximum number of drinks to return.
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 100
      responses:
        "200":
          description: A list of drinks.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
```

## Parameter Object

| Field             |              Type               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | :-----------------------------: | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            |             String              |    ✅    | The **case sensitive** name of the parameter. This **_must_** be unique when combined with the `in` field.<br/><br/>If the `in` field is `path`, then this field **_must_** be referenced in the owning path.                                                                                                                                                                                                                                              |
| `in`              |             String              |    ✅    | The type or location of the parameter. The available types are:<br/><ul><li>`path` - A templated parameter defined within the path.</li><li>`query` - A query parameter passed via the URL.</li><li>`header` - A header parameter passed via HTTP headers.</li><li>`cookie` - A cookie parameter passed via HTTP cookies.</li></ul>                                                                                                                        |
| `description`     |             String              |          | A description of the parameter. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                                                                                                                                                          |
| `required`        |             Boolean             |          | Whether the parameter is required. If the `in` field is `path`, then this field is **always** required and **_must_** be `true`. Defaults to `false`.                                                                                                                                                                                                                                                                                                      |
| `deprecated`      |             Boolean             |          | Whether the parameter is deprecated. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `style`           |             String              |          | Describes how the parameter value will be serialized depending on the `in` field. The available styles are `matrix`, `label`, `form`, `simple`, `spaceDelimited`, `pipeDelimited`, and `deepObject`.<br/><br/>The default style depends on the `in` field:<br/><ul><li>`path` - `simple`</li><li>`query` - `form`</li><li>`header` - `simple`</li><li>`cookie` - `form`</li></ul>See the [path](https://www.speakeasyapi.dev/openapi/paths/parameters/path-parameters), [header](https://www.speakeasyapi.dev/openapi/paths/parameters/header-parameters), [query](https://www.speakeasyapi.dev/openapi/paths/parameters/query-parameters), and [cookie](https://www.speakeasyapi.dev/openapi/paths/parameters/cookie-parameters) parameter sections for more details. |
| `explode`         |             Boolean             |          | Whether the parameter value will be exploded, based on the parameter type. Defaults to `true` when `style` is `form`, otherwise `false`.<br /><br/>See the [path](https://www.speakeasyapi.dev/openapi/paths/parameters/path-parameters), [header](https://www.speakeasyapi.dev/openapi/paths/parameters/header-parameters), [query](https://www.speakeasyapi.dev/openapi/paths/parameters/query-parameters), and [cookie](https://www.speakeasyapi.dev/openapi/paths/parameters/cookie-parameters) parameter sections for more details.                                                                                                                                                                                                                             |
| `schema`          | [Schema Object](/openapi/schemas) |          | A schema or reference to a schema that defines the type of the parameter. This is **_required_** unless `content` is defined.<br/><br/>**Note: OpenAPI 3.0.x supports [OpenAPI Reference Objects](/openapi/references#openapi-reference-object) here as the value. OpenAPI 3.1.x uses the [JSON Schema Referencing](/openapi/schemas#json-schema--openapi) format.**                                                                                                                        |
| `content`         |       [Content](/openapi/paths/operations/content)       |          | A map of [Media Type Objects](/openapi/paths/operations/content#media-type-object) that defines the possible media types that can be used for the parameter. This is **_required_** unless `schema` is defined.                                                                                                                                                                                                                                                                             |
| `allowEmptyValue` |             Boolean             |          | Whether the parameter value can be empty. Only used if `in` is `query`. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                               |
| `allowReserved`   |             Boolean             |          | Whether the parameter value can contain reserved characters as defined by [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986). Only used if `in` is `query`. Defaults to `false`.                                                                                                                                                                                                                                                                           |
| `example`         |               Any               |          | An example of the parameter's value. This is ignored if the `examples` field is defined.                                                                                                                                                                                                                                                                                                                                                                   |
| `examples`        |      [Examples])examples)      |          | A map of [Example Objects](/openapi/examples) and/or [OpenAPI Reference Objects](/openapi/references#openapi-reference-object) that define the possible examples of the parameter's value.                                                                                                                                                                                                                                                                                      |
| `x-*`             |    [Extensions](/openapi/extensions)    |          | Any number of extension fields can be added to the parameter object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                                                                                               |

The order of fields above is recommended for defining fields in the document.

## Parameter Serialization

Depending on the parameter's `in`, `style`, and `explode` fields and schema type, the parameter value will be serialized in different ways. Some combinations of schema type and parameter serialization are not valid and should be avoided.

The `content` field can be used instead to define complex serialization scenarios for a parameter such as serializing an object to a JSON string for including in a query parameter in the URL.
