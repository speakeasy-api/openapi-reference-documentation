# object

The **object** type allows simple and complex objects, dictionaries and free form objects, along with a number of attributes to control validation.

## Fully typed object

Fully typed objects can be described by providing a properties attribute that lists each property of the object and its associated type.

```yaml
# A fully typed object
schema:
    type: object
    properties:
        name:
            type: string
        age:
            type: integer
            format: int32
        active:
            type: boolean

# A fully typed object with a nested object
schema:
    type: object
    properties:
        name:
            type: string
        age:
            type: integer
            format: int32
        active:
            type: boolean
        address:
            type: object
            properties:
                street:
                    type: string
                city:
                    type: string
                state:
                    type: string
                zip:
                    type: string
```

Objects with properties have access to some additional attributes that allow the objects to be validated in various ways:

- **required** \- A list of properties that are required. Specified at the object level.
- **readOnly** \- A property that is only available in a response.
- **writeOnly** \- A property that is only available in a request.

```yaml
# A fully typed object with all fields required
schema:
    type: object
    properties:
        name:
            type: string
        age:
            type: integer
            format: int32
        active:
            type: boolean
    required:
        - name
        - age
        - active

# A fully typed object with only one field required
schema:
    type: object
    properties:
        name:
            type: string
        age:
            type: integer
            format: int32
        active:
            type: boolean
    required:
        - name

# A fully typed object with some field as read only
schema:
    type: object
    properties:
        name:
            type: string
        age:
            type: integer
            format: int32
        active:
            type: boolean
            readOnly: true # This field is only returned in a response
    required:
        - name
        - age
        - active # This field will only be required in a response

# A fully typed object with some field as write only
schema:
    type: object
    properties:
        name:
            type: string
        age:
            type: integer
            format: int32
        active:
            type: boolean
        isHuman:
            type: boolean
            writeOnly: true # This field is only required in a request
    required:
        - name
        - age
        - active
        - isHuman # This field will only be required in a request
```

## Using Object for Dictionaries

The **object** type can also be used to describe dictionaries/maps/etc that use strings for keys and support any value type that can be described by the OpenAPI Spec.

```yaml
# A dictionary of string values
schema:
    type: object
    additionalProperties:
        type: string

# A dictionary of objects
schema:
    type: object
    additionalProperties:
        type: object
        properties:
            name:
                type: string
            age:
                type: integer
                format: int32
```

You can also describe dictionaries that will contain certain keys

```yaml
# A dictionary that must contain at least the specified keys 
schema:
    type: object
    properties:
        name:
            type: string # Must match type of additionalProperties
    required:
        - name        
    additionalProperties:
        type: string
```

When using the **additionalProperties** attribute you can also specify additional attributes to validate the number of properties in the object:

- **minProperties** \- The minimum number of properties allowed in the object.
- **maxProperties** \- The maximum number of properties allowed in the object.

For example:

```yaml
# A dictionary of string values that has at least one key.
schema:
    type: object
    additionalProperties:
        type: string
    minProperties: 1

# A dictionary of string values that has at most 10 keys.
schema:
    type: object
    additionalProperties:
        type: string
    maxProperties: 10

# A dictionary of string values that has 1 key.
schema:
    type: object
    additionalProperties:
        type: string
    minProperties: 1
    maxProperties: 1
```

## Free form objects

The **object** type can also be used to describe any arbitrary key/value pair (where the keys are still required to be strings).

```yaml
# An arbitrary object/dictionary that can contain any value.
schema:
    type: object
    additionalProperties: true

# An alternate way to specify an arbitrary object/dictionary that can contain any value.
schema:
    type: object
    additionalProperties: {}
```