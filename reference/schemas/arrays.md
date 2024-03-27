# array

The **array** type provides a way of defining a list of other types through providing an **items** attribute that represents the schema of the type contained in the array.

```yaml
# An array of string
schema:
    type: array
    items:
        type: string

# An array of objects
schema:
    type: array
    items:
        type: object
        properties:
            name:
                type: string
            age:
                type: integer

# An array of arbitrary things
schema:
    type: array
    items: {}
```

The **array** type will support any schema that describes any other type in its items attribute including types using **oneOf/anyOf/allOf** attributes. The **array** type also has some optional attributes for additional validation:

- **minItems** \- The minimum number of items the array must contain.
- **maxItems** \- The maximum number of items the array must contain.
- **uniqueItems** \- The array must contain only unique items.

```yaml
# An array of floats that must contain at least 1 element.
schema:
    type: array
    items:
        type: number
        format: float
    minItems: 1

# An array of strings that must contain at most 10 elements.
schema:
    type: array
    items:
        type: string
    maxItems: 10

# An array of booleans that must contain exactly 3 elements.
schema:
    type: array
    items:
        type: boolean
    minItems: 3
    maxItems: 3

# An array of strings that must contain only unique elements.
schema:
    type: array
    items:
        type: string
    uniqueItems: true
```
