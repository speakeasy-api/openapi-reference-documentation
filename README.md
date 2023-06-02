# openapi-reference-documentation

- [openapi-reference-documentation](#openapi-reference-documentation)
  - [Introduction](#introduction)
    - [What is OpenAPI and why use it?](#what-is-openapi-and-why-use-it)
    - [What versions of OpenAPI does this documentation cover?](#what-versions-of-openapi-does-this-documentation-cover)
    - [How does this documentation differ from the official OpenAPI documentation?](#how-does-this-documentation-differ-from-the-official-openapi-documentation)
  - [The Document](#the-document)
    - [Format \& File Structure](#format--file-structure)
    - [Document Structure](#document-structure)
  - [Schema](#schema)
    - [Info Object](#info-object)
      - [SDK Generation](#sdk-generation)
      - [Contact Object](#contact-object)
      - [License Object](#license-object)
    - [External Documentation Object](#external-documentation-object)
      - [SDK Generation](#sdk-generation-1)
    - [Extensions](#extensions)
    - [Servers](#servers)
      - [Server Object](#server-object)
      - [SDK Generation](#sdk-generation-2)
      - [Server Variables](#server-variables)
    - [Security](#security)
    - [Tags](#tags)
    - [Paths Object](#paths-object)
    - [Webhooks](#webhooks)
    - [Components Object](#components-object)
  - [References](#references)

## Introduction

### What is OpenAPI and why use it?

`TODO`

### What versions of OpenAPI does this documentation cover?

This documentation will cover versions `3.1.x` and `3.0.x` of the OpenAPI specification. Where there is a major difference between the two versions, we will call it out specifically, otherwise the documentation will be applicable to both versions.

### How does this documentation differ from the official OpenAPI documentation?

`TODO`

## The Document

### Format & File Structure

An OpenAPI document is either a JSON or YAML file that contains either an entire API definition or a partial definition of an API and/or its components. All fields names in the specification are case sensitive unless otherwise specified.

A document can be split into multiple files, and the files can be in different formats. For example, you can have a JSON file that contains the API definition and a YAML file that contains the components, or a collection of files that contain partial definitions of the API and its components.

Generally the main API definition file is called `openapi.json` or `openapi.yaml`, and the component files are called `components.json` or `components.yaml`, though this is not a requirement.

Some common organizational patterns for OpenAPI documents are:

- A single file that contains the entire API definition.
- A main file that contains the API definition and a components file that contains the components.
  - This is normally achieved by using the `$ref` keyword to reference the components file from the main file. [Click here for more information on references.](#references)
- A collection of files that contain partial definitions of the API and its components.
  - Some tools support this pattern by allowing multiple files to be provided others such as the Speakeasy Generator require the individual files to be merged into a single file before being passed to the tool, which can be achieved using Speakeasy's CLI tool. [Click here for more information on Speakeasy's CLI merge tool.](https://speakeasyapi.dev/docs/speakeasy-cli/merge/)

### Document Structure

An OpenAPI document is made up of a number of different sections, each of which is described in detail below.

Example:

```yaml
openapi: 3.1.0
info:
  title: The Speakeasy Bar
  version: 1.0.0
servers:
  - url: https://speakeasy.bar
    description: The production server
security:
  - apiKey: []
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks
      responses:
        "200":
          description: A list of drinks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
components:
  schemas:
    Drink:
      type: object
      properties:
        name:
          type: string
        price:
          type: number
  securitySchemes:
    apiKey:
      type: apiKey
      name: Authorization
      in: header

```

| Field               |                              Type                               |      Required      | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | :-------------------------------------------------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openapi`           |                            *string*                             | :heavy_check_mark: | The version of the OpenAPI specification that the document conforms to, this should be one of the [Supported Versions](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) of the OpenAPI specification.<br /><br />*Note:* Speakeasy tooling currently only supports versions `3.0.X` and `3.1.X` of the OpenAPI specification.                                                                                           |
| `jsonSchemaDialect` |                            *string*                             | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />The version of the JSON Schema specification that the document conforms to (if not provided by the `$schema` field within a [Schema Object]() <`TODO:Link`>), this is a URI to one of the [Supported Versions](https://json-schema.org/specification-links.html#published-drafts) of the JSON Schema specification.<br /><br />*Note:* Currently **not** supported by Speakeasy tooling.     |
| `info`              |                   [Info Object](#info-object)                   | :heavy_check_mark: | Contains information about the document including fields like `title`, `version`, `description` that help to identify the purpose and owner of the document.                                                                                                                                                                                                                                                                            |
| `externalDocs`      | [External Documentation Object](#external-documentation-object) | :heavy_minus_sign: | Optional documentation available externally about the API.                                                                                                                                                                                                                                                                                                                                                                              |
| `x-*`               |                    [Extensions](#extensions)                    | :heavy_minus_sign: | Any number of extension fields can be added to the document (for example: [`x-speakeasy-name-overrides`](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/methods/#change-method-names)) that can be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. When provide at the global level here the extensions generally apply to the entire document. |
| `servers`           |                       [Servers](#servers)                       | :heavy_minus_sign: | Contains an optional list of servers the API is available on, if not provided the default URL is assumed to be `/` a path relative to where the OpenAPI document is hosted.                                                                                                                                                                                                                                                             |
| `security`          |                      [Security](#security)                      | :heavy_minus_sign: | Contains an optional list of security requirements that apply to all operations in the API. If not provided, the default security requirements are assumed to be `[]` an empty array.                                                                                                                                                                                                                                                   |
| `tags`              |                          [Tags](#tags)                          | :heavy_minus_sign: | Contains an optional list of tags that are generally used to group or categorize a set of [Operations]()<`TODO:Link`>.                                                                                                                                                                                                                                                                                                                  |
| `paths`             |                  [Paths Object](#paths-object)                  | :heavy_minus_sign: | Contains the paths and operations available within the API.                                                                                                                                                                                                                                                                                                                                                                             |
| `webhooks`          |                      [Webhooks](#webhooks)                      | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />Contains an optional list of incoming webhooks that the API consumer can subscribe to.                                                                                                                                                                                                                                                                                                       |
| `components`        |             [Components Object](#components-object)             | :heavy_minus_sign: | Contains an optional list of reusable components that can be referenced from other parts of the document.                                                                                                                                                                                                                                                                                                                               |

The above order of fields are recommended by Speakeasy but are not required by the OpenAPI specification.

## Schema

### Info Object

The document's `info` object contains information about the document including fields like `title`, `version`, `description` that help to identify the purpose and owner of the document.

`TODO: Summarize how this is used by Speakeasy Generator`

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

| Field            |               Type                |      Required      | Description                                                                                                                                                              |
| ---------------- | :-------------------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`          |             *string*              | :heavy_check_mark: | A name for the API contained within the document.                                                                                                                        |
| `version`        |             *string*              | :heavy_check_mark: | The version of this OpenAPI document. *Not* the version of the API or the OpenAPI specification used. This is recommend to be a [Semantic Version.](https://semver.org/) |
| `summary`        |             *string*              | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />A short sentence summarizing the API contained with the document.                                                             |
| `description`    |             *string*              | :heavy_minus_sign: | A longer description of the API contained within the document. This can contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.         |
| `contact`        | [Contact Object](#contact-object) | :heavy_minus_sign: | Contact information for the maintainer of the API.<br /><br />*Note:* Currently not supported by Speakeasy tooling.                                                      |
| `license`        | [License Object](#license-object) | :heavy_minus_sign: | The license the API is made available under.                                                                                                                             |
| `termsOfService` |             *string*              | :heavy_minus_sign: | A URL to the terms of service for the API.                                                                                                                               |

The above order of fields are recommended by Speakeasy but are not required by the OpenAPI specification.

#### SDK Generation

Speakeasy's SDK Generator will use the `info` object to produce code comments and documentation for the generated SDKs. If [External Documentation](#external-documentation-object) is also provided at the document level this will be included in the generated comments as well.

For example:

```go
// Speakeasy - A bar that serves drinks
// A secret underground bar that serves drinks to those in the know.
type Speakeasy struct {
```

#### Contact Object

Contact information for the maintainer of the API.

| Field   |   Type   |      Required      | Description                                                             |
| ------- | :------: | :----------------: | ----------------------------------------------------------------------- |
| `name`  | *string* | :heavy_minus_sign: | The name of a contact that could be approached for support for example. |
| `url`   | *string* | :heavy_minus_sign: | A URL to a website or similar providing contact information.            |
| `email` | *string* | :heavy_minus_sign: | An email address for the contact.                                       |

#### License Object

The license the API is made available under.

| Field        |   Type   |      Required      | Description                                                                                                                                 |
| ------------ | :------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | *string* | :heavy_check_mark: | The name of the license.                                                                                                                    |
| `identifier` | *string* | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br/>An [SPDX identifier](https://spdx.org/licenses/) for the license. Provided only if url isn't set. |
| `url`        | *string* | :heavy_minus_sign: | A URL to the license information. Provided only if identifier isn't set.                                                                    |

### External Documentation Object

Allows for providing information about external documentation available for the API, Operation, Tag, or Schema.

| Field         |   Type   |      Required      | Description                                                                                                                               |
| ------------- | :------: | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         | *string* | :heavy_check_mark: | A URL to the external documentation.                                                                                                      |
| `description` | *string* | :heavy_minus_sign: | A description of the external documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description. |

#### SDK Generation

Speakeasy's SDK Generator will use the `externalDocs` object to produce code comments and documentation for the generated SDKs. This will be included alongside comments for any of the Methods ([Operations]()<`TODO:Link`>), Classes/Enums ([Object Schemas]()<`TODO:Link`>) or SDKs ([Tags](#tags)) that reference the `externalDocs` object.

For example:

```go
// Speakeasy - A bar that serves drinks
// A secret underground bar that serves drinks to those in the know.
// https://docs.speakeasy.bar - The Speakeasy Bar Documentation
type Speakeasy struct {
```

### Extensions

`TODO`

### Servers

A list of [Server Objects](#server-object) either the entire API or a specific path or operation is available on. Server's can be defined at the [Document](#document-structure) level, the [Path](#paths-object) level, or the [Operation]()<`TODO:Link`> level.

Servers are optional in the OpenAPI specification, if not provided the default URL is assumed to be `/` a path relative to where the OpenAPI document is hosted.

Generally the first server in the list is considered to be the default server to use, with logic to select other servers to use left up to tooling or the API consumer.

Example:

```yaml
servers:
  - url: https://speakeasy.bar
    description: The production server
  - url: https://staging.speakeasy.bar
    description: The staging server
```

#### Server Object

A Server Object describes a single server that is available for the API.

| Field         |               Type                |      Required      | Description                                                                                                                                                                                            |
| ------------- | :-------------------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `url`         |             *string*              | :heavy_check_mark: | A URL to the server. This can either be a absolute URL or a relative URL to the hosted location of the OpenAPI document. The URL also supports variable substitutions via [Templating]()<`TODO:Link`>. |
| `description` |             *string*              | :heavy_minus_sign: | A description of the server. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                                                                              |
| `variables`   | [Server Variables]()<`TODO:Link`> | :heavy_minus_sign: | A map of variable names to [Server Variable Objects]()<`TODO:Link`> that can be used for variable substitution via [Templating]()<`TODO:Link`>.                                                        |


#### SDK Generation

The Speakeasy SDK Generator generally requires at least one absolute URL to be provided to ensure the out of the box experience is as smooth as possible for developers using the generated SDKs. If not present in the OpenAPI document this can be provided via configuration. [Click here for more details](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/servers/#declare-base-server-url)

#### Server Variables

Server variables are a map of variable names (*string*) to [Server Variable Objects]()<`TODO:Link`> that can be used for variable substitution via [Templating]()<`TODO:Link`>.

Example:



### Security

`TODO`

### Tags

`TODO`

### Paths Object

`TODO`

### Webhooks

`TODO`

### Components Object

`TODO`

## References

`TODO`
