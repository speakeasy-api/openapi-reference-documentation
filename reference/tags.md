# Tags

The document-level `tags` field contains a list of [tag](/openapi/tags#tag-object) definitions that may be used to categorize or group operations in the API. Tags can be referenced by [operations](/openapi/paths/operations) via the operations-level `tags` field.

Tag definitions at the document level are optional, even if an undefined tag is referenced in an [operation](/openapi/paths/operations), but it is recommended that all tags used are defined here to provide useful documentation and intent for the tags.

Tag names **_must_** be unique in the document.

Example:

```yaml
tags:
  - name: drinks
    description: The drinks endpoints.
  - name: authentication
    description: The authentication endpoints.
```

## Tag Object

A Tag Object defines a single tag that can be used to categorize or group operations in the API.

| Field          |                              Type                               | Required | Description                                                                                                                 |
| -------------- | :-------------------------------------------------------------: | :------: | --------------------------------------------------------------------------------------------------------------------------- |
| `name`         |                             String                              |    ✅    | The name of the tag. **_Must_** be unique in the document.                                                                  |
| `description`  |                             String                              |          | A description of the tag. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |
| `externalDocs` | [External Documentation Object](/openapi/external-documentation) |          | Additional external documentation for this tag.                                                                             |
| `x-*`          |                    [Extensions](/openapi/extensions)                    |          | Any number of extension fields can be added to the tag object that can be used by tooling and vendors.                      |

## Multiple Namespaces

If you want to add a method to multiple namespaces, list multiple values in tags. It accepts an array of values:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      tags:
        - drinks
        - beverages
```