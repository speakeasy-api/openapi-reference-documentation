# openapi-reference-documentation

- [openapi-reference-documentation](#openapi-reference-documentation)
  - [DEVELOPMENT NOTES (REMOVE BEFORE PUBLISHING)](#development-notes-remove-before-publishing)
    - [TODOs](#todos)
  - [OPEN QUESTIONS (REMOVE BEFORE PUBLISHING)](#open-questions-remove-before-publishing)
  - [Introduction](#introduction)
    - [What is OpenAPI and why use it?](#what-is-openapi-and-why-use-it)
    - [What versions of OpenAPI does this documentation cover?](#what-versions-of-openapi-does-this-documentation-cover)
    - [How does this documentation differ from the official OpenAPI documentation?](#how-does-this-documentation-differ-from-the-official-openapi-documentation)
  - [Document Structure](#document-structure)
  - [Format \& File Structure](#format--file-structure)
  - [Document Schema](#document-schema)
    - [Info Object](#info-object)
      - [Contact Object](#contact-object)
      - [License Object](#license-object)
      - [SDK Generation](#sdk-generation)
    - [External Documentation Object](#external-documentation-object)
      - [SDK Generation](#sdk-generation-1)
    - [Servers](#servers)
      - [Server Object](#server-object)
      - [Server Variables \& Templating](#server-variables--templating)
      - [Server Variable Object](#server-variable-object)
      - [SDK Generation](#sdk-generation-2)
    - [Security](#security)
      - [Security Requirement Object](#security-requirement-object)
      - [Security Scheme Object](#security-scheme-object)
      - [OAuth2 Flow Object](#oauth2-flow-object)
      - [Example Security Scheme Schema](#example-security-scheme-schema)
      - [SDK Generation](#sdk-generation-3)
    - [Tags](#tags)
      - [Tag Object](#tag-object)
      - [SDK Creation](#sdk-creation)
        - [x-speakeasy-group](#x-speakeasy-group)
        - [Multiple Namespaces](#multiple-namespaces)
        - [Define Multi-Level Namespaces](#define-multi-level-namespaces)
    - [Paths Object](#paths-object)
      - [Path Item Object](#path-item-object)
    - [Webhooks](#webhooks)
    - [Components Object](#components-object)
  - [Operation Object](#operation-object)
    - [Request Body Object](#request-body-object)
    - [Responses](#responses)
    - [Response Object](#response-object)
      - [Links](#links)
      - [Link Object](#link-object)
      - [Headers](#headers)
        - [Header Object](#header-object)
    - [Callbacks](#callbacks)
      - [Callback Object](#callback-object)
    - [Content](#content)
      - [Media Type Object](#media-type-object)
      - [Encoding Object](#encoding-object)
    - [SDK Generation](#sdk-generation-4)
  - [Parameters](#parameters)
    - [Parameter Object](#parameter-object)
    - [Parameter Serialization](#parameter-serialization)
      - [Query Parameters](#query-parameters)
        - [Primitive Types](#primitive-types)
        - [Simple Arrays](#simple-arrays)
        - [Simple Objects](#simple-objects)
        - [Complex Objects and Arrays](#complex-objects-and-arrays)
      - [Path Parameters](#path-parameters)
        - [Primitive Types](#primitive-types-1)
        - [Simple Arrays](#simple-arrays-1)
        - [Simple Objects](#simple-objects-1)
        - [Complex Objects and Arrays](#complex-objects-and-arrays-1)
      - [Header Parameters](#header-parameters)
        - [Primitive Types](#primitive-types-2)
        - [Simple Arrays](#simple-arrays-2)
        - [Simple Objects](#simple-objects-2)
        - [Complex Objects and Arrays](#complex-objects-and-arrays-2)
      - [Cookie Parameters](#cookie-parameters)
        - [Primitive Types](#primitive-types-3)
        - [Simple Arrays](#simple-arrays-3)
        - [Simple Objects](#simple-objects-3)
        - [Complex Objects and Arrays](#complex-objects-and-arrays-3)
  - [Schema Object](#schema-object)
    - [Composition and Inheritance](#composition-and-inheritance)
    - [Discriminator Object](#discriminator-object)
    - [XML Object](#xml-object)
    - [Examples](#examples)
      - [Example Object](#example-object)
  - [Extensions](#extensions)
  - [References](#references)
    - [OpenAPI Reference Object](#openapi-reference-object)
    - [JSON Schema Reference Object](#json-schema-reference-object)
    - [Expression](#expression)
  - [Data Type Formats](#data-type-formats)

## DEVELOPMENT NOTES (REMOVE BEFORE PUBLISHING)

- I believe this should be an open source repo that we can use to showcase the docs and example SDKs generated from our example openapi document. This will allow things to be co-located (we can locate them separately but I think we will lose some coherency with that approach), benefit from community updates and improvements.
- I am building a `speakeasy` example openapi document as an example document similar to the petstore from swagger. The speakeasy it refers to is a bar, so everything is themed around that. I think this will be a good way to showcase the documentation and SDKs.
- I imagine the `SDK Generation` sections to actually be some sort of expandable section that can be toggled open and closed. This would allow the user to see the docs related to SDK Generation without it taking up too much space on the page. I also imagine we will potentially show examples in all the supported languages, via tabs or something similar.

### TODOs

- TODO: Go through and update all examples of yaml and generated code once full documentation and example spec is complete.
- TODO: Ensure we refer to API, Endpoint, etc consistently throughout the documentation.
- TODO: Determine the best way to link back to the generator? Should we talk directly about it in this documentation, or leave it to links and/or expandable sections that go into more detail?
- TODO: make the difference between OpenAPI references and JSON Schema references clear. I think this is a common point of confusion for people.
- TODO: do we want to add comments into our examples explaining them more?
- TODO: in some cases the smart bear docs document different sections of the spec in a lot of detail, almost as "how-to" guides ie. <https://swagger.io/docs/specification/callbacks/> I think we should have the equivelant but should that be done inline in this documentation or as separate linked pages from here? List of potential candidates:
  - callbacks
  - webhooks
  - parameters (have implemented this in a lot of detail in line in this documentation but should we break it out into a separate page?)
  - components
  - references
  - ???

## OPEN QUESTIONS (REMOVE BEFORE PUBLISHING)

- Do we want to be able to link to rows in the tables? If so we can add ids for each field name like so: <https://stackoverflow.com/questions/68983152/how-do-i-create-a-link-to-a-certain-word-in-markdown>

## Introduction

### What is OpenAPI and why use it?

`TODO`

### What versions of OpenAPI does this documentation cover?

This documentation will cover versions `3.1.x` and `3.0.x` of the OpenAPI specification. Where there is a important difference between the two versions, we will call it out specifically, otherwise the documentation will be applicable to both versions.

### How does this documentation differ from the official OpenAPI documentation?

`TODO`

## Document Structure

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

| Field               |                              Type                               |      Required      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | :-------------------------------------------------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openapi`           |                            *string*                             | :heavy_check_mark: | The version of the OpenAPI specification that the document conforms to, this should be one of the [Supported Versions](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) of the OpenAPI specification.<br /><br />*Note:* Speakeasy tooling currently only supports versions `3.0.x` and `3.1.x` of the OpenAPI specification.                                                                                                                                                                         |
| `jsonSchemaDialect` |                            *string*                             | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />The version of the JSON Schema specification that the document conforms to (if not provided by the `$schema` field within a [Schema Object](#schema-object)), this is a URI to one of the [Supported Versions](https://json-schema.org/specification-links.html#published-drafts) of the JSON Schema specification.<br /><br />*Note:* Currently **not** supported by Speakeasy tooling.                                                                                   |
| `info`              |                   [Info Object](#info-object)                   | :heavy_check_mark: | Contains information about the document including fields like `title`, `version`, `description` that help to identify the purpose and owner of the document.                                                                                                                                                                                                                                                                                                                                                          |
| `externalDocs`      | [External Documentation Object](#external-documentation-object) | :heavy_minus_sign: | Optional documentation available externally about the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `x-*`               |                    [Extensions](#extensions)                    | :heavy_minus_sign: | Any number of extension fields can be added to the document (for example: [`x-speakeasy-name-overrides`](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/methods/#change-method-names) that allows the default generated method names of operations to be overridden) that can be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. When provide at the global level here the extensions generally apply to the entire document. |
| `servers`           |                       [Servers](#servers)                       | :heavy_minus_sign: | Contains an optional list of servers the API is available on, if not provided the default URL is assumed to be `/` a path relative to where the OpenAPI document is hosted.                                                                                                                                                                                                                                                                                                                                           |
| `security`          |                      [Security](#security)                      | :heavy_minus_sign: | Contains an optional list of security requirements that apply to all operations in the API. If not provided, the default security requirements are assumed to be `[]` an empty array.                                                                                                                                                                                                                                                                                                                                 |
| `tags`              |                          [Tags](#tags)                          | :heavy_minus_sign: | Contains an optional list of tags that are generally used to group or categorize a set of [Operations](#operation-object).                                                                                                                                                                                                                                                                                                                                                                                            |
| `paths`             |                  [Paths Object](#paths-object)                  | :heavy_minus_sign: | Contains the paths and operations available within the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `webhooks`          |                      [Webhooks](#webhooks)                      | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />Contains an optional list of incoming webhooks that the API consumer can subscribe to.                                                                                                                                                                                                                                                                                                                                                                                     |
| `components`        |             [Components Object](#components-object)             | :heavy_minus_sign: | Contains an optional list of reusable components that can be referenced from other parts of the document.                                                                                                                                                                                                                                                                                                                                                                                                             |

The above order of fields is recommended (but is not required by the OpenAPI specification), as it allows the stage to be set in terms of calling out key information like details about the API, where it is available, what security is required to access it, and then flows into defining the available endpoints before getting into the details of the components that make up the API.

## Format & File Structure

An OpenAPI document is either a JSON or YAML file that contains either an entire API definition or a partial definition of an API and/or its components. All fields names in the specification are case sensitive unless otherwise specified.

A document can be split into multiple files, and the files can be in different formats. For example, you can have a JSON file that contains the API definition and a YAML file that contains the components, or a collection of files that contain partial definitions of the API and its components.

Generally the main API definition file is called `openapi.json` or `openapi.yaml`, and the component files are called `components.json` or `components.yaml`, though this is not a requirement.

Some common organizational patterns for OpenAPI documents are:

- A single file that contains the entire API definition.
- A main file that contains the API definition and a components file that contains the components.
  - This is normally achieved by using the `$ref` keyword to reference the components file from the main file. [Click here for more information on references.](#references)
- A collection of files that contain partial definitions of the API and its components.
  - Some tools support this pattern by allowing multiple files to be provided others such as the Speakeasy Generator require the individual files to be merged into a single file before being passed to the tool, which can be achieved using Speakeasy's CLI tool. [Click here for more information on Speakeasy's CLI merge tool.](https://speakeasyapi.dev/docs/speakeasy-cli/merge/)

## Document Schema

### Info Object

The document's `info` object contains information about the document including fields like `title`, `version`, `description` that help to identify the purpose and owner of the document.

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

| Field            |               Type                |      Required      | Description                                                                                                                                                                       |
| ---------------- | :-------------------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          |             *string*              | :heavy_check_mark: | A name for the API contained within the document.                                                                                                                                 |
| `version`        |             *string*              | :heavy_check_mark: | The version of this OpenAPI document. *Not* the version of the API or the OpenAPI specification used. This is recommended to be a [Semantic Version.](https://semver.org/)        |
| `summary`        |             *string*              | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />A short sentence summarizing the API contained with the document.                                                                      |
| `description`    |             *string*              | :heavy_minus_sign: | A longer description of the API contained within the document. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                  |
| `contact`        | [Contact Object](#contact-object) | :heavy_minus_sign: | Contact information for the maintainer of the API.<br /><br />*Note:* Currently not supported by Speakeasy tooling.                                                               |
| `license`        | [License Object](#license-object) | :heavy_minus_sign: | The license the API is made available under.                                                                                                                                      |
| `termsOfService` |             *string*              | :heavy_minus_sign: | A URL to the terms of service for the API.                                                                                                                                        |
| `x-*`            |     [Extensions](#extensions)     | :heavy_minus_sign: | Any number of extension fields can be added to the info object that can be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

The above order of fields is recommended (but is not required by the OpenAPI specification) as it puts the most important information first and allows the reader to get a quick overview of the document and API.

#### Contact Object

Contact information for the maintainer of the API.

| Field   |           Type            |      Required      | Description                                                                                                |
| ------- | :-----------------------: | :----------------: | ---------------------------------------------------------------------------------------------------------- |
| `name`  |         *string*          | :heavy_minus_sign: | The name of a contact that could be approached for support for example.                                    |
| `url`   |         *string*          | :heavy_minus_sign: | A URL to a website or similar providing contact information.                                               |
| `email` |         *string*          | :heavy_minus_sign: | An email address for the contact.                                                                          |
| `x-*`   | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the contact object that can be used by tooling and vendors. |

#### License Object

The license the API is made available under.

| Field        |           Type            |      Required      | Description                                                                                                                                 |
| ------------ | :-----------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       |         *string*          | :heavy_check_mark: | The name of the license.                                                                                                                    |
| `identifier` |         *string*          | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br/>An [SPDX identifier](https://spdx.org/licenses/) for the license. Provided only if url isn't set. |
| `url`        |         *string*          | :heavy_minus_sign: | A URL to the license information. Provided only if identifier isn't set.                                                                    |
| `x-*`        | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the license object that can be used by tooling and vendors.                                  |

#### SDK Generation

Speakeasy's SDK Generator will use the `info` object to produce code comments and documentation for the generated SDKs. If [External Documentation](#external-documentation-object) is also provided at the document level, this will be included in the generated comments as well.

For example:

```go
// Speakeasy - A bar that serves drinks
// A secret underground bar that serves drinks to those in the know.
type Speakeasy struct {
```

### External Documentation Object

Allows for providing information about external documentation available for the API, Operation, Tag, or Schema.

| Field         |           Type            |      Required      | Description                                                                                                                               |
| ------------- | :-----------------------: | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         |         *string*          | :heavy_check_mark: | A URL to the external documentation.                                                                                                      |
| `description` |         *string*          | :heavy_minus_sign: | A description of the external documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description. |
| `x-*`         | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the external documentation object that can be used by tooling and vendors.                 |

#### SDK Generation

Speakeasy's SDK Generator will use the `externalDocs` object to produce code comments and documentation for the generated SDKs. This will be included alongside comments for any of the Methods ([Operations](#operation-object)), Classes/Enums ([Object Schemas](#schema-object)) or SDKs ([Tags](#tags)) that reference the `externalDocs` object.

For example:

```go
// Speakeasy - A bar that serves drinks
// A secret underground bar that serves drinks to those in the know.
// https://docs.speakeasy.bar - The Speakeasy Bar Documentation
type Speakeasy struct {
```

### Servers

A list of [Server Objects](#server-object) either the entire API or a specific path or operation is available on. Server's can be defined at the [Document](#document-structure) level, the [Path](#paths-object) level, or the [Operation](#operation-object) level.

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

If a list of servers is provided at the `paths` level, the servers will override any servers provided at the document level. If a list of servers is provided at the `operation` level, the servers will override any servers provided at the `paths` & document levels.

#### Server Object

A Server Object describes a single server that is available for the API.

| Field         |                       Type                        |      Required      | Description                                                                                                                                                                                                                                                                                                                |
| ------------- | :-----------------------------------------------: | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         |                     *string*                      | :heavy_check_mark: | A URL to the server. This can either be a absolute URL or a relative URL to the hosted location of the OpenAPI document. The URL also supports variable substitutions via [Templating](#server-variables--templating)                                                                                                      |
| `description` |                     *string*                      | :heavy_minus_sign: | A description of the server. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                                                                                                                                                                                                  |
| `variables`   | [Server Variables](#server-variables--templating) | :heavy_minus_sign: | A map of variable names to [Server Variable Objects](#server-variable-object) that can be used for variable substitution via [Templating](#server-variables--templating).                                                                                                                                                  |
| `x-*`         |             [Extensions](#extensions)             | :heavy_minus_sign: | Any number of extension fields can be added to the server object (for example: [`x-speakeasy-server-id`](https://speakeasyapi.dev/docs/archive/server-urls/#speakeasy-server-extensions) that allows IDs to be assigned to each server for easier selection via Speakeasy's SDKs) that can be used by tooling and vendors. |

If the URL is an absolute path it ***must*** conform to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) ie `schema://host{:port}{/path}`, and not include the query string and ***must*** be URL encoded (except for the templating delimiters `{}` if not part of the URL).

But can also just be a relative path to where the OpenAPI document is hosted ie `/api` which will for a document hosted at `https://speakeasy.bar/openapi.yaml` result in the URL being `https://speakeasy.bar/api`.

The URL may also contain fragments ie `https://speakeasy.bar/drinks#mocktails` and can be used to allow repeated URLs with different fragments to be defined in the same document, allowing the definition of multiple operations with the same URL and HTTP method but different operation definitions.

For example the below document is not valid as it defines two operations with the same URL and HTTP method:

```yaml
paths:
  /drinks:
    get:
      operationId: listCocktails
      summary: Get a list of cocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: cocktail
      responses:
        "200":
          description: A list of cocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Cocktail"
  /drinks:
    get:
      operationId: listMocktails
      summary: Get a list of mocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: mocktail
      responses:
        "200":
          description: A list of mocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Mocktail"
```

However the below document is valid as it defines two operations with the same URL and HTTP method but different fragments making the paths unique:

```yaml
paths:
  /drinks#cocktails:
    get:
      operationId: listCocktails
      summary: Get a list of cocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: cocktail
      responses:
        "200":
          description: A list of cocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Cocktail"
  /drinks#mocktails:
    get:
      operationId: listMocktails
      summary: Get a list of mocktails
      parameters:
        - name: type
          in: query
          schema:
            type: string
            const: mocktail
      responses:
        "200":
          description: A list of mocktails
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Mocktail"
```

*Note:* the above API can also be achieved using [`oneOf`](#oneof) in a single operation definition, but depending on the use case this may not be desirable.

#### Server Variables & Templating

Server variables are a map of variable names (*string*) to [Server Variable Objects](#server-variable-object) that can be used for variable substitution via Templating.

Example:

```yaml
servers:
  - url: https://{organization}.{environment}.speakeasy.bar
    description: A per-organization and per-environment API
    variables:
      organization:
        description: The organization name. Defaults to a generic organization.
        default: api
      environment:
        description: The environment name. Defaults to the production environment.
        default: prod
        enum:
          - prod
          - staging
          - dev
```

Any variable delimited by `{}` in the `url` field declares a part of the URL that ***must*** be replaced with a value and references a variable that ***must*** be defined in the `variables` map. It is the API consumer's responsibility to replace these variables (including the delimiters) with values to create a valid URL before making a request to the API. The defined `default` should be used if no other value is provided.

#### Server Variable Object

A Server Variable Object describes a single variable that is optionally part of the URL in a [Server Object](#server-object). The value of a variable can be any arbitrary *string* value unless a list of allowed values is provided via the `enum` field.

| Field         |           Type            |      Required      | Description                                                                                                                                              |
| ------------- | :-----------------------: | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` |         *string*          | :heavy_minus_sign: | A description of the variable. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                              |
| `default`     |         *string*          | :heavy_check_mark: | The default value of the variable. A variable is always of type *string*. If `enum` is provided this ***must*** be one of the values in the `enum` list. |
| `enum`        |     *list\<string\>*      | :heavy_minus_sign: | A list of allowed *string* values for the variable.                                                                                                      |
| `x-*`         | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the server variable object that can be used by tooling and vendors.                                       |

#### SDK Generation

The Speakeasy SDK Generator generally requires at least one absolute URL to be provided to ensure the out of the box experience is as smooth as possible for developers using the generated SDKs. If not present in the OpenAPI document this can be provided via configuration. [Click here for more details](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/servers/#declare-base-server-url).

The generated SDKs will contain a list of available servers that can be used with the SDK. The first server in the list is considered to be the default server to use, and will be used if no other server is provided when initializing the SDK (in the case of global servers) or when using a method (in the case of path or operation servers).

For globals servers some of the generated code will look like:

```go
// speakeasy.go

// ServerList contains the list of servers available to the SDK
var ServerList = []string{
    // The production server
    "https://speakeasy.bar",
    // The staging server
    "https://staging.speakeasy.bar",
}

// WithServerURL allows the overriding of the default server URL
func WithServerURL(serverURL string) SDKOption {
    return func(sdk *Speakeasy) {
        sdk.sdkConfiguration.ServerURL = serverURL
    }
}

// WithTemplatedServerURL allows the overriding of the default server URL with a templated URL populated with the provided parameters
func WithTemplatedServerURL(serverURL string, params map[string]string) SDKOption {
    return func(sdk *Speakeasy) {
        if params != nil {
            serverURL = utils.ReplaceParameters(serverURL, params)
        }

        sdk.sdkConfiguration.ServerURL = serverURL
    }
}

// WithServerIndex allows the overriding of the default server by index
func WithServerIndex(serverIndex int) SDKOption {
    return func(sdk *Speakeasy) {
        if serverIndex < 0 || serverIndex >= len(ServerList) {
            panic(fmt.Errorf("server index %d out of range", serverIndex))
        }

        sdk.sdkConfiguration.ServerIndex = serverIndex
    }
}
```

and used like:

```go
// Create a new Speakeasy SDK Instance using the default server
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
)

// Create a new Speakeasy SDK Instance using the staging server via index
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithServerIndex(1),
)

// Create a new Speakeasy SDK Instance using the staging server via URL
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithServerURL(speakeasy.ServerList[1]),
)

// Create a new Speakeasy SDK Instance using an arbitrary server URL
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithServerURL("http://localhost:8080"),
)

// Create a new Speakeasy SDK Instance using a templated server URL
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithServerURL("http://{environment}.speakeasy.bar", map[string]string{
        "environment": "staging",
    }),
)
```

For path and operation servers the default server will be used if no other URL is provided when using a method. For example:

```go
// Create a new Speakeasy SDK Instance
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
)

// Using an arbitrary server URL
res := s.GetDrink(ctx, operations.GetDrinkRequest{ Name: "Old Fashioned" }, operations.WithServerURL("http://localhost:8080"))
```

The Developer Experience of the SDKs can be improved when providing multiple servers that can be selected by using [`x-speakeasy-server-id`](https://speakeasyapi.dev/docs/archive/server-urls/#speakeasy-server-extensions) to assign IDs to each server. This will allow the generator to instead generate a map of servers and provide methods for selecting a server by ID. For example:

```go
// speakeasy.go

const (
	// ServerProd - The production server
	ServerProd string = "prod"
	// ServerStaging - The staging server
	ServerStaging string = "staging"
)

// ServerList contains the list of servers available to the SDK
var ServerList = map[string]string{
	ServerProd:    "https://speakeasy.bar",
	ServerStaging: "https://staging.speakeasy.bar",
}

// WithServer allows the overriding of the default server by name
func WithServer(server string) SDKOption {
	return func(sdk *Speakeasy) {
		_, ok := ServerList[server]
		if !ok {
			panic(fmt.Errorf("server %s not found", server))
		}

		sdk.sdkConfiguration.Server = server
	}
}
```

and used like:

```go
// Create a new Speakeasy SDK Instance using the staging server via ID
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithServer(speakeasy.ServerStaging),
)
```

When server variables are used the SDK Generator will generate methods for setting the values of the variables. For example:

```go
// speakeasy.go



// ServerEnvironment - The environment name. Defaults to the production environment.
type ServerEnvironment string

const (
	ServerEnvironmentProd    ServerEnvironment = "prod"
	ServerEnvironmentStaging ServerEnvironment = "staging"
	ServerEnvironmentDev     ServerEnvironment = "dev"
)

func (e ServerEnvironment) ToPointer() *ServerEnvironment {
	return &e
}

func (e *ServerEnvironment) UnmarshalJSON(data []byte) error {
	var v string
	if err := json.Unmarshal(data, &v); err != nil {
		return err
	}
	switch v {
	case "prod":
		fallthrough
	case "staging":
		fallthrough
	case "dev":
		*e = ServerEnvironment(v)
		return nil
	default:
		return fmt.Errorf("invalid value for ServerEnvironment: %v", v)
	}
}

// WithEnvironment allows setting the $name variable for url substitution
func WithEnvironment(environment ServerEnvironment) SDKOption {
	return func(sdk *Speakeasy) {
		for idx := range sdk.sdkConfiguration.ServerDefaults {
			if _, ok := sdk.sdkConfiguration.ServerDefaults[idx]["environment"]; !ok {
				continue
			}

			sdk.sdkConfiguration.ServerDefaults[idx]["environment"] = fmt.Sprintf("%v", environment)
		}
	}
}

// WithOrganization allows setting the $name variable for url substitution
func WithOrganization(organization string) SDKOption {
	return func(sdk *Speakeasy) {
		for idx := range sdk.sdkConfiguration.ServerDefaults {
			if _, ok := sdk.sdkConfiguration.ServerDefaults[idx]["organization"]; !ok {
				continue
			}

			sdk.sdkConfiguration.ServerDefaults[idx]["organization"] = fmt.Sprintf("%v", organization)
		}
	}
}
```

and used like:

```go
// Create a new Speakeasy SDK Instance setting the environment and organization variables
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithEnvironment(speakeasy.ServerEnvironmentStaging),
    speakeasy.WithOrganization("speakeasy"),
)
```

### Security

`security` is a list of [Security Requirement Objects](#security-requirement-object) that apply to either all operations in the API if defined at the [document](#document-structure) level or to a specific operation if defined at the [Operation](#operation-object) level.

Operation level security requirements override any security requirements defined at the document level.

If not provided at the document level, the default security requirements are assumed to be `[]` an empty array, meaning no security is required to access the API.

Example:

```yaml
security:
  - apiKey: []
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: Authorization
      in: header
```

The named security schemes referenced ***must*** be [Security Scheme Object](#security-scheme-object) defined in the [Components Object](#components-object) under the `securitySchemes` field.

Security can also be made optional by providing an empty object (`{}`) in the list of security requirements. For example:

```yaml
security:
  - apiKey: []
  - {}
```

Security can also be disabled for a specific operation by providing an empty array (`[]`) in the list of security requirements. For example:

```yaml
paths:
  /auth:
    post:
      operationId: authenticate
      summary: Authenticate with the API
      security: [] # Disable security for this operation
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        "200":
          description: The api key to use for authenticated endpoints
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
```

or made completely optional for a specific operation by providing an empty object (`{}`) in the list of security requirements. For example:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information
      security:
        - {} # Make security optional for this operation
      responses:
        "200":
          description: A list of drinks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
```

The combination of different security requirements can be used to express complex authorization scenarios. For example:

```yaml
security: # apiKey OR oauth2 can be used
  - apiKey: []
  - oauth2:
      - read
      - write
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: Authorization
      in: header
    oauth2:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://speakeasy.bar/oauth2/authorize
          scopes:
            read: Read access to the API
            write: Write access to the API
```

The above example allows for the API to be accessed via an API Key **OR** OAuth2 with either the `read` or `write` scopes.

If multiple schemes are required together then the [Security Requirement Object](#security-requirement-object) can define multiple schemes. For example:

```yaml
security: # both apiKey AND basic are required
  - apiKey: []
    basic: []
components:
  securitySchemes:
    apiKey:
      type: apiKey
      name: X-API-Key
      in: header
    basic:
      type: http
      scheme: basic
```

The above example requires both an API Key **AND** Basic Auth to be provided.

This **AND**/**OR** logic along with optional (`{}`) security can be used in any combination to express complex authorization scenarios.

#### Security Requirement Object

A Security Requirement Object defines a map of security schemes names to scopes that are required to access the API. The names ***must*** match the names of [Security Scheme Objects](#security-scheme-object) defined in the [Components Object](#components-object) under the `securitySchemes` field.

| Field                  |       Type       |      Required      | Description                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | :--------------: | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{securitySchemeName}` | *list\<string\>* | :heavy_minus_sign: | A list of scopes/roles required for the security scheme. If the security scheme type is `oauth2` or `openIdConnect`, this is a list of scopes names required by the API consumer to be able to access/use the API, for any other types this could contain a list of roles or similar required for the API consumer to obtain to authenticate with the API. |

#### Security Scheme Object

Security scheme objects are defined in the [Components Object](#components-object) under the `securitySchemes` field. Each security scheme object has a unique key. [Security Requirement Objects](#security-requirement-object) elsewhere in the document reference security scheme objects by their keys. For example:

```yaml
paths:
  /drinks:
    get:
      security:
        - MyScheme17: []
components:
  securitySchemes:
    MyScheme17:
      type: http
      scheme: basic
```

The type field is the overall category of authentication. The value of type determines the other fields the security object needs.

Below are the string fields that do not depend on type and can be used in any security scheme.

Field | Required | Description
---|---|---
`type` | :heavy_check_mark: | The type of the security scheme. <br/><br/>Allowed values: `apiKey`, `http`, `mutualTLS`, `oauth2`, or `openIdConnect`. <br/><br/>`mutualTLS` is for OpenApi version 3.1 only.
`description` | | Human readable information. [CommonMark syntax](https://spec.commonmark.org/) may be used.
`x-...` | | Extension fields

To decide which authentication type to choose, please review this [article](https://www.speakeasyapi.dev/post/openapi-tips-auth).

Below are the fields that are required for each value of `type`. They are all strings, except for the OAuth flows, which are discussed in the next section.

Field |	Applies to | Description
---|---|---
`in:` `query`, `header`, or `cookie` | `type: apiKey` | The location of the API key in the request.
`name:` | `type: apiKey` | The name of the key parameter in the location.
`scheme:` `basic`, `bearer`, or `digest` | `type: http` | The name of the HTTP Authorization scheme to be used in the Authorization header. [More values](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml) are theoretically allowed, but not supported in practice.
`bearerFormat:` | `type: http`<br/>`scheme: bearer` | A hint to the client to identify how the bearer token is formatted. Bearer tokens are usually generated by an authorization server, so this information is primarily for documentation purposes.
_ | `type: mutualTLS` | No extra fields are required. Mutual TLS means the server will ask the client for a public security certificate after the server has sent its certificate.
`openIdConnectUrl: https://...` | `type: openIdConnect` | Used to discover configuration values. The URL must point to a JSON OpenID Connect Discovery document.
`flows:`<br/>&nbsp;&nbsp;`authorizationCode: ...`<br/>&nbsp;&nbsp;`clientCredentials: ...`<br/>&nbsp;&nbsp;`implicit: ...`<br/>&nbsp;&nbsp;`password: ...` | `type: oauth2` | Flows is an object containing four possible authentication flow objects. At least one must be present and you can use all four. The structure of a flow is detailed in the next section.

#### OAuth2 Flow Object

Below are the required fields comprising a flow object used as a value for `flows: ...`.

Field | Applies to | Description | Required
---|---|---|---
`scopes` | All flows | The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map may be empty. | :heavy_check_mark:
`authorizationUrl` | `flows:` `implicit` or `authorizationCode` | The authorization URL to be used for this flow. E.g. `https://...` | :heavy_check_mark:
`tokenUrl` | `flows:` `authorizationCode`, `clientCredentials`, or `password` | The token URL to be used for this flow. E.g. `https://...` | :heavy_check_mark:
`refreshUrl` | All flows | The URL to be used for obtaining refresh tokens. E.g. `https://...` |
`x-...` | Extension fields | |

#### Example Security Scheme Schema

Below is an example security schemes object with every possible field besides extensions.

```yaml
components:
  securitySchemes:

# apiKey ------------
    auth1:
      description: Recommended authenticator
      type: apiKey
      in: query
      name: key

    auth2:
      type: apiKey
      in: header
      name: X-API-Key

    auth3:
      type: apiKey
      in: cookie
      name: key

# http ------------
    auth4:
      type: http
      scheme: basic

    auth5:
      type: http
      scheme: bearer
      bearerFormat: JWT

    auth6:
      type: http
      scheme: digest # not supported by Speakeasy

# mutualTLS ------------
    auth7:
      type: mutualTLS  # not supported by Speakeasy

# openIdConnect ------------
    auth8:
      type: openIdConnect
      openIdConnectUrl: https://example.com/openidconfig.json

# oauth2 ------------
    auth9:
      type: oauth2
      flows:
        authorizationCode:
          scopes:
            read: Grants read access
            write: Grants write access
          authorizationUrl: https://test.com/oauth/authorize
          tokenUrl: https://test.com/oauth/token
          refreshUrl: https://test.com/oauth/refresh
        clientCredentials:
          scopes:
            read: Grants read access
            write: Grants write access
          tokenUrl: https://test.com/oauth/token
          refreshUrl: https://test.com/oauth/refresh
        implicit:
          scopes:
            read: Grants read access
            write: Grants write access
          authorizationUrl: https://test.com/oauth/authorize
          refreshUrl: https://test.com/oauth/refresh
        password:
          scopes:
            read: Grants read access
            write: Grants write access
          tokenUrl: https://test.com/oauth/token
          refreshUrl: https://test.com/oauth/refresh
```

#### SDK Generation

Speakeasy does not support mutualTLS, the HTTP digest security type, and some programming languages and flows for OAuth. For details, please see this [article](https://www.speakeasyapi.dev/docs/customize-sdks/authentication). Using OAuth requires you to [write your own callback function](https://www.speakeasyapi.dev/docs/customize-sdks/authentication#step-2-add-your-callback-function-to-your-sdks).

Below is a list showing how to call each supported authentication shown in the previous section's example schema, once Speakeasy has created an SDK:

- auth1 — apiKey · query
  
  ```ts
    const operationSecurity: Drinks1Security = "<YOUR_API_KEY_HERE>";
    const result = await sdk.drinks1(operationSecurity);
  ```
- auth2 — apiKey · header

  ```ts
  const operationSecurity: Drinks2Security = "<YOUR_API_KEY_HERE>";
  const result = await sdk.drinks2(operationSecurity);
  ```
- auth3 — apiKey · cookie

  ```ts
  const operationSecurity: Drinks3Security = "<YOUR_API_KEY_HERE>";
  const result = await sdk.drinks3(operationSecurity);
  ```
- auth4 — http · basic

  ```ts
  const operationSecurity: Drinks4Security = {
    username: "<YOUR_USERNAME_HERE>",
    password: "<YOUR_PASSWORD_HERE>",
  };
  const result = await sdk.drinks4(operationSecurity);
  ```
- auth5 — http · bearer

  ```ts
  const operationSecurity: Drinks5Security = "<YOUR_BEARER_TOKEN_HERE>";
  const result = await sdk.drinks5(operationSecurity);
  ```
- auth6 — openIdConnect

  ```ts
  const sdk = new SDK({
    auth6: "Bearer <YOUR_ACCESS_TOKEN_HERE>",
  });
  const result = await sdk.drinks6();
  ```
- auth7 — oauth2

  ```ts
  const operationSecurity: Drinks7Security = "Bearer <YOUR_ACCESS_TOKEN_HERE>";
  const result = await sdk.drinks7(operationSecurity);
  // custom work to be done: https://www.speakeasyapi.dev/docs/customize-sdks/authentication#step-2-add-your-callback-function-to-your-sdks
  ```

Depending on whether global or operation level security is used, the Speakeasy SDK Generator will generate the correct code to handle the security requirements.

For global security requirements, the generator may generate code like the following, which is used when configuring the SDK instance:

```go
// speakeasy.go

// WithSecurity configures the SDK to use the provided security details
func WithSecurity(security shared.Security) SDKOption {
	return func(sdk *Speakeasy) {
		sdk.sdkConfiguration.Security = &security
	}
}

// New creates a new instance of the SDK with the provided options
func New(opts ...SDKOption) *Speakeasy {
	sdk := &Speakeasy{
		sdkConfiguration: sdkConfiguration{
			Language:          "go",
			OpenAPIDocVersion: "1.0.0",
			SDKVersion:        "0.0.1",
			GenVersion:        "internal",
			ServerDefaults: []map[string]string{
				{},
				{},
				{
					"environment":  "prod",
					"organization": "api",
				},
			},
		},
	}
	for _, opt := range opts {
		opt(sdk)
	}

	// Use WithClient to override the default client if you would like to customize the timeout
	if sdk.sdkConfiguration.DefaultClient == nil {
		sdk.sdkConfiguration.DefaultClient = &http.Client{Timeout: 60 * time.Second}
	}
	if sdk.sdkConfiguration.SecurityClient == nil {
		if sdk.sdkConfiguration.Security != nil {
			sdk.sdkConfiguration.SecurityClient = utils.ConfigureSecurityClient(sdk.sdkConfiguration.DefaultClient, sdk.sdkConfiguration.Security)
		} else {
			sdk.sdkConfiguration.SecurityClient = sdk.sdkConfiguration.DefaultClient
		}
	}

	return sdk
}

// pkg/models/shared/security.go

type Security struct {
	APIKey string `security:"scheme,type=apiKey,subtype=header,name=Authorization"`
}
```

and used like:

```go
// Create a new Speakeasy SDK Instance
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
)
```

For operation level security requirements the generator may generate code like the following which is used when calling a method:

```go
// drinks.go

// GetDrink - Get a drink by name.
func (s *drinks) GetDrink(ctx context.Context, request operations.GetDrinkRequest, security operations.GetDrinkSecurity) (*operations.GetDrinkResponse, error) {
  // implementation...
}
```

and used like:

```go
// Create a new Speakeasy SDK Instance
s := speakeasy.New()

res := s.Drinks.GetDrink(ctx, operations.GetDrinkRequest{Name: "Long Island Ice Tea"}, operations.GetDrinkSecurity{APIKey: "YOUR_API_KEY_HERE"})
```

[//]: # "TODO: once we support optional method level security add an example for that here as well"

### Tags

The document-level `tags` field contains a list of [tag](#tag-object) definitions that may be used to categorize or group operations in the API. Tags can be referenced by [Operations](#operation-object) via the operations-level `tags` field.

Tag definitions at the document level are optional, even if an undefined tag is referenced within an [Operation](#operation-object), but it is recommended that all tags used are defined here to provide useful documentation and intent for the tags.

Tag names ***must*** be unique in the document.

Example:

```yaml
tags:
  - name: drinks
    description: The drinks endpoints.
  - name: authentication
    description: The authentication endpoints.
```

#### Tag Object

A Tag Object defines a single tag that can be used to categorize or group operations in the API.

| Field          |                              Type                               |      Required      | Description                                                                                                                 |
| -------------- | :-------------------------------------------------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------- |
| `name`         |                            *string*                             | :heavy_check_mark: | The name of the tag. ***Must*** be unique in the document.                                                              |
| `description`  |                            *string*                             | :heavy_minus_sign: | A description of the tag. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |
| `externalDocs` | [External Documentation Object](#external-documentation-object) | :heavy_minus_sign: | Additional external documentation for this tag.                                                                             |
| `x-*`          |                    [Extensions](#extensions)                    | :heavy_minus_sign: | Any number of extension fields can be added to the tag object that can be used by tooling and vendors.                      |

#### SDK Creation

Speakeasy will split the SDKs and documentation it creates based on your tags.

Consider the following drinks endpoint in the schema:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      tags:
        - drinks
```

The created TypeScript can be called like this:

```ts
await sdk.drinks.listDrinks(type);
```

##### x-speakeasy-group

Add the `x-speakeasy-group` field to an endpoint to tell Speakeasy to ignore the endpoint's tag and group it under the custom group instead.

For example, if you add x-speakeasy-group to the drinks endpoint, the YAML will look like this:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      tags:
        - drinks
      x-speakeasy-group:
        - beverages
```

The created TypeScript can now be called like this:

```ts
await sdk.beverages.listDrinks(type);
```

You will no longer be able to use the code below, even though the tag for drinks is still there:

```ts
await sdk.drinks.listDrinks(type);
```

##### Multiple Namespaces
If you want to add a method to multiple namespaces, list multiple values in tags or the `x-speakeasy-group` extension. Both accept an array of values:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      tags:
        - drinks
        - beverages
```

You can call either:

```ts
await sdk.drinks.listDrinks(type);
await sdk.beverages.listDrinks(type);
```

##### Define Multi-Level Namespaces
You can use tags or the `x-speakeasy-group` extension to define nested namespaces for your operations using `.` notation. There is no limit to the number of levels you can define.

For instance:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      tags:
        - drinks.wine.champagne
```

This will create an SDK that can be called as below:

```ts
await sdk.drinks.wine.champagne.listDrinks(type);
```

Note that the files `drinks.ts`, `wine.ts`, and `champagne.ts` will be created, but only `champagne.ts` will have operations.

### Paths Object

The `paths` object is a map of [Path Item Objects](#path-item-object) that describe the available paths and operations for the API.

Each path is a relative path to the servers defined in the [Servers](#servers) object, either at the document level, path or operation level. For example if a server is defined as `https://speakeasy.bar/api` and a path is defined as `/drinks` the full URL to the path would be `https://speakeasy.bar/api/drinks`, where the path is appended to the server URL.

Example:

```yaml
paths:
  /drinks:
    get:
      ... # operation definition
  /drink:
    get:
      ... # operation definition
    put:
      ... # operation definition
    post:
      ... # operation definition
    delete:
      ... # operation definition
```

| Field     |                 Type                  |      Required      | Description                                                                                              |
| --------- | :-----------------------------------: | :----------------: | -------------------------------------------------------------------------------------------------------- |
| `/{path}` | [Path Item Object](#path-item-object) | :heavy_minus_sign: | A relative path to an individual endpoint, where the path ***must*** begin with a `/`                    |
| `x-*`     |       [Extensions](#extensions)       | :heavy_minus_sign: | Any number of extension fields can be added to the paths object that can be used by tooling and vendors. |

#### Path Item Object

A Path Item Object describes the operations available on a single path, this is generally a map of HTTP methods to [Operation Objects](#operation-object) that describe the operations available.

It is also possible to override the [Servers](#servers) defined at the document level for a specific path by providing a list of [Server Objects](#server-object) at the path level.

And to provide a list of [Parameters](#parameters) that are common to all operations defined on the path.

Example:

```yaml
paths:
  /drinks:
    summary: Various operations for browsing and searching drinks
    description:
    servers: # Override the servers defined at the document level and apply to all operations defined on this path
      - url: https://drinks.speakeasy.bar
        description: The drinks server
    parameters: # Define a list of parameters that are common to all operations defined on this path
      - name: type
        in: query
        schema:
          type: string
          enum:
            - cocktail
            - mocktail
            - spirit
            - beer
            - wine
            - cider
    get:
      ... # operation definition
```

or

```yaml
paths:
  /drinks:
    $ref: "#/components/pathItems/drinks" # Reference a Path Item Object defined in the Components Object allowing for reuse in different paths
components:
  pathItems:
    drinks:
      servers:
        - url: https://drinks.speakeasy.bar
          description: The drinks server
      parameters:
        - name: type
          in: query
          schema:
            type: string
            enum:
              - cocktail
              - mocktail
              - spirit
              - beer
              - wine
              - cider
      get:
        ... # operation definition
```

| Field         |                 Type                  |      Required      | Description                                                                                                                                                                                    |
| ------------- | :-----------------------------------: | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$ref`        |               *string*                | :heavy_minus_sign: | Allows for referencing a [Path Item Object](#path-item-object) defined in the [Components Object](#components-object) under the `pathItems` field. If used then no other fields should be set. |
| `summary`     |               *string*                | :heavy_minus_sign: | A short summary of what the path item represents. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                            |
| `description` |               *string*                | :heavy_minus_sign: | A description of the path item. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                              |
| `servers`     |          [Servers](#servers)          | :heavy_minus_sign: | A list of [Server Objects](#server-object) that override the servers defined at the document level, and applies to all operations defined on this path.                                        |
| `parameters`  |       [Parameters](#parameters)       | :heavy_minus_sign: | A list of [Parameter Objects](#parameter-object) that are common to all operations defined on this path.                                                                                       |
| `get`         | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`GET` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)                                                                            |
| `put`         | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`PUT` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)                                                                            |
| `post`        | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`POST` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)                                                                          |
| `delete`      | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`DELETE` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)                                                                      |
| `options`     | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`OPTIONS` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)                                                                    |
| `head`        | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`HEAD` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)                                                                          |
| `patch`       | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`PATCH` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)                                                                        |
| `trace`       | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`TRACE` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)                                                                        |
| `x-*`         |       [Extensions](#extensions)       | :heavy_minus_sign: | Any number of extension fields can be added to the path item object that can be used by tooling and vendors.                                                                                   |

The above order is a recommendation for how the fields should be ordered, but is not significant to the order in which the endpoints should be used.

### Webhooks

**(Available in OpenAPI 3.1.x ONLY)** Webhooks represents a possible list of incoming requests that form part of the documented API, that a consumer can subscribe to.

Webhooks are represented by a map of [Path Item Objects](#path-item-object) or [OpenAPI Reference Objects](#openapi-reference-object) that are keyed by the unique name of the webhook.

For example:

```yaml
webhooks:
  stockUpdate:
    post:
      summary: Receive stock updates.
      description: Receive stock updates from the bar, this will be called whenever the stock levels of a drink or ingredient changes.
      tags:
        - drinks
        - ingredients
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                drink:
                  $ref: "#/components/schemas/Drink"
                ingredient:
                  $ref: "#/components/schemas/Ingredient"
      responses:
        "200":
          description: The stock update was received successfully.
        "5XX":
          $ref: "#/components/responses/APIError"
        default:
          $ref: "#/components/responses/UnknownError"
```

### Components Object

The Components Object is a container for reusable objects that can be referenced across the API. These objects can be referenced using [References](#references), and generally are only valid if referenced by other parts of the API.

| Field             |                                                           Type                                                            |      Required      | Description                                                                                                                                                                                                                                                                                                 |
| ----------------- | :-----------------------------------------------------------------------------------------------------------------------: | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schemas`         |                                      *map[string, [Schema Object](#schema-object)]*                                       | :heavy_minus_sign: | A map of [Schema Objects](#schema-object) that can be referenced by other parts of the API.<br/><br/>**Note: OpenAPI `3.0.X` does support [OpenAPI Reference Objects](#openapi-reference-object) here as the value, but `3.1.x` uses the [JSON Schema Referencing](#json-schema-reference-object) format.** |
| `securitySchemes` | *map[string, [Security Scheme Object](#security-scheme-object) \| [OpenAPI Reference Object](#openapi-reference-object)]* | :heavy_minus_sign: | A map of [Security Scheme Objects](#security-scheme-object) that can be referenced by other parts of the API.                                                                                                                                                                                               |
| `pathItems`       |       *map[string, [Path Item Object](#path-item-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*       | :heavy_minus_sign: | A map of [Path Item Objects](#path-item-object) that can be referenced by other parts of the API.                                                                                                                                                                                                           |
| `parameters`      |       *map[string, [Parameter Object](#parameter-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*       | :heavy_minus_sign: | A map of [Parameter Objects](#parameter-object) that can be referenced by other parts of the API.                                                                                                                                                                                                           |
| `requestBodies`   |    *map[string, [Request Body Object](#request-body-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*    | :heavy_minus_sign: | A map of [Request Body Objects](#request-body-object) that can be referenced by other parts of the API.                                                                                                                                                                                                     |
| `responses`       |        *map[string, [Response Object](#response-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*        | :heavy_minus_sign: | A map of [Response Objects](#response-object) that can be referenced by other parts of the API.                                                                                                                                                                                                             |
| `headers`         |          *map[string, [Header Object](#header-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*          | :heavy_minus_sign: | A map of [Header Objects](#header-object) that can be referenced by other parts of the API.                                                                                                                                                                                                                 |
| `examples`        |         *map[string, [Example Object](#example-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*         | :heavy_minus_sign: | A map of [Example Objects](#example-object) that can be referenced by other parts of the API.                                                                                                                                                                                                               |
| `callbacks`       |        *map[string, [Callback Object](#callback-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*        | :heavy_minus_sign: | A map of [Callback Objects](#callback-object) that can be referenced by other parts of the API.                                                                                                                                                                                                             |
| `links`           |            *map[string, [Link Object](#link-object) \| [OpenAPI Reference Object](#openapi-reference-object)]*            | :heavy_minus_sign: | A map of [Link Objects](#link-object) that can be referenced by other parts of the API.                                                                                                                                                                                                                     |
| `x-*`             |                                                 [Extensions](#extensions)                                                 | :heavy_minus_sign: | Any number of extension fields can be added to the components object that can be used by tooling and vendors.                                                                                                                                                                                               |

## Operation Object

An Operation describes a single endpoint within the API, including all its possible inputs/outputs and configuration required to make a successful request.

Example:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      security:
        - {}
      tags:
        - drinks
      parameters:
        - name: type
          in: query
          description: The type of drink to filter by. If not provided all drinks will be returned.
          required: false
          schema:
            $ref: "#/components/schemas/DrinkType"
      responses:
        "200":
          description: A list of drinks.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
```

| Field         |                    Type                     |      Required      | Description                                                                                                                                                                                        |
| ------------- | :-----------------------------------------: | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationId` |                  *string*                   | :heavy_minus_sign: | A unique identifier for the operation, this ***must*** be unique within the document, and is ***case sensitive***. It is ***recommended*** to always define an `operationId`, but is not required. |
| `deprecated`  |                  *boolean*                  | :heavy_minus_sign: | Whether the operation is deprecated or not. Defaults to `false`.                                                                                                                                   |
| `summary`     |                  *string*                   | :heavy_minus_sign: | A short summary of what the operation does. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                      |
| `description` |                  *string*                   | :heavy_minus_sign: | A details description of the operation, what it does and how to use it. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                          |
| `servers`     |             [Servers](#servers)             | :heavy_minus_sign: | A list of [Server Objects](#server-object) that override the servers defined at the document and path level, and apply to this operation.                                                          |
| `security`    |            [Security](#security)            | :heavy_minus_sign: | A list of [Security Requirement Objects](#security-requirement-object) that override the security requirements defined at the document and path levels, and apply to this operation.               |
| `x-*`         |          [Extensions](#extensions)          | :heavy_minus_sign: | Any number of extension fields can be added to the operation object that can be used by tooling and vendors.                                                                                       |
| `parameters`  |          [Parameters](#parameters)          | :heavy_minus_sign: | A list of [Parameter Objects](#parameter-object) that are available to this operation. The parameters defined here merge with any defined at the path level, overriding any duplicates.            |
| `requestBody` | [Request Body Object](#request-body-object) | :heavy_minus_sign: | The request body for this operation, where the [HTTP Method supports](https://httpwg.org/specs/rfc7231.html) a request body otherwise this field is ignored.                                       |
| `responses`   |           [Responses](#responses)           | :heavy_check_mark: | A map of [Response Objects](#response-object) that define the possible responses from executing this operation.                                                                                    |
| `callbacks`   |           [Callbacks](#callbacks)           | :heavy_minus_sign: | A map of [Callback Objects](#callback-object) that define possible callbacks that may be executed as a result of this operation.                                                                   |

The above order of fields is a recommendation for how the fields should be defined in the document, and help to set the stage for the operation, and provide a clear understanding of what the operation does.

### Request Body Object

The request body is used to describe the body of the request for operations that support a request body.

| Field         |           Type            |      Required      | Description                                                                                                                          |
| ------------- | :-----------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------ |
| `description` |         *string*          | :heavy_minus_sign: | A description of the request body. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |
| `content`     |    [Content](#content)    | :heavy_check_mark: | A map of [Media Type Objects](#media-type-object) that define the possible media types that can be used for the request body.        |
| `required`    |         *boolean*         | :heavy_minus_sign: | Whether the request body is required or not. Defaults to `false`.                                                                    |
| `x-*`         | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the request body object that can be used by tooling and vendors.                      |

### Responses

The Responses object is a map of [Response Objects](#response-object) or [References](#references) to [Response Objects](#response-object) that define the possible responses that can be returned from executing the operation.

The keys in the map represent any known HTTP status codes that the API may return. The HTTP status codes can be defined like below:

- Numeric Status Code - ie `200`, `404` or `500` etc. HTTP status codes defined in [RFC 9110](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes).
- Status Code Wildcards - ie `1XX`, `2XX`, `3XX`, `4XX` or `5XX` etc. A wildcard that matches any status code in the range of its significant digit, for example `2XX` represents status codes `200` to `299` inclusive.
- `default` - A catch all identifier for any other status codes not defined in the map.

The map ***must*** contain at least one successful response code.

All values ***must*** be defined as explicit strings ie `"200"` to allow for compatibility between JSON and YAML.

For example:

```yaml
paths:
  /drinks:
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - drinks
      parameters:
        - name: type
          in: query
          description: The type of drink to filter by. If not provided all drinks will be returned.
          required: false
          schema:
            $ref: "#/components/schemas/DrinkType"
      responses:
        "200":
          description: A list of drinks.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
        "5XX":
          description: An error occurred interacting with the API.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/APIError"
        default:
          description: An unknown error occurred interacting with the API.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
```

Any number of [extension](#extensions) fields can be added to the responses object that can be used by tooling and vendors.

### Response Object

The Response Object describes a single response that can be returned from executing an [operation](#operation-object).

| Field         |           Type            |      Required      | Description                                                                                                                                           |
| ------------- | :-----------------------: | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` |         *string*          | :heavy_check_mark: | A description of the response. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                      |
| `headers`     |    [Headers](#headers)    | :heavy_minus_sign: | A map of [Header Objects](#header-object) that define the headers that can be returned from executing this operation.                                 |
| `content`     |    [Content](#content)    | :heavy_minus_sign: | A map of [Media Type Objects](#media-type-object) that define the possible media types that can be returned from executing this operation.            |
| `links`       |      [Links](#links)      | :heavy_minus_sign: | A map of [Link Objects](#link-object) or [References](#references) that define the possible links that can be returned from executing this operation. |
| `x-*`         | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the response object that can be used by tooling and vendors.                                           |

#### Links

The Links object is a map of [Link Objects](#link-object) or [References](#references) to [Link Objects](#link-object) that allow for describing possible API usage scenarios between different operations. For example if a response returns a `Drink` object, and the `Drink` object has a `ingredients` property that is a list of `Ingredient` objects, then a link can be defined to the `listIngredients` operation showing how the ingredients can be used as an input to the `listIngredients` operation.

For example:

```yaml
/drink/{name}:
  get:
    operationId: getDrink
      summary: Get a drink.
      description: Get a drink by name, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - drinks
      parameters:
        - name: name
          in: path
          required: true
          schema:
            type: string
      responses:
    responses:
      "200":
        description: A drink.
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Drink"
        links:
          listIngredients:
            operationId: listIngredients
            parameters:
              ingredients: $response.body#/ingredients
            description: The list of ingredients returned by the `getDrink` operation can be used as an input to the `listIngredients` operation, to retrieve additional details about the ingredients required to make the drink.
/ingredients:
    get:
      operationId: listIngredients
      summary: Get a list of ingredients.
      description: Get a list of ingredients, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      tags:
        - ingredients
      parameters:
        - name: ingredients
          in: query
          description: A list of ingredients to filter by. If not provided all ingredients will be returned.
          required: false
          style: form
          explode: false
          schema:
            type: array
            items:
              type: string
      responses:
        "200":
          description: A list of ingredients.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Ingredient"
        "5XX":
          $ref: "#/components/responses/APIError"
        default:
          $ref: "#/components/responses/UnknownError"
```

#### Link Object

The Link Object represents a possible link that can be followed from the response.

| Field          |                       Type                        |      Required      | Description                                                                                                                                                                                                                                                                                                                                  |
| -------------- | :-----------------------------------------------: | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationId`  |                     *string*                      | :heavy_check_mark: | The `operationId` of an [Operation](#operation-object) that exists in the document. Use either this field or the `operationRef` field not both.                                                                                                                                                                                              |
| `operationRef` |                     *string*                      | :heavy_check_mark: | Either a [Relative Reference](#references) or [Absolute Reference](#references) to an [Operation](#operation-object) that exists in the document. Use either this field or the `operationId` field not both.                                                                                                                                 |
| `description`  |                     *string*                      | :heavy_minus_sign: | A description of the link and intentions for it use. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                       |
| `parameters`   | *map[string, any \| [{Expression}](#expression)]* | :heavy_minus_sign: | A map of parameters to pass to the linked operation. The key is the name of the parameter and the value is either a constant value or an [Expression](#expression) that will be evaluated.<br/><br/>The parameter name can also be qualified with the location of the parameter, for example `path.parameter_name` or `query.parameter_name` |
| `requestBody`  |       *any \| [{Expression}](#expression)*        | :heavy_minus_sign: | A constant value or [Expression](#expression) that will be used as the request body when calling the linked operation.                                                                                                                                                                                                                       |
| `server`       |          [Server Object](#server-object)          | :heavy_minus_sign: | An optional server to be used by the linked operation.                                                                                                                                                                                                                                                                                       |
| `x-*`          |             [Extensions](#extensions)             | :heavy_minus_sign: | Any number of extension fields can be added to the link object that can be used by tooling and vendors.                                                                                                                                                                                                                                      |

OperationRef Example:

```yaml
links:
  listIngredients:
    operationRef: "#/paths/~1ingredients/get"
    parameters:
      ingredients: $response.body#/ingredients

# or

links:
  listIngredients:
    operationRef: "https://speakeasy.bar/#/paths/~1ingredients/get"
    parameters:
      ingredients: $response.body#/ingredients
```

#### Headers

A map of header names to [Header Objects](#header-object) or [References](#references) that define headers in [Response Objects](#response-object) or [Encoding Objects](#encoding-object).

In this simplified example, the server returns three [Header Objects](#header-object) with the names `X-RateLimit-Remaining`, `Last-Modified`, and `Cache-Control`:

```
paths:
  /drinks/{productCode}:
    get:
      responses:
        "200"
          description: A drink.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Drink"
          headers:
            X-RateLimit-Remaining:
              description: The number of requests left for the time window.
              schema:
                type: integer
                example: 99
            Last-Modified:
              description: The time at which the information was last modified.
              schema:
                type: string
                format: date-time
                example: '2024-01-26T18:25:43.511Z'
            Cache-Control:
              description: Instructions for caching mechanisms in both requests and responses.
              schema:
                type: string
                example: no-cache
```

##### Header Object

Describes a single header.

The name of a header is determined by the header's key in a `headers` map.

| Field         | Type                                                   | Required           | Description                                                                                                                                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `description` | *string*                                               | :heavy_minus_sign: | A description of the header. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                                             |
| `required`    | *boolean*                                              | :heavy_minus_sign: | Whether the header is required or not. Defaults to `false`.                                                                                                                                                                                                                                                                                |
| `deprecated`  | *boolean*                                              | :heavy_minus_sign: | Whether the header is deprecated or not. Defaults to `false`.                                                                                                                                                                                                                                                                              |
| `schema`      | [Schema Object](#schema-object)                        | :heavy_minus_sign: | A schema or reference to a schema that defines the type of the header. This is ***required*** unless `content` is defined.<br/><br/>**Note: OpenAPI `3.0.X` does support [OpenAPI Reference Objects](#openapi-reference-object) here as the value, but `3.1.x` uses the [JSON Schema Referencing](#json-schema-reference-object) format.** |
| `content`     | *map[string, [Media Type Object](#media-type-object)]* | :heavy_minus_sign: | A map of [Media Type Objects](#media-type-object) that define the possible media types that can be used for the header. This is ***required*** unless `schema` is defined.                                                                                                                                                                 |
| `x-*`         | [Extensions](#extensions)                              | :heavy_minus_sign: | Any number of extension fields can be added to the header object for use by tooling and vendors.                                                                                                                                                                                                                                           |

### Callbacks

A map of [Callback Objects](#callback-object) or [References](#references) that define incoming requests that may be triggered by the parent operation, and the expected responses to be returned. The key is a unique identifier for the collection of callbacks contained within.

**Note: Callbacks are only valid on operations that also pass the required URL to call the callback on, in either the parameters or the request body of the parent operation. In the event that a request from the API is sent in reaction to calling the parent operation but the callback URL is provided elsewhere, use [Webhooks](#webhooks) to document the callback instead (Webhooks only available in `3.1.x`)**

For example:

```yaml
  /order:
    post:
      operationId: createOrder
      summary: Create an order.
      description: Create an order for a drink.
      tags:
        - orders
      parameters:
        - name: callback_url
          in: query
          description: The url to call when the order is updated.
          required: false
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Order"
      responses:
        "200":
          description: The order was created successfully.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Order"
        "5XX":
          $ref: "#/components/responses/APIError"
        default:
          $ref: "#/components/responses/UnknownError"
      callbacks:
        orderUpdate:
          "{$request.query.callback_url}":
            post:
              summary: Receive order updates.
              description: Receive order updates from the supplier, this will be called whenever the status of an order changes.
              tags:
                - orders
              requestBody:
                required: true
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        order:
                          $ref: "#/components/schemas/Order"
              responses:
                "200":
                  description: The order update was received successfully.
                "5XX":
                  $ref: "#/components/responses/APIError"
                default:
                  $ref: "#/components/responses/UnknownError"
```

#### Callback Object

A map of [Runtime Expressions](#expression) (that represent a URL the callback request is sent to) to a [Path Item Object](#path-item-object) or [Reference](#references) that defines a request to be initiated by the API provider and a potential response to be returned.

The expression when evaluated at runtime will resolve to a URL either represented in the parameters, request body or response body of the parent operation.

Examples:

`{$request.query.callback_url}` will resolve to the value sent in the `callback_url` query parameter sent in the parent operation.

`{$request.body#/asyncURL}` will resolve to the value of the `asyncURL` property in the request body of the parent operation.

`{$response.body#/success/progressEndpoint}` will resolve to the value of the `progressEndpoint` property within the `success` object in the response body of the parent operation.

Any number of [extension](#extensions) fields can be added to the Callback Object that can be used by tooling and vendors.

### Content

A map of Media Types (including wildcards) to a [Media Type Object](#media-type-object) that describes the content of the request or response as it relates to the media type consumed or produced.

The key in the map is a [Media/MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) that determines how the content is encoded. This media type can include wildcards indicating a range of media types it covers. For example, `application/*` would match `application/json`, `application/xml`, etc. `*/*` would match any media type. Or it can be explicitly defined to match only a single media type. For example, `application/json; charset=utf-8`.

Where both a wildcard and a specific media type are defined, the specific media type definition takes precedence.

For example:

```yaml
content:
  application/json: # Upload a JSON file
    schema:
      $ref: "#/components/schemas/Drink"
  img/*: # Upload any image format
    schema:
      type: string
      format: binary
  text/*: # Upload any text based description of a drink
    schema:
      type: string
  text/csv: # Upload a CSV file (this will take precedence over text/*)
    schema:
      $ref: "#/components/schemas/Drink"
```

#### Media Type Object

A Media Type Object describes the request or response for a media type, with optional examples and extensions.

| Field      | Type                                                                                                      | Required           | Description                                                                                                                                                                                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `schema`   | [Schema Object](#schema-object)                                                                           | :heavy_minus_sign: | A schema that describes the request or response content.                                                                                                                                                                                                                                                                       |
| `example`  | *any*                                                                                                     | :heavy_minus_sign: | An optional example of the media type. This example overrides any examples from the [Schema Object](#schema-object) in the `schema` field. Mutually exclusive of the `examples` field.                                                                                                                                         |
| `examples` | *map[string, [Example Object](#example-object) \| [OpenAPI Reference Object](#openapi-reference-object)]* | :heavy_minus_sign: | Optional examples of the media type. These examples override any examples from the [Schema Object](#schema-object) in the `schema` field. Mutually exclusive of the `example` field.                                                                                                                                           |
| `encoding` | *map[string, [Encoding Object](#encoding-object)]*                                                        | :heavy_minus_sign: | An optional map of [Encoding Objects](#encoding-object). Each Encoding Object's key should match one of the properties from the [Schema Object](#schema-object) in the `schema` field. Only applies to [Request Body Objects](#request-body-object) when the media type is `multipart` or `application/x-www-form-urlencoded`. |
| `x-*`      | [Extensions](#extensions)                                                                                 | :heavy_minus_sign: | Any number of extension fields as required by tooling and vendors.                                                                                                                                                                                                                                                             |

#### Encoding Object

Only applicable to `requestBody` where the media type is `multipart` or `application/x-www-form-urlencoded`. An encoding object describes the encoding of a single property in the request schema.

| Field           | Type                                                                                            | Required           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentType`   | *string*                                                                                        | :heavy_minus_sign: | The Content-Type of the field. If the field is an `object`, the default is `application/json`. If the field is an array, the default is based on the inner type. Otherwise, the default is `application/octet-stream`. Valid values are either a media type (e.g. `application/json`), a wildcard media type (e.g. `image/*`), or a comma-separated list of media types and wildcard media types (e.g. `image/png, application/*`).                                             |
| `headers`       | *map[string, [Header Object](#header-object) \| [Reference Object](#openapi-reference-object)]* | :heavy_minus_sign: | Only applies to `multipart` requests. Allows additional headers related to the field. For example, if the client needs to add a `Content-Disposition` for an uploaded file. A `Content-Type` header in this map will be ignored, in favour of the `contentType` field of the encoding object.                                                                                                                                                                                   |
| `style`         | *string*                                                                                        | :heavy_minus_sign: | Can take one of the following values: `form`, `spaceDelimited`, `pipeDelimited`, `deepObject`. Specifies the style of the field's serialization only in requests with media type `multipart/form-data` or `application/x-www-form-urlencoded`. See the description of `style` under [Query Parameters](#query-parameters).                                                                                                                                                      |
| `explode`       | *boolean*                                                                                       | :heavy_minus_sign: | Only applies to requests with media type `multipart/form-data` or `application/x-www-form-urlencoded` and fields with `array` or `object` types. If `style` is `form`, the default is `true`, otherwise the default is `false`.                                                                                                                                                                                                                                                 |
| `allowReserved` | *boolean*                                                                                       | :heavy_minus_sign: | Only applies to requests with media type `application/x-www-form-urlencoded`. Determines whether reserved characters (those allowed in literals but with reserved meanings) are allowed in the parameter's content. The default is `false`. When `true`, it allows reserved characters as defined by [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986#section-2.2) to be included without percent-encoding. This can be useful for parameters with content such as URLs. |

```yaml
paths:
  /drinks:
    post:
      requestbody:
        content:
          multipart/form-data:
            schema:
              properties:
                # ... other properties ...
                photo:
                  description: A photo of the drink.
                  type: string
                  format: binary
            encoding:
              photo:
                contentType: image/jpeg, image/png
                headers:
                  Content-Disposition:
                    description: Specifies the disposition of the file (attachment and file name).
                    schema:
                      type: string
                      default: 'form-data; name="photo"; filename="default.jpg"'
                allowReserved: false
                # style: form - not applicable to strings
                # explode: false - not applicable to strings
```

### SDK Generation

`TODO`

## Parameters

Parameters are used to describe inputs to an operation, they can be defined at the path or operation level, and are merged together with any duplicates at the operation level overriding any defined at the path level.

Each parameter needs to be uniquely identified by a combination of its `name` and `in` fields, within an [Operation](#operation-object).

A parameter in the list can either be a [Parameter Object](#parameter-object) or a [Reference](#references) to a [Parameter Object](#parameter-object) defined in the [Components Object](#components-object) under the `parameters` field.

Parameters can represent an number of different input types including:

- Path Parameters
- Query Parameters
- Headers
- Cookies

Example:

```yaml
paths:
  /drinks/{type}:
    parameters:
      - name: type
        in: path
        description: The type of drink to filter by.
        required: true
        schema:
          $ref: "#/components/schemas/DrinkType"
      - name: Cache-Control
        in: header
        description: The cache control header.
        required: false
        schema:
          type: string
          enum:
            - no-cache
            - no-store
            - must-revalidate
            - max-age=0
            - max-age=3600
            - max-age=86400
            - max-age=604800
            - max-age=2592000
            - max-age=31536000
    get:
      operationId: listDrinks
      summary: Get a list of drinks.
      description: Get a list of drinks, if authenticated this will include stock levels and product codes otherwise it will only include public information.
      security:
        - {}
      tags:
        - drinks
      parameters:
        - name: limit
          in: query
          description: The maximum number of drinks to return.
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 100
      responses:
        "200":
          description: A list of drinks.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Drink"
```

### Parameter Object

| Field             |              Type               |      Required      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | :-----------------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`            |            *string*             | :heavy_check_mark: | The **case sensitive** name of the parameter. This ***must*** be unique when combined with the `in` field.<br/><br/>If the `in` field is `path` then this field ***must*** be referenced in the owning path.                                                                                                                                                                                                                                           |
| `in`              |            *string*             | :heavy_check_mark: | The type/location of the parameter. The available types are:<br/><ul><li>`path` - a templated parameter defined within the path.</li><li>`query` - a query parameter passed via the URL.</li><li>`header` - a header parameter passed via HTTP headers.</li><li>`cookie` - a cookie parameter passed via HTTP cookies.</li></ul>                                                                                                                       |
| `description`     |            *string*             | :heavy_minus_sign: | A description of the parameter. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                                                                                                                                                      |
| `required`        |            *boolean*            | :heavy_minus_sign: | Whether the parameter is required or not. If the `in` field is `path` then this field is **always** required and ***must*** be `true`. Defaults to `false`.                                                                                                                                                                                                                                                                                            |
| `deprecated`      |            *boolean*            | :heavy_minus_sign: | Whether the parameter is deprecated or not. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `style`           |            *string*             | :heavy_minus_sign: | Describes how the parameter value will be serialized depending on the `in` field. The available styles are `matrix`, `label`, `form`, `simple`, `spaceDelimited`, `pipeDelimited`, `deepObject`.<br/><br/>The default style depends on the `in` field:<br/><ul><li>`path` - `simple`</li><li>`query` - `form`</li><li>`header` - `simple`</li><li>`cookie` - `form`</li></ul>See [Parameter Serialization](#parameter-serialization) for more details. |
| `explode`         |            *boolean*            | :heavy_minus_sign: | Whether the parameter value will be exploded or not, based on the parameter type. Defaults to `true` when `style` is `form` otherwise `false`.<br><br/>See [Parameter Serialization](#parameter-serialization) for more details.                                                                                                                                                                                                                       |
| `schema`          | [Schema Object](#schema-object) | :heavy_minus_sign: | A schema or reference to a schema that defines the type of the parameter. This is ***required*** unless `content` is defined.<br/><br/>**Note: OpenAPI `3.0.X` does support [OpenAPI Reference Objects](#openapi-reference-object) here as the value, but `3.1.x` uses the [JSON Schema Referencing](#json-schema-reference-object) format.**                                                                                                          |
| `content`         |       [Content](#content)       | :heavy_minus_sign: | A map of [Media Type Objects](#media-type-object) that define the possible media types that can be used for the parameter. This is ***required*** unless `schema` is defined.                                                                                                                                                                                                                                                                          |
| `allowEmptyValue` |            *boolean*            | :heavy_minus_sign: | Whether the parameter value can be empty or not. Only used if `in` is `query`. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                    |
| `allowReserved`   |            *boolean*            | :heavy_minus_sign: | Whether the parameter value can contain reserved characters or not as defined by [RFC3986](https://www.rfc-editor.org/rfc/rfc3986). Only used if `in` is `query`. Defaults to `false`.                                                                                                                                                                                                                                                                 |
| `example`         |              *any*              | :heavy_minus_sign: | An example of the parameter's value. This is ignored if the `examples` field is defined.                                                                                                                                                                                                                                                                                                                                                               |
| `examples`        |      [Examples](#examples)      | :heavy_minus_sign: | A map of [Example Objects](#example-object) and/or [OpenAPI Reference Objects](#openapi-reference-object) that define the possible examples of the parameter's value.                                                                                                                                                                                                                                                                                  |
| `x-*`             |    [Extensions](#extensions)    | :heavy_minus_sign: | Any number of extension fields can be added to the parameter object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                                                                                           |

The above order of fields is a recommendation for how the fields should be defined in the document.

### Parameter Serialization

Depending on the `in`, `style` and `explode` fields the parameter value will be serialized in different ways depending on its schema type. Some combinations of schema type and parameter serialization are not valid and should be avoided.

`content` can also be used instead to define complex serialization scenarios for a parameter such as serializing an object to a JSON string for including in a query parameter in the URL.

#### Query Parameters

Query parameters are serialized at run-time to the query string of the URL, this means they are generally serialized to a string representation and must adhere to the [RFC3986](https://www.rfc-editor.org/rfc/rfc3986) specification. By default reserved characters are percent encoded (for example `?` becomes `%3F`), but this can be disabled by setting `allowReserved` to `true`.

By default query parameters are serialized using `style: form` and `explode: true`. but there are a number of different serialization options available:

- `style: form` - Form style serialization is the default serialization for query parameters, it generally uses ampersands (`&`) to separate multiple values and equals (`=`) to separate the key and value. Defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.8).
- `style: pipeDelimited` - Pipe delimited serialization uses pipes (`|`) to separate multiple values.
- `style: spaceDelimited` - Space delimited serialization uses percent encoded spaces (`%20`) to separate multiple values.
- `style: deepObject` - Deep object serialization uses nested objects to represent the parameter value.

##### Primitive Types

For primitive types such as `string`, `number`, `integer` and `boolean` the serialization is straight forward and the value is serialized as a string, the `style` and `explode` fields have little effect on the serialization.

For the examples below we will use a query parameter named `limit` with a value of `10`.

| Style            |       Explode == `true`       | Explode == `false` |
| ---------------- | :---------------------------: | :----------------: |
| `form`           | `/query?limit=10` *(default)* | `/query?limit=10`  |
| `pipeDelimited`  |       `/query?limit=10`       | `/query?limit=10`  |
| `spaceDelimited` |       `/query?limit=10`       | `/query?limit=10`  |
| `deepObject`     |         **NOT VALID**         |   **NOT VALID**    |

##### Simple Arrays

For simple arrays of primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `style` and `explode` fields.

For the examples below we will use a query parameter named `terms` with a value of `["gin", "vodka", "rum"]`.

| Style            |                  Explode == `true`                   |        Explode == `false`        |
| ---------------- | :--------------------------------------------------: | :------------------------------: |
| `form`           | `/query?terms=gin&terms=vodka&terms=rum` *(default)* |   `/query?terms=gin,vodka,rum`   |
| `pipeDelimited`  |       `/query?terms=gin&terms=vodka&terms=rum`       |  `/query?terms=gin\|vodka\|rum`  |
| `spaceDelimited` |       `/query?terms=gin&terms=vodka&terms=rum`       | `/query?terms=gin%20vodka%20rum` |
| `deepObject`     |                    **NOT VALID**                     |          **NOT VALID**           |

##### Simple Objects

For simple objects whose fields are primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `style` and `explode` fields.

For the examples below we will use a query parameter named `filter` with a value of `{"type": "cocktail", "strength": 5}`.

| Style            |                 Explode == `true`                 |               Explode == `false`               |
| ---------------- | :-----------------------------------------------: | :--------------------------------------------: |
| `form`           |   `/query?type=cocktail&strength=5` *(default)*   |    `/query?filter=type,cocktail,strength,5`    |
| `pipeDelimited`  |         `/query?type=cocktail&strength=5`         |  `/query?filter=type\|cocktail\|strength\|5`   |
| `spaceDelimited` |         `/query?type=cocktail&strength=5`         | `/query?filter=type%20cocktail%20strength%205` |
| `deepObject`     | `/query?filter[type]=cocktail&filter[strength]=5` |                 **NOT VALID**                  |

There is a special case for simple objects with fields that are an array of primitive types such as `string`, `number`, `integer` and `boolean` that can be handled by `style: deepObject` and `explode: true`. For example for a query parameter named `filter` with a value of `{"type": ["cocktail", "mocktail"], "strength": [5, 10]}`, this will be serialized like `/query?filter[type]=cocktail&filter[type]=mocktail&filter[strength]=5&filter[strength]=10`.

##### Complex Objects and Arrays

For complex objects and arrays, serialization in a query parameter is only really possible using `content` and not any `style` options.

For example serializing using JSON:

```yaml
parameters:
  - name: filter
    in: query
    content:
      application/json:
        schema:
          type: object
          properties:
            type:
              type: array
              items:
                type: string
            strength:
              type: array
              items:
                type: integer
```

would serialize to `/query?filter=%7B%22type%22%3A%5B%22cocktail%22%2C%22mocktail%22%5D%2C%22strength%22%3A%5B5%2C10%5D%7D` which is the equivalent of `/query?filter={"type":["cocktail","mocktail"],"strength":[5,10]}` unencoded.

#### Path Parameters

Path parameters are serialized at run-time to the path of the URL, this means they are generally serialized to a string representation and must adhere to the [RFC3986](https://www.rfc-editor.org/rfc/rfc3986) specification. Reserved characters are percent encoded (for example `?` becomes `%3F`).

By default path parameters are serialized using `style: simple` and `explode: false`, but there are a number of different serialization options available:

- `style: simple` - Simple style serialization is the default serialization for path parameters, using commas (`,`) to separate multiple values. Defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.7).
- `style: label` - Label style serialization uses dots (`.`) to separate multiple values. Defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.6).
- `style: matrix` - Matrix style serialization uses semicolons (`;`) to separate multiple values. Defined by [RFC6570](https://tools.ietf.org/html/rfc6570#section-3.2.5).

##### Primitive Types

For primitive types such as `string`, `number`, `integer` and `boolean` they are serialized as a string, the `style` and `explode` fields determine the prefix for the value generally.

For the examples below we will use a path parameter named `type` with a value of `cocktail` for a path templated URL of `/drinks/{type}`.

| Style    |    Explode == `true`     |    Explode == `false`    |
| -------- | :----------------------: | :----------------------: |
| `simple` |    `/drinks/cocktail`    |    `/drinks/cocktail`    |
| `label`  |   `/drinks/.cocktail`    |   `/drinks/.cocktail`    |
| `matrix` | `/drinks/;type=cocktail` | `/drinks/;type=cocktail` |

##### Simple Arrays

For simple arrays of primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `style` and `explode` fields.

For the examples below we will use a path parameter named `types` with a value of `["gin", "vodka", "rum"]` for a path templated URL of `/drinks/{types}`.

| Style    |             Explode == `true`              |         Explode == `false`          |
| -------- | :----------------------------------------: | :---------------------------------: |
| `simple` |          `/drinks/gin,vodka,rum`           | `/drinks/gin,vodka,rum` *(default)* |
| `label`  |          `/drinks/.gin.vodka.rum`          |      `/drinks/.gin,vodka,rum`       |
| `matrix` | `/drinks/;types=gin;types=vodka;types=rum` |   `/drinks/;types=gin,vodka,rum`    |

##### Simple Objects

For simple objects whose fields are primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `style` and `explode` fields.

For the examples below we will use a path parameter named `filter` with a value of `{"type": "cocktail", "strength": 5}` for a path templated URL of `/drinks/{filter}`.

| Style    |          Explode == `true`          |               Explode == `false`               |
| -------- | :---------------------------------: | :--------------------------------------------: |
| `simple` | `/drinks/type=cocktail,strength=5`  | `/drinks/type,cocktail,strength,5` *(default)* |
| `label`  | `/drinks/.type=cocktail.strength=5` |      `/drinks/.type,cocktail,strength,5`       |
| `matrix` | `/drinks/;type=cocktail;strength=5` |   `/drinks/;filter=type,cocktail,strength,5`   |

##### Complex Objects and Arrays

For complex objects and arrays, serialization in a path parameter is only really possible using `content` and not any `style` options.

For example serializing using JSON:

```yaml
parameters:
  - name: filter
    in: path
    content:
      application/json:
        schema:
          type: object
          properties:
            type:
              type: array
              items:
                type: string
            strength:
              type: array
              items:
                type: integer
```

would serialize to `/drinks/%7B%22type%22%3A%5B%22cocktail%22%2C%22mocktail%22%5D%2C%22strength%22%3A%5B5%2C10%5D%7D` which is the equivalent of `/drinks/{"type":["cocktail","mocktail"],"strength":[5,10]}` unencoded.

#### Header Parameters

Header parameters are serialized at run-time to the HTTP headers of the request, types are generally serialized to a string representation, and only `simple` style is available.

Explode defaults to `false`.

There are a few reserved headers that cannot be used as parameter names and are enabled by other OpenAPI features:

- `Accept` - Defining content types in the [Response Object](#response-object) `content` field, documents that available values for the `Accept` header.
- `Authorization` - Defining security requirements in the [Security Requirement Object](#security-requirement-object) `security` field, documents that the `Authorization` header is required.
- `Content-Type` - Defining content types in the [Request Body Object](#request-body-object) `content` field, documents that the `Content-Type` header is required and the acceptable values.

If using headers for authentication, it is recommended to use the OpenAPI [`security`](#security) field to document a security scheme instead of a header parameter.

##### Primitive Types

For primitive types such as `string`, `number`, `integer` and `boolean` they are serialized as a string.

For the examples below we will use a header parameter named `X-Drink-Limit` with a value of `5`.

| Style    | Explode == `true` |      Explode == `false`       |
| -------- | :---------------: | :---------------------------: |
| `simple` | `X-Drink-Type: 5` | `X-Drink-Type: 5` *(default)* |

##### Simple Arrays

For simple arrays of primitive types such as `string`, `number`, `integer` and `boolean` the `style` and `explode` fields have little effect on the serialization.

For the examples below we will use a header parameter named `X-Drink-Types` with a value of `["gin", "vodka", "rum"]`.

| Style    |       Explode == `true`       |            Explode == `false`             |
| -------- | :---------------------------: | :---------------------------------------: |
| `simple` | `X-Drink-Type: gin,vodka,rum` | `X-Drink-Type: gin,vodka,rum` *(default)* |

##### Simple Objects

For simple objects whose fields are primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `explode` field.

For the examples below we will use a header parameter named `X-Drink-Filter` with a value of `{"type": "cocktail", "strength": 5}`.

| Style    |            Explode == `true`             |                  Explode == `false`                  |
| -------- | :--------------------------------------: | :--------------------------------------------------: |
| `simple` | `X-Drink-Type: type=cocktail,strength=5` | `X-Drink-Type: type,cocktail,strength,5` *(default)* |

##### Complex Objects and Arrays

For complex objects and arrays, serialization in a header parameter is only really possible using `content` and not any `style` options.

For example serializing using JSON:

```yaml
parameters:
  - name: X-Drink-Filter
    in: header
    content:
      application/json:
        schema:
          type: object
          properties:
            type:
              type: array
              items:
                type: string
            strength:
              type: array
              items:
                type: integer
```

would serialize to `X-Drink-Filter: {"type":["cocktail","mocktail"],"strength":[5,10]}`.

#### Cookie Parameters

Cookie parameters are serialized at run-time to a HTTP cookie header, types are generally serialized to a string representation, and only `form` style is available.

Currently cookies are not well supported by OpenAPI and this may change in the future, so using the default `style: form` and `explode: true` values results in serialization incompatible with most cookie parsers.

Therefore it is only really recommended to use cookies for primitive types or arrays with `explode: false` but the current serialization behaviors are included below for completeness.

If using cookies for authentication, it is recommended to use the OpenAPI [`security`](#security) field to document a security scheme instead of a cookie parameter.

##### Primitive Types

For primitive types such as `string`, `number`, `integer` and `boolean` they are serialized as a string.

For the examples below we will use a cookie parameter named `drink-limit` with a value of `5`.

| Style  |          Explode == `true`           |   Explode == `false`    |
| ------ | :----------------------------------: | :---------------------: |
| `form` | `Cookie: drink-limit=5`  *(default)* | `Cookie: drink-limit=5` |

##### Simple Arrays

For simple arrays of primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `explode` field.

For the examples below we will use a cookie parameter named `drink-types` with a value of `["gin", "vodka", "rum"]`.

| Style  |                            Explode == `true`                            |         Explode == `false`          |
| ------ | :---------------------------------------------------------------------: | :---------------------------------: |
| `form` | `Cookie: drink-types=gin&drink-types=vodka&drink-types=rum` *(default)* | `Cookie: drink-types=gin,vodka,rum` |

##### Simple Objects

For simple objects whose fields are primitive types such as `string`, `number`, `integer` and `boolean` serialization will vary depending on the `explode` field.

For the examples below we will use a cookie parameter named `drink-filter` with a value of `{"type": "cocktail", "strength": 5}`.

| Style  |               Explode == `true`                |               Explode == `false`                |
| ------ | :--------------------------------------------: | :---------------------------------------------: |
| `form` | `Cookie: type=cocktail&strength=5` *(default)* | `Cookie: drink-filter=type,cocktail,strength,5` |

##### Complex Objects and Arrays

For complex objects and arrays, serialization in a cookie parameter is only really possible using `content` and not any `style` options.

For example serializing using JSON:

```yaml
parameters:
  - name: drink-filter
    in: cookie
    content:
      application/json:
        schema:
          type: object
          properties:
            type:
              type: array
              items:
                type: string
            strength:
              type: array
              items:
                type: integer
```

would serialize to `Cookie: drink-filter={"type":["cocktail","mocktail"],"strength":[5,10]}`.

## Schema Object

The Schema Object represents any data type used as input our output in OpenAPI. Data types can be objects, arrays, or primitives such as `string`, `number`, `integer` and `boolean`.

Schema objects are sometimes referred to as *models*, *data types*, or simply, *schemas*. This is because Schema types are used to model complex data types used by an API.

The Schema Object is based on and extends the [JSON Schema Specification Draft 2020-12](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00).

OpenAPI 3.1 uses all vocabularies from JSON Schema 2020-12, except for Format Assertion.

For an overview of all JSON Schema properties, see [JSON Schema Docs > JSON Schema 2020-12](https://www.learnjsonschema.com/2020-12/).

OpenAPI 3.1 changes the definition of two JSON Schema properties:

* `description` - In OpenAPI this property may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.
* `format` - OpenAPI extends JSON Schema's data types by adding additional formats. See [Data Type Formats](#data-type-formats).

OpenAPI adds an additional vocabulary to JSON Schema with the following properties:

| Field Name           | Type                                                            | Description                                                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `discriminator`      | [Discriminator Object](#discriminator-object)                   | A discriminator object describes how to differentiate between related schemas based on the value of a field in a request or response. See [Composition and Inheritance](#composition-and-inheritance). |
| `xml`                | [XML Object](#xml-object)                                       | Adds details about how the schema should be represented as XML.                                                                                                                                        |
| `externalDocs`       | [External Documentation Object](#external-documentation-object) | Points to external documentation for this schema.                                                                                                                                                      |
| `example`            | *any*                                                           | An example that satisfies this schema. **Deprecated:** Although valid, the use of `example` is discouraged. Use [Examples](#examples) instead.                                                         |
| `x-`                 | [Extensions](#extensions)                                       | Any number of extension fields can be added to the schema that can be used by tooling and vendors.                                                                                                     |
| Arbitrary properties | *any*                                                           | The schema object supports arbitrary properties without the `x-` prefix. This is discouraged in favour of [Extensions](#extensions).                                                                   |

The example below illustrates three schema objects: `IngredientProductCode`, `Ingredient`, and `IngredientType`.

```yaml
components:
  schemas:
    IngredientProductCode:
      description: The product code of an ingredient, only available when authenticated.
      type: string
      examples:
        - "AC-A2DF3"
        - "NAC-3F2D1"
        - "APM-1F2D3"
    Ingredient:
      type: object
      properties:
        name:
          description: The name of the ingredient.
          type: string
          examples:
            - Sugar Syrup
            - Angostura Bitters
            - Orange Peel
        type:
          $ref: "#/components/schemas/IngredientType"
        stock:
          description: The number of units of the ingredient in stock, only available when authenticated.
          type: integer
          examples:
            - 10
            - 5
            - 0
          readOnly: true
        productCode:
          $ref: "#/components/schemas/IngredientProductCode"
        photo:
          description: A photo of the ingredient.
          type: string
          format: uri
          examples:
            - https://speakeasy.bar/ingredients/sugar_syrup.jpg
            - https://speakeasy.bar/ingredients/angostura_bitters.jpg
            - https://speakeasy.bar/ingredients/orange_peel.jpg
      required:
        - name
        - type
    IngredientType:
      description: The type of ingredient.
      type: string
      enum:
        - fresh
        - long-life
        - packaged
```

### Composition and Inheritance

OpenAPI allows us to combine object schemas using the keywords `allOf`, `anyOf`, and `oneOf`.

These keywords correspond to the following logical operators:

| Keyword | Operator | Description                                                                      |
| ------- | -------- | -------------------------------------------------------------------------------- |
| `allOf` | `AND`    | A union of all subschemas. Instances must satisfy **all of** A, B, and C.        |
| `anyOf` | `OR`     | An inclusive disjunction. Instances must satisfy **at least one of** A, B, or C. |
| `oneOf` | `XOR`    | An exclusive disjunction. Instances must satisfy **exactly one of** A, B, or C.  |

The example below illustrates the different composition keywords:

```yaml
components:
  schemas:
    # ... Other schemas ...
    Negroni:
      description: A Negroni cocktail. Contains gin, vermouth and campari.
      allOf:
        - $ref: "#/components/schemas/Vermouth"
        - $ref: "#/components/schemas/Gin"
        - $ref: "#/components/schemas/Campari"
    Martini:
      description: A Martini cocktail. Contains gin and vermouth, or vodka and vermouth.
      oneOf:
        - $ref: "#/components/schemas/Vodka"
        - $ref: "#/components/schemas/Gin"
      allOf:
        - $ref: "#/components/schemas/Vermouth"
    Punch:
      description: A Punch cocktail. Contains any combination of alcohol.
      anyOf:
        - $ref: "#/components/schemas/Rum"
        - $ref: "#/components/schemas/Brandy"
        - $ref: "#/components/schemas/Whisky"
        - $ref: "#/components/schemas/Vodka"
        - $ref: "#/components/schemas/Gin"
```

### Discriminator Object

`TODO`

### XML Object

`TODO`

### Examples

`TODO`

#### Example Object

`TODO`

## Extensions

`TODO`

## References

`TODO`

### OpenAPI Reference Object

`TODO`

### JSON Schema Reference Object

### Expression

`TODO`

## Data Type Formats

`TODO`
