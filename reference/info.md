# Info Object

The document's `info` object contains information about the document, including fields like `title`, `version`, and `description` that help to identify the purpose and owner of the document.

Example:

```yaml
openapi: 3.1.0
info:
  title: The Speakeasy Bar
  version: 1.0.0
  summary: A bar that serves drinks
  description: A secret underground bar that serves drinks to those in the know.
  contact:
    name: Speakeasy Support
    url: https://support.speakeasy.bar
    email: support@speakeasy.bar
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
  termsOfService: https://speakeasy.bar/terms
```

| Field            |               Type                | Required | Description                                                                                                                                                                       |
| ---------------- | :-------------------------------: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          |              String               |    ✅    | A name for the API contained within the document.                                                                                                                                 |
| `version`        |              String               |    ✅    | The version of this OpenAPI document, _not_ the version of the API or the OpenAPI Specification used. This is recommended to be a [Semantic Version](https://semver.org/).        |
| `summary`        |              String               |          | **(Available in OpenAPI 3.1.x ONLY)**<br />A short sentence summarizing the API contained with the document.                                                                      |
| `description`    |              String               |          | A longer description of the API contained within the document. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                  |
| `contact`        | [Contact Object](#contact-object) |          | Contact information for the maintainer of the API.<br /><br /> **Note:** Currently not supported by Speakeasy tooling.                                                            |
| `license`        | [License Object](#license-object) |          | The license the API is made available under.                                                                                                                                      |
| `termsOfService` |              String               |          | A URL to the terms of service for the API.                                                                                                                                        |
| `x-*`            |     [Extensions](/openapi/extensions)     |          | Any number of extension fields can be added to the info object that can be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

The above order of fields is recommended (but is not required by the OpenAPI specification) as it puts the most important information first and allows the reader to get a quick overview of the document and API.

## Contact Object

Contact information for the maintainer of the API.

| Field   |           Type            | Required | Description                                                                                                |
| ------- | :-----------------------: | :------: | ---------------------------------------------------------------------------------------------------------- |
| `name`  |          String           |          | The name of a contact that could be approached, for example, for support.                                  |
| `url`   |          String           |          | A URL to a website or similar providing contact information.                                               |
| `email` |          String           |          | An email address for the contact.                                                                          |
| `x-*`   | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the contact object that can be used by tooling and vendors. |

## License Object

The license the API is made available under.

| Field        |           Type            |      Required      | Description                                                                                                                                   |
| ------------ | :-----------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       |          String           | ✅ | The name of the license.                                                                                                                      |
| `identifier` |          String           |  | **(Available in OpenAPI 3.1.x ONLY)**<br/>An [SPDX identifier](https://spdx.org/licenses/) for the license. Provided only if `url` isn't set. |
| `url`        |          String           |  | A URL to the license information. Provided only if `identifier` isn't set.                                                                    |
| `x-*`        | [Extensions](/openapi/extensions) |  | Any number of extension fields can be added to the license object that can be used by tooling and vendors.                                    |
