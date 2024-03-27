# Bearer Security

This scheme allows the passing of a token (most commonly a JWT) in the Authorization header. This is generally used for short lived tokens that are granted to the users of your API through an additional login mechanism. Using a JWT allows for the storage of additional metadata within the token which can be helpful for some use cases, such as storing scopes for permissions models.

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
      scheme: bearer
security:
  - auth: []
```
