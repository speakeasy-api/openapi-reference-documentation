# Paths Object

The `paths` object is a map of [Path Item Objects](/openapi/paths#path-item-object) that describes the available paths and operations for the API.

Each path is a relative path to the servers defined in the [Servers](/openapi/servers) object, either at the document, path, or operation level. For example, if a server is defined as `https://speakeasy.bar/api` and a path is defined as `/drinks`, the full URL to the path would be `https://speakeasy.bar/api/drinks`, where the path is appended to the server URL.

Example:

```yaml
paths:
  /drinks:
    get: ... # operation definition
  /drink:
    get: ... # operation definition
    put: ... # operation definition
    post: ... # operation definition
    delete: ... # operation definition
```

| Field     |                 Type                  | Required | Description                                                                                              |
| --------- | :-----------------------------------: | :------: | -------------------------------------------------------------------------------------------------------- |
| `/{path}` | [Path Item Object](/openapi/paths#path-item-object) |          | A relative path to an individual endpoint, where the path **_must_** begin with a `/`.                   |
| `x-*`     |       [Extensions](/openapi/extensions)       |          | Any number of extension fields can be added to the paths object that can be used by tooling and vendors. |

## Path Item Object

A Path Item Object describes the operations available on a single path. This is generally a map of HTTP methods to [Operation Objects](/openapi/paths/operations) that describe the operations available.

It is possible to override the [Servers](/openapi/servers) defined at the document level for a specific path by providing a list of [Server Objects](/openapi/servers) at the path level.

It is also possible to provide a list of [Parameters](/openapi/paths/parameters) that are common to all operations defined on the path.

Example:

```yaml
paths:
  /drinks:
    summary: Various operations for browsing and searching drinks
    description:
    servers: # Override the servers defined at the document level and apply to all operations defined on this path
      - url: https://drinks.speakeasy.bar
        description: The drinks server
    parameters: # Define a list of parameters that are common to all operations defined on this path
      - name: type
        in: query
        schema:
          type: string
          enum:
            - cocktail
            - mocktail
            - spirit
            - beer
            - wine
            - cider
    get: ... # operation definition
```

Or:

```yaml
paths:
  /drinks:
    $ref: "#/components/pathItems/drinks" # Reference a Path Item Object defined in the Components Object allowing for reuse in different paths
components:
  pathItems:
    drinks:
      servers:
        - url: https://drinks.speakeasy.bar
          description: The drinks server
      parameters:
        - name: type
          in: query
          schema:
            type: string
            enum:
              - cocktail
              - mocktail
              - spirit
              - beer
              - wine
              - cider
      get: ... # operation definition
```

| Field         |                 Type                  | Required | Description                                                                                                                                                                                |
| ------------- | :-----------------------------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$ref`        |                String                 |          | Allows for referencing a [Path Item Object](/openapi/paths#path-item-object) defined in the [Components Object](/openapi/components) under the `pathItems` field. If used, no other fields should be set. |
| `summary`     |                String                 |          | A short summary of what the path item represents. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                        |
| `description` |                String                 |          | A description of the path item. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                          |
| `servers`     |          [Servers](/openapi/servers)          |          | A list of [Server Objects](/openapi/servers) that override the servers defined at the document level. Applies to all operations defined on this path.                                        |
| `parameters`  |       [Parameters](/openapi/paths/parameters)       |          | A list of [Parameter Objects](/openapi/paths/parameters#parameter-object) that are common to all operations defined on this path.                                                                                   |
| `get`         | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`GET` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET).                                                                       |
| `put`         | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`PUT` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT).                                                                       |
| `post`        | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`POST` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).                                                                     |
| `delete`      | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`DELETE` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE).                                                                 |
| `options`     | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`OPTIONS` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS).                                                               |
| `head`        | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`HEAD` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD).                                                                     |
| `patch`       | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`PATCH` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH).                                                                   |
| `trace`       | [Operation Object](/openapi/paths/operations) |          | An operation associated with the [`TRACE` HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE).                                                                   |
| `x-*`         |       [Extensions](/openapi/extensions)       |          | Any number of extension fields can be added to the Path Item Object that can be used by tooling and vendors.                                                                               |

The order of fields above is recommended but is not significant to the order in which the endpoints should be used.