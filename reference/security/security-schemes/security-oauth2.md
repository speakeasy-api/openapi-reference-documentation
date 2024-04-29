# OAuth 2.0 Security Scheme in OpenAPI

OAuth 2.0 is a popular open authentication mechanism that supports an authentication flow allowing servers to authenticate on behalf of a user or organization.

While more generally used for authenticating clients and end-users, it is sometimes used in machine-to-machine applications, but is less popular than other security schemes due to the added complexity of the authentication flows.

OAuth 2.0 is considered more secure than other mechanisms due to its granted privileges through short-lived tokens that limit damage from intercepted tokens.

The OAuth 2.0 protocol defines multiple ways of building a request against the `tokenUrl` endpoint.

## OAuth 2.0 Security Scheme Object

The fields for an OAuth 2.0 security scheme are as follows:

| Field         | Type                                                | Required | Description                                                                                                                                                                           |
| ------------- | --------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | String                                              | ✅       | `oauth2`                                                                                                                                                                              |
| `description` | String                                              |          | Human-readable information. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                         |
| `flows`       | Map[{key}, [OAuth Flow Object](#oauth-flow-object)] | ✅       | An object containing configuration for the available OAuth 2.0 flows. Valid keys are `implicit`, `password`, `clientCredentials`, and `authorizationCode`.                            |
| `x-*`         | [Extensions](/openapi/extensions)                   |          | Any number of extension fields can be added to the security scheme object to be used by tooling and vendors. |

Below is an example of an OAuth 2.0 security scheme using the `clientCredentials` flow:

```yaml
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

## OAuth Flow Object

The value of the `flows` object is a map of OAuth 2.0 flow objects.

The four supported OAuth 2.0 flows are:

- `implicit` - [Implicit Flow Object](#implicit-flow-object)
- `password` - [Password Flow Object](#password-flow-object)
- `clientCredentials` (previously, `application` in OpenAPI 2.0) - [Client Credentials Flow Object](#client-credentials-flow-object)
- `authorizationCode` (previously, `accessCode` in OpenAPI 2.0) - [Authorization Code Flow Object](#authorization-code-flow-object)

Each flow object has its own configuration parameters, as described below.

### Implicit Flow Object

The Implicit flow is generally used for single-page applications that can't keep a client secret as all the application code is available to the user.

| Field              | Type                              | Required | Description                                                                                                                                                                       |
| ------------------ | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorizationUrl` | String                            | ✅       | The authorization URL to be used for this flow.                                                                                                                                   |
| `refreshUrl`       | String                            |          | The URL to be used for refreshing the token. No refresh URL means the token is not refreshable.                                                                                   |
| `scopes`           | Map[String, String]               | ✅       | The available scopes for the OAuth 2.0 flow, with a description for each scope. Although the specification requires this field, it can be an empty object.                         |
| `x-*`              | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to an OAuth Flow object to be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

The example below shows an OAuth 2.0 security scheme using the `implicit` flow:

```yaml
components:
  securitySchemes:
    implicit:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://speakeasy.bar/oauth2/authorize/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
```

### Password Flow Object

The Password flow is generally used for trusted first-party clients that can securely store the client secret.

| Field        | Type                              | Required | Description                                                                                                                                                                       |
| ------------ | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokenUrl`   | String                            | ✅       | The token URL to be used for this flow.                                                                                                                                           |
| `refreshUrl` | String                            |          | The URL to be used for refreshing the token. No refresh URL means the token is not refreshable.                                                                                   |
| `scopes`     | Map[String, String]               | ✅       | The available scopes for the OAuth 2.0 flow, with a description for each scope. Although the specification requires this field, it can be an empty object.                         |
| `x-*`        | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to an OAuth Flow object to be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

The example below shows an OAuth 2.0 security scheme using the `password` flow:

```yaml
components:
  securitySchemes:
    password:
      type: oauth2
      flows:
        password:
          tokenUrl: https://speakeasy.bar/oauth2/token/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
```

### Client Credentials Flow Object

The Client Credentials flow is generally used for machine-to-machine communication where a specific user's permission is not required.

| Field        | Type                              | Required | Description                                                                                                                                                                       |
| ------------ | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokenUrl`   | String                            | ✅       | The token URL to be used for this flow.                                                                                                                                           |
| `refreshUrl` | String                            |          | The URL to be used for refreshing the token. No refresh URL means the token is not refreshable.                                                                                   |
| `scopes`     | Map[String, String]               | ✅       | The available scopes for the OAuth 2.0 flow, with a description for each scope. Although the specification requires this field, it can be an empty object.                         |
| `x-*`        | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to an OAuth Flow object to be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

The example below shows an OAuth 2.0 security scheme using the `clientCredentials` flow:

```yaml
components:
  securitySchemes:
    clientCredentials:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://speakeasy.bar/oauth2/token/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
```

### Authorization Code Flow Object

The Authorization Code flow is generally used for server-side applications where the client secret can be securely stored.

| Field              | Type                              | Required | Description                                                                                                                                                                       |
| ------------------ | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorizationUrl` | String                            | ✅       | The authorization URL to be used for this flow.                                                                                                                                   |
| `tokenUrl`         | String                            | ✅       | The token URL to be used for this flow.                                                                                                                                           |
| `refreshUrl`       | String                            |          | The URL to be used for refreshing the token. No refresh URL means the token is not refreshable.                                                                                   |
| `scopes`           | Map[String, String]               | ✅       | The available scopes for the OAuth 2.0 flow, with a description for each scope. Although the specification requires this field, it can be an empty object.                         |
| `x-*`              | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to an OAuth Flow object to be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

The example below shows an OAuth 2.0 security scheme using the `authorizationCode` flow:

```yaml
components:
  securitySchemes:
    authorizationCode:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://speakeasy.bar/oauth2/authorize/
          tokenUrl: https://speakeasy.bar/oauth2/token/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
```

## OAuth 2.0 Security Scheme With Multiple Flows

You can define an OAuth 2.0 security scheme with multiple flows by specifying each flow in the `flows` object.

The example below shows an OAuth 2.0 security scheme using the `authorizationCode` and `clientCredentials` flows:

```yaml
components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://speakeasy.bar/oauth2/authorize/
          tokenUrl: https://speakeasy.bar/oauth2/token/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
        clientCredentials:
          tokenUrl: https://speakeasy.bar/oauth2/token/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
security:
  - oauth2: []
```

## Scopes in OAuth 2.0

Scopes are used to define the permissions that a client has when accessing a resource. The scopes are defined in the `scopes` object of the OAuth flow object.

The scopes required for a specific operation are defined in the `security` object of the operation.

The example below shows an OAuth 2.0 security scheme with scopes:

```yaml
components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://speakeasy.bar/oauth2/authorize/
          tokenUrl: https://speakeasy.bar/oauth2/token/
          refreshUrl: https://speakeasy.bar/oauth2/refresh/
          scopes:
            read: Grants read access
            write: Grants write access
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks
      # Operation requires read scope
      security:
        - oauth2:
            - read
```
