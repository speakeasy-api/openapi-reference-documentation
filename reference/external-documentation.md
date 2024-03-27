# External Documentation Object

Allows for providing information about external documentation available for the API, Operation, Tag, or Schema.

| Field | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| `url` | String | ✅ | A URL to the external documentation. |
| `description` | String | | A description of the external documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description. |
| `x-*` | [Extensions](/openapi/extensions) | | Any number of extension fields can be added to the external documentation object that can be used by tooling and vendors. |
