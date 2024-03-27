# Content & Media Types

A map of Media Types (including wildcards) to a [Media Type Object](/openapi/paths/operations/content#media-type-object) that describes the content of the request or response as it relates to the media type consumed or produced.

The key in the map is a [media or MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) that determines how the content is encoded. This media type can include wildcards indicating a range of media types it covers. For example, `application/*` would match `application/json`, `application/xml`, and so on, and `*/*` would match any media type. It can be explicitly defined to match only a single media type, for example, `application/json; charset=utf-8`.

Where both a wildcard and a specific media type are defined, the specific media type definition takes precedence.

For example:

```yaml
content:
  application/json: # Upload a JSON file
    schema:
      $ref: "#/components/schemas/Drink"
  img/*: # Upload any image format
    schema:
      type: string
      format: binary
  text/*: # Upload any text-based description of a drink
    schema:
      type: string
  text/csv: # Upload a CSV file (this will take precedence over text/*)
    schema:
      $ref: "#/components/schemas/Drink"
```

## Media Type Object

A Media Type Object describes the request or response for a media type, with optional examples and extensions.

| Field      | Type                                                                                                    | Required | Description                                                                                                                                                                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `schema`   | [Schema Object](/openapi/schemas)                                                                         |          | A schema that describes the request or response content.                                                                                                                                                                                                                                                                       |
| `example`  | Any                                                                                                     |          | An optional example of the media type. This example overrides any examples from the [Schema Object](/openapi/schemas) in the `schema` field. Mutually exclusive with the `examples` field.                                                                                                                                       |
| `examples` | Map[string, [Example Object](/openapi/examples) \| [OpenAPI Reference Object](/openapi/references#openapi-reference-object)] |          | Optional examples of the media type. These examples override any examples from the [Schema Object](/openapi/schemas) in the `schema` field. Mutually exclusive with the `example` field.                                                                                                                                         |
| `encoding` | Map[string, [Encoding Object](/openapi/paths/operations/requests#encoding-object)]                                                        |          | An optional map of [Encoding Objects](/openapi/paths/operations/requests#encoding-object). Each Encoding Object's key should match one of the properties from the [Schema Object](/openapi/schemas) in the `schema` field. Only applies to [Request Body Objects](/openapi/paths/operations/requests) when the media type is `multipart` or `application/x-www-form-urlencoded`. |
| `x-*`      | [Extensions](/openapi/extensions)                                                                               |          | Any number of extension fields as required by tooling and vendors.                                                                                                                                                                                                                                                             |