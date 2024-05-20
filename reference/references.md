# References

References are a useful way to define common schemas as components and reference them elsewhere in an API description, reducing duplication in an API description. References also allow for an API description to be split into multiple files, keeping the individual parts of the API separate. Together, these features contribute to easier API maintenance.

## OpenAPI Reference Object

Any object supported by the [Components Object](/openapi/components) can be replaced by an OpenAPI Reference Object. A Reference Object points to a component using the `$ref` field, which is itself a [JSON Schema Reference](/openapi/schemas#json-schema--openapi) and can optionally override the `summary` or `description` of the referenced object.

| Field         | Type   | Required | Description                                                                                                                                                                                                                                                                                |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$ref`        | String | ✅       | A [JSON Schema reference](/openapi/schemas#json-schema--openapi) to a component.                                                                                                                                                                                                                         |
| `summary`     | String |          | A summary that overrides the referenced component's `summary` field. This field is ignored if the referenced component's type does not support the `summary` field.                                                                                                                  |
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

OpenAPI inherits the flexible JSON Schema `$ref` keyword. A JSON Schema reference is an absolute or relative URI that points to a property in the current schema or an external schema. Relative references are resolved using the current document's location as the base URI. Paths inside `$ref` use JSON Pointer syntax (JSON Pointer is different from JSONPath, which is not part of JSON Schema).

The JSON Schema `$ref` can reference elements within the same schema or external schemas or the path defined inside an object's `$id` field. By contrast, OpenAPI Reference Objects are focused on referencing components defined within the `components` section of an OpenAPI document and allow for overriding the `summary` and `description` metadata of the referenced component.

The `$id` field provides a unique identifier for a schema that `$ref` can reference. The `$id` field must be a URI.

Most objects in a schema are themselves valid schemas and can thus have an `$id` field. Note that `$id`, not `id`, is a keyword in JSON schema and should be used for references.

### Escape Characters

The `/` character separates segments in a JSON Pointer, for instance, `$ref: "#/components/schemas/Drink"`.

To refer to a property that contains the `/` character in its name, escape `/` in the `$ref` using `~1`. Since `~` is the escape character in paths, `~` must be escaped as `~0`.

For example, consider the JSON object below:

```json
{"a/b": { "c~d": "value" }}
```

To create a pointer to `value`, you would need to use the string `/a~1b/c~0d`.

## Relative References

Relative references specify a location based on the current document and are useful for referencing elements within the same API description.

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

## Runtime Expressions

Runtime expressions allow for dynamically determining values during API execution. These expressions add flexibility and reduce the need for hard coding details in an API description.

Expressions in OpenAPI always begin with the dollar sign `$` and indicate the string that follows must be calculated from the HTTP request or response. To embed an expression in another string, wrap it in `{}`.

Runtime expressions are commonly used in [Link Objects](/openapi/paths/operations/responses/links#link-object) and [Callbacks Objects](/openapi/paths/operations/callbacks#callback-object) to pass dynamic values to linked operations or callbacks. An example is:

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

## Additional Syntax

The following sections show some more advanced ways of using references to structure an API neatly.

The following `schema.yaml` describes a single operation that takes a person's ID and returns their name:

```yaml
openapi: 3.1.0
info:
  title: Person API
  version: 1.0.0
paths:
  /persons/{id}:
    get:
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  name:
                    type: string
```

### Local File References

The definition of the type that is returned can be moved into its own file so that other operations or other files can use it, too. The operation's `responses` object in `schema.yaml` now has a `$ref` field:

```yaml
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: 'person.yaml'
```

In this example, the `$ref` uses a relative path that points to a `person.yaml` file in the same folder with the following content:

```yaml
type: object
properties:
  id:
    type: string
  name:
    type: string
```

A potential downside of separating your OpenAPI documents into multiple files with references is that online validators can't validate multiple files at once. When using multiple documents, you can validate your OpenAPI schema using local validators. For example:

```sh
npx swagger-cli validate schema.yaml
```

If both files are present and valid, the validator will return `schema.yaml is valid`.

### Online File References

Schemas can be stored online, for example, in [Pastebin](https://pastebin.com). The reference in `schema.yaml` can refer to the online person definition:

```yaml
$ref: "https://pastebin.com/raw/LAvtwJn6"
```

### Organize Schemas and Components in Files

While it is common practice to define an OpenAPI document's schemas and components in a single file, a schema _may_ be split across multiple files using references.

In a JSON schema file containing multiple objects, the `Person` object might look like this:

```yaml
Person:
  type: object
  properties:
    id:
      type: string
    name:
      type: string

Employee:
  ...

Student:
  ...
```

The `schema.yaml` OpenAPI document can reference `Person` using the filename and path:

```yaml
$ref: "person.yaml#/Person"
```

If you prefer to have all fields in your main schema reference the `components` section rather than external files, you can move the reference into the `components` section in `schema.yaml`:

```yaml
                $ref: "#/components/schemas/Person"
components:
  schemas:
    Person:
      $ref: "https://pastebin.com/raw/LAvtwJn6"
```

Note that everything that can be done in an external file, can be done in the same file in the components section. Using external files to organize an OpenAPI document instead of a single file with components is advisable only if the document becomes large enough to be considered unwieldy.

### Circular References

Circular references are valid in OpenAPI and useful to define recursive objects. In the example below, the `Person` component is redefined to have an array of children, with each child a circular reference to `Person`.

```yaml
components:
  schemas:
    Person:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        children:
          type: array
          items:
            $ref: '#/components/schemas/Person'
```

Although tooling may pass a schema as syntactically valid, it could still be logically unusable. For example, code generation tools that generate SDKs or example requests and responses will fail when used on the schema below that has an infinitely recursive reference:

```yaml
components:
  schemas:
    Person:
      $ref: '#/components/schemas/Human'
    Human:
      $ref: '#/components/schemas/Person'
```

### Composition

Using composition in schemas is described in [`allOf`, `anyOf`, and `oneOf`](../glossary/single-page.md#composition-and-inheritance).

The `$ref` keywords used in the examples in that explanation could be external file references instead of component references.

### Arrays and Objects

The `$ref` keyword can be used to replace an entire array or individual items in the array.

However, some fields in an OpenAPI schema require each array item or object property to be referenced individually and the entire field may not be replaced with one `$ref`. The fields that must list each item separately are `servers`, `tags`, `paths`, `security`, `securitySchemes/scopes`, and `components`.

## Examples of All Object Types

This section gives examples for all the places `$ref` can be used. All examples are taken from the [Bar API schema file](/example/openapi.yaml).

Objects referenced can be in a `components` section of the schema or a separate file. The first example below shows both options, the rest of the examples illustrate referencing objects in the `components` section only.

### Parameters

The parameters for the operation `listDrinks`:

```yaml
      parameters:
        - name: type
          in: query
          description: The type of drink to filter by. If not provided all drinks will be returned.
          required: false
          schema:
            $ref: "#/components/schemas/DrinkType"
```

The same schema with a reference to the `components` section:

```yaml
      parameters:
        - $ref: '#/components/parameters/DrinkTypeParameter'
...
components:
  parameters:
    DrinkTypeParameter:
      name: type
      in: query
      description: The type of drink to filter by. If not provided all drinks will be returned.
      required: false
      schema:
        $ref: '#/components/schemas/DrinkType'
  schemas:
    DrinkType:
    ...
```

The schema using an external file reference instead of `components`:

```yaml
      parameters:
        - $ref: 'parameters.yaml#/DrinkTypeParameter'
```

The contents of the referenced `parameters.yaml` file (note that the main schema file is referenced):

```yaml
DrinkTypeParameter:
    name: type
    in: query
    description: The type of drink to filter by. If not provided all drinks will be returned.
    required: false
    schema:
      $ref: 'openapi.yaml#/components/schemas/DrinkType'
```

### Request Bodies

The `requestBody` for the operation `authenticate`:

```yaml
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
```

The same schema using a reference to the `components` section:

```yaml
      requestBody:
        $ref: '#/components/requestBodies/UserCredentials'
...
components:
  requestBodies:
    UserCredentials:
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
```

### Error Types

All operations in the Bar schema already use references for error types:

```yaml
      responses:
        "200":
          description: The api key to use for authenticated endpoints.
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
        "401":
          description: Invalid credentials provided.
        "5XX":
          $ref: "#/components/responses/APIError"
        default:
          $ref: "#/components/responses/UnknownError"
...
components:
  responses:
    APIError:
      description: An error occurred interacting with the API.
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/APIError"
    UnknownError:
      description: An unknown error occurred interacting with the API.
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
```

### Security Schemes

Security schemes automatically reference `components` and do not need `$ref`:

```yaml
paths
  /drinks:
    post:
      operationId: createDrink
      summary: Create a drink.
      description: Create a drink. Only available when authenticated.
      security:
        - apiKey: []
...
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: Authorization
      in: header
```

Referencing schemes in a separate file:

```yaml
components:
  securitySchemes:
    $ref: 'securitySchemes.yaml'
```

### Examples

In the `responses` section of the `listDrinks` operation, `examples` use `$ref`:

```yaml
      responses:
        "200":
          description: A list of drinks.
          content:
            application/json:
              schema:
                type: array
                items:
                  oneOf:
                    - $ref: "#/components/schemas/Drink"
                    - $ref: "#/components/schemas/PublicDrink"
                  discriminator:
                    propertyName: dataLevel
                    mapping:
                      unauthenticated: "#/components/schemas/PublicDrink"
                      authenticated: "#/components/schemas/Drink"
              examples:
                unauthenticated_drinks:
                  $ref: "#/components/examples/unauthenticated_drinks"
...
components:
  examples:
    unauthenticated_drinks:
      summary: A list of drinks for unauthenticated users
      value:
        [
          {
            "name": "Old Fashioned",
            "type": "cocktail",
            "price": 1000,
            "photo": "https://speakeasy.bar/drinks/old_fashioned.jpg",
            "dataLevel": "unauthenticated",
          },
          ...
        ]
```

The schemes in a separate file can be referenced like this:

```yaml
components:
  examples:
    $ref: 'examples.yaml'
```

### Discriminators

Below is an example of a `oneOf` discriminator that uses `$ref` in the Bar API:

```yaml
operationId: listDrinks
summary: Get a list of drinks.
responses:
  "200":
    content:
      application/json:
        schema:
          type: array
          items:
            oneOf:
              - $ref: "#/components/schemas/Drink"
              - $ref: "#/components/schemas/PublicDrink"
            discriminator:
              propertyName: dataLevel
              mapping:
                unauthenticated: "#/components/schemas/PublicDrink"
                authenticated: "#/components/schemas/Drink"
```

## Best Practices

There are no syntactical or functional differences between a schema in one file or split into multiple files using `$ref`. But splitting a large schema into separate files implements the principle of modularity, which has several advantages for users:

- Readability: Multiple shorter files with appropriate names are easier to navigate and understand than one massive file.
- Reusability: Multiple top-level schemas that are unrelated can reuse lower-level schemas stored in shared external files.
- Collaboration: Programmers can more easily edit smaller files in their area of focus in an API without version control conflicts.

A minor disadvantage of using multiple files is increased administration. Deployments need to carefully validate and distribute multiple files with interdependencies instead of just one file. The separate files may be stored in different locations on a network and have complicated URI resolutions, though this is usually unnecessary.

Given that splitting a schema into several files is beneficial, let's consider how to do it. Here are some principles to consider:

### Use Components When Necessary

Don't waste time on premature optimization or modularization. If you're using a type only once, don't bother moving it into components. But as soon as you use a type twice, use two `$ref` keywords in your main schema, and move the type definition down into `components`. Now if you want to split your file into multiple files, your types are already modules.

When should you break your `components` section into multiple files? Either when the file becomes too large to be easily readable, or when you start writing another API that reuses the same components as your original one.

### Design Versioning Carefully

It is important to specify the version number of your schemas so that customers can be certain they are calling the correct API for the code they have written. As well as having a version number in your YAML, you should also number your schema filenames or use Git release numbers:

```txt
├── schema-v1.yaml
├── schema-v2.yaml
```

When you split your schema into multiple files, it's easier to do versioning at the folder level:

```txt
├── api
    ├── v1
    |   ├── schema.yaml
    |   └── person.yaml
    └── v2
        ├── schema.yaml
        └── person.yaml
```

Even if only `schema.yaml` changes when releasing a new version, and `person.yaml` remains the same, it is simpler to copy all files into the new version folder rather than referencing the old `person.yaml` from both `schema.yaml` files. There is too much risk of making a change in one version of a file that breaks other files depending on it.

If multiple APIs share common components, versioning becomes more complex. Consider the example below.

```txt
├── api
|   ├── v1
|   |   ├── bar-schema.yaml
|   |   └── employee-schema.yaml
|   └── v2
|       ├── bar-schema.yaml
|       └── employee-schema.yaml
|
└── shared
    ├── v1
    |   └── person.yaml
    └── v2
        └── person.yaml
```

Two APIs, Bar and Employee, use the person schema kept in a shared folder. When version 1 of the person schema is updated for the Bar API, you need to either:
- The Employee API must be updated and a new version released. Since there have been no functional changes to the API, there is no benefit to customers updating their code that uses the API. This is a poor solution.
- The file should no longer be shared. Different versions of the `person.yaml` file should be moved into the Bar and Employee folders and deleted from the `shared` folder. This solution discards the modularity and reusability of shared files.
- The Bar API version 2 should point to the person schema version 2, and the Employee API version 1 should point to the person schema version 1.

The final solution makes the most sense, but is dangerous. You'll need to keep track of which versions of the APIs point to which version of the shared schema, and further changes to `person.yaml` version 1 could cause it to diverge from version 2, and you'll need to implement one of the three solutions above again.

Note that `$ref` has no version checking. You need to create your own scripts to validate the versioning system and folder structure your company decides to use.

### How To Structure Your Files

In general, choose filenames that match the file contents, such as `parameters.yaml`, `responses.yaml`, or `securitySchemes.yaml`. Group each type of object into a single file, such as `schemas`, `examples`, and so on.

A simple folder structure might look like this:

```
/api
  openapi.yaml
  /components
    schemas.yaml
    responses.yaml
    parameters.yaml
    examples.yaml
    security.yaml
  /paths
    users.yaml
    products.yaml
```

When referencing external files, use clear and relative paths that make it easy to understand where the referenced file is located relative to the current file. Don't chain references more than two levels. Deep nesting is hard to understand.

Each file should be alphabetically structured to make finding elements easy.
