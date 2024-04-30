# Security

When designing an API, it is important to consider the security requirements for accessing the API. OpenAPI 3.1 provides a way to define security requirements at both the document and operation levels.

Security requirements are defined as a list of [Security Requirement Objects](/openapi/security#security-requirement-object) in the `security` section. Each object in the list represents a set of security requirements that must be satisfied to access the API.

To add security to an API as a whole, the `security` keyword must be defined at the [document](/openapi#openapi-document-structure) level.

Likewise, to add security to a specific operation, the `security` keyword must be defined at the [operation](/openapi/paths/operations) level.

Security requirements defined at the operation level override the security requirements defined at the document level.

If not provided at the document level, the default security requirements are assumed to be `[]`, an empty array, meaning no security is required to access the API.

The following example requires an API key to access the API:

```yaml
security:
  - apiKey: []
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: Authorization
      in: header
```

In valid OpenAPI 3.1, the [Security Requirement Objects](/openapi/security#security-requirement-object) listed in `security` sections may only reference [Security Scheme Objects](/openapi/security/security-schemes) that are defined in the [Components Object](/openapi/components) under the `securitySchemes` field. In other words, the `security` section may not contain inline security schemes, and it may not contain security schemes that are not defined yet.

## Security Requirement Object

A Security Requirement Object defines a map of security scheme names to [scopes or roles](#security-requirement-scopes-or-roles) that are required to access the API. The names **_must_** match the names of [Security Scheme Objects](/openapi/security/security-schemes) defined in the [Components Object](/openapi/components) under the `securitySchemes` field.

| Field                  |      Type      | Required | Description                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | :------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{securitySchemeName}` | List\<string\> |          | A list of [scopes or roles](#security-requirement-scopes-or-roles) required for the security scheme. If the security scheme type is `oauth2` or `openIdConnect`, this is a list of scope names required by the API consumer to be able to access or use the API. For any other type, this could contain a list of roles or similar required for the API consumer to obtain to authenticate with the API. |

## Supported Security Schemes

Before referencing a [Security Scheme](./security/security-schemes.md) as a requirement in the `security` section, it must be defined in the [Components Object](/openapi/components) under the `securitySchemes` field.

OpenAPI 3.1 supports the following security schemes:

- [API Key](./security/security-schemes/security-api-key.md)
- [Basic HTTP](./security/security-schemes/security-basic.md)
- [Bearer Token](./security/security-schemes/security-bearer.md)
- [OAuth 2.0](./security/security-schemes/security-oauth2.md)
- [OpenID Connect](./security/security-schemes/security-openid.md)
- Digest
- Mutual TLS

## Expressing Security Requirements

The `security` keyword can be used in the following ways to express security requirements.

### Disabling Security

Security can be _disabled_ for a specific operation by providing an empty array (`[]`) in the list of security requirements.

In this example, the `POST` operation in the `/auth` path does not require security:

```yaml
paths:
  /auth:
    post:
      operationId: authenticate
      summary: Authenticate with the API
      security: [] # Disable security for this operation
      # ...
```

### Optional Security

Security can also be made optional by providing an empty object (`{}`) in the list of security requirements.

In this example, the API may be accessed with or without an API key:

```yaml
security:
  - apiKey: []
  - {}
```

### Adding Optional Security to a Specific Operation

Security can be made _optional_ for a specific operation by providing an empty object (`{}`) in the list of security requirements.

This does not disable the security requirements defined at the document level, but makes them optional for this specific operation.

In this example, the `GET` operation in the `/drinks` path _may_ be accessed with or without an API key, but if authenticated, the response will include additional information:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information
      security:
        - {} # Make security optional for this operation
      # ...
```

### Allowing a Choice of Security Schemes

To allow users to choose between multiple different security requirements, define the `security` keyword as a list of [Security Requirement Objects](/openapi/security#security-requirement-object). The API consumer can choose one of the requirements to authenticate.

In this example, the API may be accessed with an API key **OR** OAuth 2.0:

```yaml
security: # apiKey OR oauth2 can be used
  - apiKey: []
  - oauth2:
      - read
      - write
```

### Requiring Multiple Security Schemes Together

If multiple schemes are required together, then the [Security Requirement Object](/openapi/security#security-requirement-object) should be defined with multiple security schemes.

In this example, both an API key **AND** basic auth are required to access the API:

```yaml
security: # both apiKey AND basic is required
  - apiKey: []
    basic: []
```

### Complex Authorization Scenarios

This **AND**/**OR** logic along with optional (`{}`) security can be used in any combination to express complex authorization scenarios.

In this example, the API may be accessed with an API key **AND** OAuth 2.0 **OR** with basic authentication:

```yaml
security: # apiKey AND oauth2 OR basic
  - apiKey: []
    oauth2:
      - read
      - write
  - basic: []
```

## Security Requirement Scopes or Roles

When defining an OAuth 2.0 or OpenID Connect [Security Requirement Object](/openapi/security#security-requirement-object) for an operation, the `{securitySchemeName}` field should contain a list of scopes or roles required for the security scheme.

For example, the following security requirement object requires the `read` and `write` scopes for the `oauth2` security scheme:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks
      # Operation requires read and write scopes
      security:
        - oauth2:
            - read
            - write
      # ...
```
