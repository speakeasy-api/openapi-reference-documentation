# Callbacks

A map of [Callback Objects](/openapi/paths/operations/callbacks#callback-object) or [References](/openapi/references) that define incoming requests that may be triggered by the parent operation and the expected responses to be returned. The key is a unique identifier for the collection of callbacks contained within.

**Note: Callbacks are only valid on operations that also pass the required URL to call the callback on, in either the parameters or the request body of the parent operation. In the event that a request from the API is sent in reaction to calling the parent operation but the callback URL is provided elsewhere, use [webhooks](/openapi/webhooks) to document the callback instead (webhooks only available in OpenAPI 3.1.x)**

For example:

```yaml
/order:
  post:
    operationId: createOrder
    summary: Create an order.
    description: Create an order for a drink.
    tags:
      - orders
    parameters:
      - name: callback_url
        in: query
        description: The url to call when the order is updated.
        required: false
        schema:
          type: string
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Order"
    responses:
      "200":
        description: The order was created successfully.
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Order"
      "5XX":
        $ref: "#/components/responses/APIError"
      default:
        $ref: "#/components/responses/UnknownError"
    callbacks:
      orderUpdate:
        "{$request.query.callback_url}":
          post:
            summary: Receive order updates.
            description: Receive order updates from the supplier, this will be called whenever the status of an order changes.
            tags:
              - orders
            requestBody:
              required: true
              content:
                application/json:
                  schema:
                    type: object
                    properties:
                      order:
                        $ref: "#/components/schemas/Order"
            responses:
              "200":
                description: The order update was received successfully.
              "5XX":
                $ref: "#/components/responses/APIError"
              default:
                $ref: "#/components/responses/UnknownError"
```

## Callback Object

A map of [Runtime Expressions](/openapi/references#runtime-expression) (that represent URLs the callback request is sent to) to a [Path Item Object](/openapi/paths#path-item-object) or [Reference](/openapi/references) that defines a request to be initiated by the API provider and a potential response to be returned.

The expression when evaluated at runtime will resolve to a URL either represented in the parameters, request body, or response body of the parent operation.

Examples:

`{$request.query.callback_url}` will resolve to the value sent in the `callback_url` query parameter sent in the parent operation.

`{$request.body#/asyncURL}` will resolve to the value of the `asyncURL` property in the request body of the parent operation.

`{$response.body#/success/progressEndpoint}` will resolve to the value of the `progressEndpoint` property within the `success` object in the response body of the parent operation.

Any number of [extension](/openapi/extensions) fields can be added to the Callback Object that can be used by tooling and vendors.