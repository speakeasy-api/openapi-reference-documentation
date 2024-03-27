# null

## OpenAPI 3.0.X

OpenAPI 3.0.X doesn't support a `null` type but instead allows you to mark a schema as being `nullable`. This allows that type to either contain a valid value or null.  

```yaml
# A nullable string
schema:
    type: string
    nullable: true

# A nullable integer
schema:
    type: integer
    format: int32
    nullable: true

# A nullable boolean
schema:
    type: boolean
    nullable: true

# A nullable array
schema:
    type: array
    items:
        type: string
    nullable: true

# A nullable object
schema:
    type: object
    properties:
        foo:
            type: string
    nullable: true
```

## OpenAPI 3.1.X

OpenAPI 3.1 aligned describing `null` with JSON Schema. This allows for more precise API definitions, especially for APIs that need to explicitly support null values as valid inputs or outputs.

To specify that a property, item, or response can be `null`, you can use the `type` keyword with a value of `null` or combine null with other types using the `oneOf` or type array syntax. This flexibility makes it easier to accurately model your data.

```yaml
# A nullable string using array syntax
schema:
    type: [ 'null', 'string' ]

# A nullable field using an array
schema:
    type: object
    properties:
        foo:    
            type: ['null', 'string']

# A nullable field using oneOf
schema:
    type: object
    properties:
        foo:    
            oneOf:
                - type: null
                - type: string
```
