# Headers

A map of header names to [Header Objects](/openapi/paths/operations/responses/headers) or [References](/openapi/references) that define headers in [Response Objects](/openapi/paths/operations/responses#response-object) or [Encoding Objects](/openapi/paths/operations/requests#encoding-object).

In this simplified example, the server returns three [Header Objects](/openapi/paths/operations/responses/headers) with the names `X-RateLimit-Remaining`, `Last-Modified`, and `Cache-Control`:

```yaml
paths:
  /drinks/{productCode}:
    get:
      responses:
        "200"
          description: A drink.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Drink"
          headers:
            X-RateLimit-Remaining:
              description: The number of requests left for the time window.
              schema:
                type: integer
                example: 99
            Last-Modified:
              description: The time at which the information was last modified.
              schema:
                type: string
                format: date-time
                example: '2024-01-26T18:25:43.511Z'
            Cache-Control:
              description: Instructions for caching mechanisms in both requests and responses.
              schema:
                type: string
                example: no-cache
```

## Header Object

Describes a single header.

The name of a header is determined by the header's key in a `headers` map.

| Field         | Type                                                 | Required | Description                                                                                                                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `description` | String                                               |          | A description of the header. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                                 |
| `required`    | Boolean                                              |          | Whether the header is required. Defaults to `false`.                                                                                                                                                                                                                                                                           |
| `deprecated`  | Boolean                                              |          | Whether the header is deprecated. Defaults to `false`.                                                                                                                                                                                                                                                                         |
| `schema`      | [Schema Object](/openapi/schemas)                      |          | A schema or reference to a schema that defines the type of the header. This is **_required_** unless `content` is defined.<br/><br/>**Note: OpenAPI 3.0.x supports [OpenAPI Reference Objects](/openapi/references#openapi-reference-object) here as a value. OpenAPI 3.1.x uses the [JSON Schema Referencing](/openapi/schemas#json-schema--openapi) format.** |
| `content`     | Map[string, [Media Type Object](/openapi/paths/operations/content#media-type-object)] |          | A map of [Media Type Objects](/openapi/paths/operations/content#media-type-object) that define the possible media types that can be used for the header. This is **_required_** unless `schema` is defined.                                                                                                                                                     |
| `x-*`         | [Extensions](/openapi/extensions)                            |          | Any number of extension fields can be added to the header object to be used by tooling and vendors.                                                                                                                                                                                                                            |