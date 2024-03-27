# Links

The Links object is a map of [Link Objects](/openapi/paths/operations/responses/links#link-object) or [References](/openapi/references) to [Link Objects](/openapi/paths/operations/responses/links#link-object) that allows for describing possible API-use scenarios between different operations. For example, if a response returns a `Drink` object, and the `Drink` object has an `ingredients` property that is a list of `Ingredient` objects, then a link can be defined to the `listIngredients` operation showing how the ingredients can be used as an input to the `listIngredients` operation.

For example:

```yaml
/drink/{name}:
  get:
    operationId: getDrink
      summary: Get a drink.
      description: Get a drink by name, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - drinks
      parameters:
        - name: name
          in: path
          required: true
          schema:
            type: string
      responses:
    responses:
      "200":
        description: A drink.
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Drink"
        links:
          listIngredients:
            operationId: listIngredients
            parameters:
              ingredients: $response.body#/ingredients
            description: The list of ingredients returned by the `getDrink` operation can be used as an input to the `listIngredients` operation, to retrieve additional details about the ingredients required to make the drink.
/ingredients:
    get:
      operationId: listIngredients
      summary: Get a list of ingredients.
      description: Get a list of ingredients, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - ingredients
      parameters:
        - name: ingredients
          in: query
          description: A list of ingredients to filter by. If not provided all ingredients will be returned.
          required: false
          style: form
          explode: false
          schema:
            type: array
            items:
              type: string
      responses:
        "200":
          description: A list of ingredients.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Ingredient"
        "5XX":
          $ref: "#/components/responses/APIError"
        default:
          $ref: "#/components/responses/UnknownError"
```

## Link Object

The Link Object represents a possible link that can be followed from the response.

| Field          |                       Type                        | Required | Description                                                                                                                                                                                                                                                                                                                                   |
| -------------- | :-----------------------------------------------: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationId`  |                      String                       |    ✅    | The `operationId` of an [operation](/openapi/paths/operations) that exists in the document. Use either this field or the `operationRef` field, not both.                                                                                                                                                                                              |
| `operationRef` |                      String                       |    ✅    | Either a [Relative Reference](/openapi/references#relative-references) or [Absolute Reference](/openapi/references#absolute-references) to an [operation](/openapi/paths/operations) that exists in the document. Use either this field or the `operationId` field, not both.                                                                                                                                 |
| `description`  |                      String                       |          | A description of the link and intentions for its use. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                       |
| `parameters`   | Map[string, any \| [\{Expression\}](/openapi/references#runtime-expression)] |          | A map of parameters to pass to the linked operation. The key is the name of the parameter and the value is either a constant value or an [Expression](/openapi/references#runtime-expression) that will be evaluated.<br/><br/>The parameter name can also be qualified with the location of the parameter, for example, `path.parameter_name` or `query.parameter_name` |
| `requestBody`  |       Any \| [\{Expression\}](/openapi/references#runtime-expression)        |          | A constant value or [Expression](/openapi/references#runtime-expression) that will be used as the request body when calling the linked operation.                                                                                                                                                                                                                        |
| `server`       |          [Server Object](/openapi/servers)          |          | An optional server to be used by the linked operation.                                                                                                                                                                                                                                                                                        |
| `x-*`          |             [Extensions](/openapi/extensions)             |          | Any number of extension fields can be added to the link object that can be used by tooling and vendors.                                                                                                                                                                                                                                       |

An example of `OperationRef`:

```yaml
links:
  listIngredients:
    operationRef: "#/paths/~1ingredients/get"
    parameters:
      ingredients: $response.body#/ingredients

# or

links:
  listIngredients:
    operationRef: "https://speakeasy.bar/#/paths/~1ingredients/get"
    parameters:
      ingredients: $response.body#/ingredients
```
