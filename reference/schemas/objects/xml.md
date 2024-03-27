# XML Object

The XML Object allows us to add details about how the schema should be represented as XML.

This is useful because XML has different data types and structures compared to JSON.

For example, in JSON, an array is a list of values only, while in XML, array values are represented as elements with names.

| Field       | Type                      | Required | Description                                                                                                                                                                                                                 |
| ----------- | ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | String                    |          | The name of the element when the property is represented in XML. When used in `items`, the name applies to each element in the XML array.                                                                                   |
| `namespace` | String                    |          | The absolute URL of the XML namespace.                                                                                                                                                                                      |
| `prefix`    | String                    |          | A prefix for the element's name.                                                                                                                                                                                            |
| `attribute` | Boolean                   |          | Whether the property should be represented as an XML attribute (`<drink id="3" />`) instead of an XML element (`<drink><id>3</id></drink>`). Defaults to `false`, so each property is represented as an element by default. |
| `wrapped`   | Boolean                   |          | Whether array elements should be wrapped in a container element. Defaults to `false`, so array elements are not wrapped by default. Only applies to arrays.                                                                 |
| `x-*`       | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the XML object that can be used by tooling and vendors.                                                                                                                      |

The examples below illustrate how XML Objects can be used:

```yaml
components:
  schemas:
    Drink:
      type: object
      properties:
        name:
          type: string
          xml:
            name: drinkName
            namespace: http://speakeasy.bar/schemas
            prefix: se
        ingredients:
          type: array
          items:
            $ref: "#/components/schemas/Ingredient"
          xml:
            name: ingredients
            wrapped: true
            namespace: http://speakeasy.bar/schemas
            prefix: se
    Ingredient:
      type: object
      properties:
        id:
          type: number
          xml:
            name: ingredientId
            namespace: http://speakeasy.bar/schemas
            prefix: se
            attribute: true
        name:
          type: string
          xml:
            name: ingredientName
            namespace: http://speakeasy.bar/schemas
            prefix: se
```

The example above translates to the following XML example:

```xml
<se:drink xmlns:se="http://speakeasy.bar/schemas">
  <se:drinkName>Mojito</se:drinkName>
  <se:ingredients>
    <se:ingredient se:id="1">
      <se:ingredientName>Sugar</se:ingredientName>
    </se:ingredient>
    <se:ingredient se:id="2">
      <se:ingredientName>Lime</se:ingredientName>
    </se:ingredient>
    <se:ingredient se:id="3">
      <se:ingredientName>Mint</se:ingredientName>
    </se:ingredient>
  </se:ingredients>
</se:drink>
```