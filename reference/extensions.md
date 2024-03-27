# Extensions

Extensions allow us to add extra keywords not included in the OpenAPI Specification. This enables tooling such as SDK generators to access vendor-specific functionality directly in an OpenAPI document.

Extension fields always start with `x-`.

Although optional, it is conventional for vendors to further prefix their extensions with the name of the vendor. For example, Speakeasy uses extensions that start with `x-speakeasy-`. This makes it easier to track vendor extensions over time and remove unused vendor extensions in the future.

The value of an extension field can be an object, array, `null`, or any primitive value. Vendors determine the values they expect for the extensions they use.

| Field | Type | Description                                                                                                            |
| ----- | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| `^x-` | Any  | An extension's value can be an object, array, primitive, or `null`. Expected values are determined by tooling vendors. |

Here's an example of a Speakeasy extension that adds retries to requests made by Speakeasy-managed SDKs:

```yaml
x-speakeasy-retries:
  strategy: backoff
  backoff:
    initialInterval: 500 # 500 milliseconds
    maxInterval: 60000 # 60 seconds
    maxElapsedTime: 3600000 # 5 minutes
    exponent: 1.5
  statusCodes:
    - 5XX
  retryConnectionErrors: true
```
