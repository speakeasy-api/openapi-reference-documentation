# References

References are a useful way to define common schemas as components and reference them elsewhere in an API description.

This reduces duplication in an API description, which makes an API easier to maintain.

References also allow us to split an API description into multiple files to help keep individual parts of an API separate and easier to maintain.

## OpenAPI Reference Object

Any object supported by the [Components Object](/openapi/components) can be replaced by an OpenAPI Reference Object. A Reference Object points to a component using the `$ref` field, which is itself a [JSON Schema Reference](/openapi/schemas#json-schema--openapi) and can optionally override the `summary` or `description` of the referenced object.

| Field         | Type   | Required | Description                                                                                                                                                                                                                                                                                |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$ref`        | String | ✅       | A [JSON Schema reference](/openapi/schemas#json-schema--openapi) to a component.                                                                                                                                                                                                                         |
| `summary`     | String |          | A brief summary that overrides the referenced component's `summary` field. This field is ignored if the referenced component's type does not support the `summary` field.                                                                                                                  |
| `description` | String |          | A detailed description that overrides the referenced component's `description` field. This field is ignored if the referenced component's type does not support the `description` field. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |

In the example below, we define a `Drink` schema in the `components` section:

```yaml
# Drink Schema
components:
  schemas:
    Drink:
      type: object
      properties:
        name:
          type: string
        ingredients:
          type: array
          items:
            $ref: "#/components/schemas/Ingredient"
        instructions:
          type: string
```

This component schema can be referenced in API paths:

```yaml
paths:
  /drinks:
    post:
      summary: Create a new drink
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                ingredients:
                  type: array
                  items:
                    $ref: "#/components/schemas/Drink"
                instructions:
                  type: string
      responses:
        "200":
          description: OK
```

### JSON Schema References

OpenAPI inherits the flexible JSON Schema `$ref` keyword. A JSON Schema reference is an absolute or relative URI that points to a property in the current schema or an external schema. Relative references are resolved using the current document's location as the base URI.

JSON Schema `$ref` can reference elements within the same schema or external schemas, while OpenAPI Reference Objects are focused on referencing components defined within the `components` section of an OpenAPI document and allows us to override the `summary` and `description` metadata of the referenced component.

## Relative References

Relative references specify a location based on the current document. They are useful for referencing elements within the same API description.

In the example below, the reference points to the `Drink` schema defined within the `components` section of the current OpenAPI document:

```yaml
paths:
  /order:
    post:
      summary: Place an order for a drink
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Drink"
```

## Absolute References

Absolute references include a protocol like `http://` or `https://` followed by the rest of the URI.

The example below references an `Ingredient` component in a remote OpenAPI document:

```yaml
paths:
  /drinks:
    get:
      summary: Get ingredients
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "https://speakeasy.bar/schemas/ingredients.yaml#/components/schemas/Ingredient"
```

## Runtime Expression

Runtime expressions allow us to dynamically determine values during API execution. These expressions add flexibility and reduce the need for hard coding details in an API description.

Expressions in OpenAPI are enclosed in curly braces `{}` and always begin with the dollar sign `$`.

Runtime expressions are commonly used in [Link Objects](/openapi/paths/operations/responses/links#link-object) and [Callbacks Objects](/openapi/paths/operations/callbacks#callback-object) to pass dynamic values to linked operations or callbacks.

```yaml
paths:
  /orders/{orderId}:
    get:
      # ...
    links:
      viewItems:
        operationId: getOrderItems
        parameters:
          orderId: $request.path.orderId # Pass orderId from the parent operation
```
