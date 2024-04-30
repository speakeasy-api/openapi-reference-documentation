# Basic Security Scheme in OpenAPI

A Basic security scheme is a simple authentication mechanism baked into the HTTP protocol that supports sending an Authorization header containing an encoded username and password.

A Basic security scheme can be a relatively simple mechanism to get started with, but risks leaking easy-to-decode passwords if used incorrectly.

Basic security also shares the downside of API keys in that the password is generally long-lived and if intercepted, can be used until it is either revoked or expires.

The fields for a Basic security scheme are as follows:

| Field         | Type                              | Required | Description                                                                                                                                                                           |
| ------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | String                            | ✅       | `http`                                                                                                                                                                                |
| `description` | String                            |          | Human-readable information. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                         |
| `scheme`      | String                            | ✅       | `basic`                                                                                                                                                                               |
| `x-*`         | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the security scheme object to be used by tooling and vendors. |

```yaml
components:
  securitySchemes:
    auth:
      type: http
      scheme: basic
security:
  - auth: []
```
