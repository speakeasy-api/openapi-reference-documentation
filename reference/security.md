# Security

The `security` section is a list of [Security Requirement Objects](/openapi/security#security-requirement-object) that apply to all operations in the API (if defined at the [document](/openapi#openapi-document-structure) level) or to a specific operation (if defined at the [operation](/openapi/paths/operations) level).

Operation-level security requirements override any security requirements defined at the document level.

If not provided at the document level, the default security requirements are assumed to be `[]`, an empty array, meaning no security is required to access the API.

Example:

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

The named security schemes referenced **_must_** be [Security Scheme Objects](/openapi/security/security-schemes) defined in the [Components Object](/openapi/components) under the `securitySchemes` field.

Security can also be made optional by providing an empty object (`{}`) in the list of security requirements. For example:

```yaml
security:
  - apiKey: []
  - {}
```

Security can also be disabled for a specific operation by providing an empty array (`[]`) in the list of security requirements. For example:

```yaml
paths:
  /auth:
    post:
      operationId: authenticate
      summary: Authenticate with the API
      security: [] # Disable security for this operation
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        "200":
          description: The api key to use for authenticated endpoints
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
```

Security can be made completely optional for a specific operation by providing an empty object (`{}`) in the list of security requirements. For example:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information
      security:
        - {} # Make security optional for this operation
      responses:
        "200":
          description: A list of drinks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
```

The combination of different security requirements can be used to express complex authorization scenarios. For example:

```yaml
security: # apiKey OR oauth2 can be used
  - apiKey: []
  - oauth2:
      - read
      - write
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: Authorization
      in: header
    oauth2:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://speakeasy.bar/oauth2/authorize
          scopes:
            read: Read access to the API
            write: Write access to the API
```

The above example allows for the API to be accessed via an API Key **OR** OAuth2.0 with both the `read` and `write` scopes.

If multiple schemes are required together, then the [Security Requirement Object](/openapi/security#security-requirement-object) can define multiple schemes. For example:

```yaml
security: # both apiKey AND basic is required
  - apiKey: []
    basic: []
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: X-API-Key
      in: header
    basic:
      type: http
      scheme: basic
```

The above example requires both an API Key **AND** basic auth to be provided.

This **AND**/**OR** logic along with optional (`{}`) security can be used in any combination to express complex authorization scenarios.

## Security Requirement Object

A Security Requirement Object defines a map of security scheme names to scopes that are required to access the API. The names **_must_** match the names of [Security Scheme Objects](/openapi/security/security-schemes) defined in the [Components Object](/openapi/components) under the `securitySchemes` field.

| Field                  |      Type      | Required | Description                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | :------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{securitySchemeName}` | List\<string\> |          | A list of scopes/roles required for the security scheme. If the security scheme type is `oauth2` or `openIdConnect`, this is a list of scope names required by the API consumer to be able to access or use the API. For any other type, this could contain a list of roles or similar required for the API consumer to obtain to authenticate with the API. |