# OAuth2.0

`Oauth2.0` is a popular open authentication mechanism that supports an authentication flow that allows servers to authenticate on behalf of a user or organization. While more generally used for authenticating clients and end-users it is quite often used in machine-to-machine applications as well, but is less popular due to the added complexity of the authentication flows. `OAuth2.0` is considered more secure than other mechanisms due to its granted privileges through short lived tokens, that limit damage from intercepting the tokens.

OAuth2 defines multiple ways of building a request against the tokenUrl endpoint.

| Client Authentication Method | Description |
| ----------------------------- | ----------- |
| `client_secret_post`            | The secret is provided in the request body as `application/x-www-form-urlencoded` form data  |
| `client_secret_basic`          | The secret is provided in the `Authorization` header using the `Basic` authentication scheme |
| others             | - |

## OAuth2.0 Flow Object

Below are the required fields comprising a flow object used as a **value** for `flows: ...`.

| Field              | Applies to                                                        | Description                                                                                                                              | Required |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `scopes`           | All flows                                                         | The available scopes for the OAuth2.0 security scheme. A map between the scope name and a short description of it. The map may be empty. | ✅       |
| `authorizationUrl` | `flows:`, `implicit`, or `authorizationCode`                      | The authorization URL to be used for this flow, for example, `https://...`                                                               | ✅       |
| `tokenUrl`         | `flows:`, `authorizationCode`, `clientCredentials`, or `password` | The token URL to be used for this flow, for example, `https://...`                                                                       | ✅       |
| `refreshUrl`       | All flows                                                         | The URL to be used for obtaining refresh tokens, for example, `https://...`                                                              |          |
| `x-...`            | Extension fields                                                  |                                                                                                                                          |          |

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      scopes:
        - read:drinks
      tags:
        - drinks
components:
  securitySchemes:
    clientCredentials:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://speakeasy.bar/oauth2/token/
          scopes: {}
security:
  - clientCredentials: []
```