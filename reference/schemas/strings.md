# strings

Of the primitive types (ignoring the **object** type) , the **string** type is the most flexible type available. In addition to being able to be used to represent other types (such as “true”, “100”, “{\\“some\\”: \\”object\\”}”), it supports a number of formats that overlay constraints to the type of data represented. This is useful for mapping to types in various languages if you are using the OpenAPI spec for code generation.

## Formats

The string type via the OpenAPI Specification officially supports the below formats:

| Type   | Format    | Explanation                                                                                 | Example                                                |
| ------ | --------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| string | date      | An [RFC3339](https://www.rfc-editor.org/rfc/rfc3339#section-5.6) formatted date string      | “2022-01-30”                                           |
| string | date-time | An [RFC3339](https://www.rfc-editor.org/rfc/rfc3339#section-5.6) formatted date-time string | “2019-10-12T07:20:50.52Z”                              |
| string | password  | Provides a hint that the string may contain sensitive information.                          | “mySecretWord1234”                                     |
| string | byte      | Base-64 encoded data.                                                                       | “U3BlYWtlYXN5IG1ha2VzIHdvcmtpbmcgd2l0aCBBUElzIGZ1biE=” |
| string | binary    | Binary data, used to represent the contents of a file.                                      | “01010101110001”                                       |

The **format** attribute can also be used to describe a number of other formats the string might represent but outside the official list above, those formats might not be supported by tooling that works with the OpenAPI Spec, meaning that they would be provided more as hints to end-users of the API:

- email
- uuid
- uri
- hostname
- ipv4 & ipv6
- and others

Below are some examples of describing various string types:

```yaml
# A basic string
schema:
    type: string

# A string that represents a RFC3339 formatted date-time string
schema:
    type: string
    format: date-time

# A string that represents a enum with the specified values
schema:
    type: string
    enum:
      - "one"
      - "two"
      - "three"

# A string that represents a file
schema:
    type: string
    format: binary
```

## Patterns

The **string** type also has an associated **pattern** attribute that can be provided to define a regular expression that should be matched by any string represented by that type. **The format of the regular expression is based on** [**Javascript**](https://262.ecma-international.org/5.1/#sec-15.10.1) and therefore could describe regular expressions that might not be supported by various tools or target languages, so **make sure to check the compatibility with your intended targets**.

Example of a string defined with a regex pattern:

```yaml
# A string that must match the specified pattern
schema:
  type: string
  pattern: ^[a-zA-Z0-9_]*$
```
