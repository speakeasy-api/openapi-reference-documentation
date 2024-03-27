# numbers & integers

The **number/integer** types allows the describing of various number formats through a combination of the **type** and **format** attribute, along with a number of attributes for validating the data, the spec should cover most use cases.  
  
Available formats are:

| Type | Format | Explanation | Example |
| --- | --- | --- | --- |
| number |     | Any number integer/float at any precision. | **10** or **1.9** or **9223372036854775807** |
| number | float | 32-bit floating point number. | **1.9** |
| number | double | 64-bit floating point number. | **1.7976931348623157** |
| integer |     | Any integer number. | **2147483647** or **9223372036854775807** |
| integer | int32 | 32-bit integer. | **2147483647** |
| integer | int64 | 64-bit integer. | 9223372036854775807 |

Below are some examples of defining **number/integer** types:

```yaml
# Any number
schema:
    type: number

# A 32-bit floating point number
schema:
    type: number
    format: float

# A 64-bit floating point number
schema:
    type: number
    format: double

# Any integer
schema:
    type: integer

# A 32-bit integer
schema:
    type: integer
    format: int32

# A 64-bit integer
schema:
    type: integer
    format: int64
```

Various tools may treat a **number/integer** without a format attribute as a type capable of holding the closest representation of that number in the target language. For example, a **number** might be represented by a **double,** and an **integer** by an **int64.** Therefore, it's recommended that you **be explicit with the format of your number type and always populate the format attribute**.

The **number** type also has some optional attributes for additional validation:

- **minimum** \- The **minimum** inclusive number the value should contain.
- **maximum** \- The **maximum** inclusive number the value should contain.
- **exclusiveMinimum** \- Make the **minimum** number exclusive.
- **exclusiveMaximum** \- Make the **maximum** number exclusive.
- **multipleOf** \- Specify the **number/integer** is a multiple of the provided value.

Some examples are below:

```yaml
# An integer with a minimum inclusive value of 0
schema:
    type: integer
    format: int32
    minimum: 10

# An integer with a minimum exclusive value of 0
schema:
    type: integer
    format: int32
    minimum: 0
    exclusiveMinimum: true

# A float with a range between 0 and 1
schema:
    type: number
    format: float
    minimum: 0
    maximum: 1

# A double with an exclusive maximum of 100
schema:
    type: number
    format: double
    maximum: 100
    exclusiveMaximum: true

# An 64 but integer that must be a multiple of 5
schema:
    type: integer
    format: int64
    multipleOf: 5
```
