# Operation Object

An operation object describes a single API operation within a path, including all its possible inputs and outputs and the configuration required to make a successful request.

Each operation object corresponds to an HTTP verb, such as `get`, `post`, or `delete`.

Example:

```yaml
paths:
  /drinks:
    get:
      # The Operation Object
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      security:
        - {}
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
```

| Field         |                    Type                     | Required | Description                                                                                                                                                                                        |
| ------------- | :-----------------------------------------: | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationId` |                   String                    |          | A unique identifier for the operation, this **_must_** be unique within the document, and is **_case sensitive_**. It is **_recommended_** to always define an `operationId`, but is not required. |
| `deprecated`  |                   Boolean                   |          | Whether the operation is deprecated or not. Defaults to `false`.                                                                                                                                   |
| `summary`     |                   String                    |          | A short summary of what the operation does. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                      |
| `description` |                   String                    |          | A detailed description of the operation, what it does, and how to use it. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                        |
| `servers`     |             [Servers](/openapi/servers)             |          | A list of [Server Objects](/openapi/servers) that override the servers defined at the document and path levels and apply to this operation.                                                          |
| `security`    |            [Security](/openapi/security)            |          | A list of [Security Requirement Objects](/openapi/security#security-requirement-object) that override the security requirements defined at the document and path levels and apply to this operation.                |
| `x-*`         |          [Extensions](/openapi/extensions)          |          | Any number of extension fields can be added to the operation object that can be used by tooling and vendors.                                                                                       |
| `parameters`  |          [Parameters](/openapi/paths/parameters)          |          | A list of [Parameter Objects](/openapi/paths/parameters#parameter-object) that are available to this operation. The parameters defined here merge with any defined at the path level, overriding any duplicates.            |
| `requestBody` | [Request Body Object](/openapi/paths/operations/requests) |          | The request body for this operation where the [HTTP method supports a request body](https://httpwg.org/specs/rfc7231.html). Otherwise, this field is ignored.                                      |
| `responses`   |           [Responses](/openapi/paths/operations/responses)           |    ✅    | A map of [Response Objects](/openapi/paths/operations/responses#response-object) that define the possible responses from executing this operation.                                                                                    |
| `callbacks`   |           [Callbacks](/openapi/paths/operations/callbacks)           |          | A map of [Callback Objects](/openapi/paths/operations/callbacks#callback-object) that define possible callbacks that may be executed as a result of this operation.                                                                   |

The above order of fields is recommended for defining the fields in the document to help set the stage for the operation and provide a clear understanding of what it does.