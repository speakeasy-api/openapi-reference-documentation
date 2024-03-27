# Webhooks

**(Available in OpenAPI 3.1.x ONLY)**

`webhooks` are a mechanism that allows an API to send real-time data to a user as soon as an event occurs (without requiring the user to take any action). The user simply needs to subscribe to the event stream and provide a URL to start receiving data.

The `webhooks` element has identical syntax to the `paths` element. Both are lists of [Path Item Objects](/openapi/paths#path-item-object). (This makes sense if you consider that a webhook is like a reverse path: Just as paths describe endpoints on the server's API, webhooks describe endpoints on the user's API.)

This means a webhook has all the following path properties available to it: `$ref`, `summary`, `description`, `get`, `put`, `post`, `delete`, `options`, `head`, `patch`, `trace`, `servers`, and `parameters`.

For example:

```yaml
webhooks:
  stockUpdate:
    post:
      summary: Receive stock updates.
      description: Receive stock updates from the bar, this will be called whenever the stock levels of a drink or ingredient change.
      tags:
        - drinks
        - ingredients
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                drink:
                  $ref: "#/components/schemas/Drink"
                ingredient:
                  $ref: "#/components/schemas/Ingredient"
      responses:
        "200":
          description: The stock update was received successfully.
        "5XX":
          $ref: "#/components/responses/APIError"
        default:
          $ref: "#/components/responses/UnknownError"
```

## The AsyncAPI Standard?

OpenAPI is a general-purpose API specification that can be used for asynchronous APIs, but it is not necessarily optimized for them. If you find that OpenAPI is insufficient for your use case, you should check out [AsyncAPI](https://www.asyncapi.com/). Just be aware that AsyncAPI is still in the early stages of development and is not yet widely supported by the tooling ecosystem.