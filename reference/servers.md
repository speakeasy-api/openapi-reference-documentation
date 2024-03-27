# Servers

A list of [Server Objects](/openapi/servers) that either the entire API or a specific path or operation is available on. Servers can be defined at the [Document](/openapi#openapi-document-structure) level, the [Path](/openapi/paths) level, or the [Operation](/openapi/paths/operations) level.

Servers are optional in the OpenAPI specification. If not provided, the default URL is assumed to be `/`, a path relative to where the OpenAPI document is hosted.

Generally, the first server in the list is considered to be the default server to use, with logic to select other servers to use left up to tooling or the API consumer.

Example:

```yaml
servers:
  - url: https://speakeasy.bar
    description: The production server
  - url: https://staging.speakeasy.bar
    description: The staging server
```

If a list of servers is provided at the `paths` level, the servers will override any servers provided at the document level. If a list of servers is provided at the `operation` level, the servers will override any servers provided at the `paths` and document levels.

## Server Object

A Server Object describes a single server that is available for the API.

| Field         |                       Type                        | Required | Description                                                                                                                                                                                                                                                                                                              |
| ------------- | :-----------------------------------------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `url`         |                      String                       |    ✅    | A URL to the server. This can be an absolute URL or a relative URL to the hosted location of the OpenAPI document. The URL also supports variable substitutions via [Templating](/openapi/servers/server-variables).                                                                                                         |
| `description` |                      String                       |          | A description of the server. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                                                                                                                                                                                                |
| `variables`   | [Server Variables](/openapi/servers/server-variables) |          | A map of variable names to [Server Variable Objects](/openapi/servers/server-variables#server-variable-object) that can be used for variable substitution via [Templating](/openapi/servers/server-variables).                                                                                                                                                |
| `x-*`         |             [Extensions](/openapi/extensions)             |          | Any number of extension fields can be added to the Server Object (for example, [`x-speakeasy-server-id`](https://speakeasyapi.dev/docs/archive/server-urls/#speakeasy-server-extensions) that allows IDs to be assigned to each server for easier selection via Speakeasy SDKs) that can be used by tooling and vendors. |

If the URL is an absolute path, it **_must_** conform to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) (`schema://host{:port}{/path}`) and not include the query string, and **_must_** be URL encoded (except for the templating delimiters `{}` if not part of the URL).

The URL can also be a relative path to where the OpenAPI document is hosted (`/api`). For a document hosted at `https://speakeasy.bar/openapi.yaml`, the resulting URL will be `https://speakeasy.bar/api`.

The URL may also contain fragments (for example, `https://speakeasy.bar/drinks#mocktails`) allowing for repeated URLs with different fragments to be defined in the same document and the definition of multiple operations with the same URL and HTTP method but different operation definitions.

For example, the below document is not valid as it defines two operations with the same URL and HTTP method:

```yaml
paths:
  /drinks:
    get:
      operationId: listCocktails
      summary: Get a list of cocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: cocktail
      responses:
        "200":
          description: A list of cocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Cocktail"
  /drinks:
    get:
      operationId: listMocktails
      summary: Get a list of mocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: mocktail
      responses:
        "200":
          description: A list of mocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Mocktail"
```

However, the below document is valid as it defines two operations with the same URL and HTTP method but different fragments, making the paths unique:

```yaml
paths:
  /drinks#cocktails:
    get:
      operationId: listCocktails
      summary: Get a list of cocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: cocktail
      responses:
        "200":
          description: A list of cocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Cocktail"
  /drinks#mocktails:
    get:
      operationId: listMocktails
      summary: Get a list of mocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: mocktail
      responses:
        "200":
          description: A list of mocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Mocktail"
```

**Note:** The above API can also be achieved using [`oneOf`](/openapi/schemas/polymorphism) in a single operation definition, but depending on the use case, this may not be desirable.