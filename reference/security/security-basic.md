# Basic Security

This is a simple authentication mechanism baked into the HTTP protocol. It supports sending an Authorization header containing an encoded username and password. While this can be a relatively simple mechanism to get started with, if used incorrectly can risk leaking easy to decode passwords. It also shares a lot of the downsides of apiKeys below.

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - drinks
components:
  securitySchemes:
    auth:
      type: http
      scheme: basic
security:
  - auth: []
```
