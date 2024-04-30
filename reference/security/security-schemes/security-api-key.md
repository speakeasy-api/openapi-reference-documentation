# API Key Security Scheme in OpenAPI

An API Key security scheme is the most common form of authentication for machine-to-machine APIs and supports passing a pre-shared secret in several ways. The secret can be passed either via the Authorization header (or another custom header), as a query parameter, or via a cookie.

While this is probably the most commonly used mechanism, it is generally one of the least secure. This is especially true if the key is passed outside of headers or cookies (that is, via query params, as various logging mechanisms normally store query param information).

The biggest security flaw is that most pre-shared secrets are long-lived and if intercepted, can be used until they are either revoked or expire (generally in months or years). This risk is normally tolerated for machine-to-machine applications as the chance of interception (especially when using private VPCs/TLS and other mechanisms) is relatively low compared to a key from a user’s device traveling on a public network.

The fields for an API Key security scheme are as follows:

| Field         | Type                              | Required | Description                                                                                                                                                                           |
| ------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | String                            | ✅       | `apiKey`                                                                                                                                                                              |
| `description` | String                            |          | Human-readable information. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                         |
| `in`          | String                            | ✅       | The location of the API key in the request. Valid values are `query`, `header`, or `cookie`.                                                                                          |
| `name`        | String                            | ✅       | The name of the key parameter in the location.                                                                                                                                        |
| `x-*`         | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the security scheme object to be used by tooling and vendors. |

```yaml
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: api_key
      in: header
security:
  - api_key: []
```
