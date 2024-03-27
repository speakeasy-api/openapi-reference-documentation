# Responses

The Responses Object is a map of [Response Objects](/openapi/paths/operations/responses#response-object) or [References](/openapi/references) to [Response Objects](/openapi/paths/operations/responses#response-object) that define the possible responses that can be returned from executing the operation.

The keys in the map represent any known HTTP status codes that the API may return. The HTTP status codes can be defined like below:

- Numeric Status Code - for example, `200`, `404`, or `500`. HTTP status codes are defined in [RFC 9110](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes).
- Status Code Wildcards - for example, `1XX`, `2XX`, `3XX`, `4XX`, or `5XX`. A wildcard that matches any status code in the range of its significant digit, for example, `2XX` represents status codes `200` to `299` inclusive.
- `default` - A catch-all identifier for any other status codes not defined in the map.

The map **_must_** contain at least one successful response code.

All values **_must_** be defined as explicit strings (for example,`"200"`) to allow for compatibility between JSON and YAML.

For example:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - drinks
      parameters:
        - name: type
          in: query
          description: The type of drink to filter by. If not provided all drinks will be returned.
          required: false
          schema:
            $ref: "#/components/schemas/DrinkType"
      responses:
        "200":
          description: A list of drinks.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
        "5XX":
          description: An error occurred interacting with the API.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/APIError"
        default:
          description: An unknown error occurred interacting with the API.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
```

Any number of [extension](/openapi/extensions) fields can be added to the responses object that can be used by tooling and vendors.

## Response Object

The Response Object describes a single response that can be returned from executing an [operation](/openapi/paths/operations).

| Field         |           Type            | Required | Description                                                                                                                                           |
| ------------- | :-----------------------: | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` |          String           |    ✅    | A description of the response. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                      |
| `headers`     |    [Headers](/openapi/paths/operations/responses/headers)    |          | A map of [Header Objects](/openapi/paths/operations/responses/headers) that defines the headers that can be returned from executing this operation.                                |
| `content`     |    [Content](/openapi/paths/operations/content)    |          | A map of [Media Type Objects](/openapi/paths/operations/content#media-type-object) that defines the possible media types that can be returned from executing this operation.           |
| `links`       |      [Links](/openapi/paths/operations/responses/links)      |          | A map of [Link Objects](/openapi/paths/operations/responses/links#link-object) or [References](/openapi/references) that define the possible links that can be returned from executing this operation. |
| `x-*`         | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the response object that can be used by tooling and vendors.                                           |