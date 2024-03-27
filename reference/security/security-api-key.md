# API Key Security

This is the most common form of authentication for machine-to-machine (M2M) APIs and supports passing a pre-shared secret in a number of different ways i.e. either via the Authorization header (or another custom header), as a query parameter, or via a cookie. While this is probably the most commonly used mechanism, it is generally one of the least secure. This is especially true if the key is passed outside of headers or cookies (i.e. via query params as various logging mechanisms normally store query param information). The biggest security flaw is that most pre-shared secrets are long lived and if intercepted can be used until they are either revoked or expire (generally in a number of months or years). This risk is normally tolerated for M2M applications as the chance of interception (especially when using private VPCs/TLS and other mechanisms) is relatively low when compared to a key from a user’s device traveling on a public network.

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - drinks
      responses:
        "200":
          description: OK
            #...
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: api_key
      in: header
security:
  - api_key: []
```
