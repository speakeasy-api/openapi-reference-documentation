# OpenID Connect Security Scheme in OpenAPI

The OpenID Connect security scheme allows for the discovery of configuration values for an OpenID Connect provider. This is generally used for authentication mechanisms based on the OpenID Connect protocol.

The fields for an OpenID Connect security scheme are as follows:

| Field              | Type                              | Required | Description                                                                                                                                                                           |
| ------------------ | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`             | String                            | ✅       | `openIdConnect`                                                                                                                                                                       |
| `description`      | String                            |          | Human-readable information. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                         |
| `openIdConnectUrl` | String                            | ✅       | The URL must point to a JSON OpenID Connect Discovery document.                                                                                                                       |
| `x-*`              | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the security scheme object to be used by tooling and vendors. |

The following is an example of an OpenID Connect security scheme:

```yaml
components:
  securitySchemes:
    openid_connect:
      type: openIdConnect
      openIdConnectUrl: https://example.com/.well-known/openid-configuration
security:
  - openid_connect:
    - read
    - write
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks
      # Operation requires read scope
      security:
        - openid_connect:
          - read:drink
    post:
      operationId: createDrink
      summary: Create a new drink
      # Operation requires write scope
      security:
        - openid_connect:
          - write:drink
```

## Scopes in OpenID Connect

When specifying the required security schemes for an operation, you can also specify the required scopes for that operation. This is done by adding the required scopes as an array of strings to the security scheme object.

In the example above, the `listDrinks` operation requires the `read:drink` scope, and the `createDrink` operation requires the `write:drink` scope. This allows for fine-grained control over the permissions required to access different parts of the API.
