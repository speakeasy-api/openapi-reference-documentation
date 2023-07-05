# openapi-reference-documentation

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
    - [SDK Generation](#sdk-generation-3)
  - [Tags](#tags)
    - [Tag Object](#tag-object)
    - [SDK Generation](#sdk-generation-4)
  - [Paths Object](#paths-object)
    - [Path Item Object](#path-item-object)
  - [Webhooks](#webhooks)
  - [Components Object](#components-object)
    - [Security Schemes](#security-schemes)
    - [Path Items](#path-items)
- [Operation Object](#operation-object)
  - [Request Body Object](#request-body-object)
  - [Responses](#responses)
  - [Response Object](#response-object)
  - [Callbacks](#callbacks)
    - [Callback Object](#callback-object)
  - [Content](#content)
    - [Media Type Object](#media-type-object)
  - [SDK Generation](#sdk-generation-5)
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
  - [OneOf](#oneof)
- [Extensions](#extensions)
- [References](#references)
  - [Reference Object](#reference-object)


## DEVELOPMENT NOTES (REMOVE BEFORE PUBLISHING)

- I believe this should be an open source repo that we can use to showcase the docs and example SDKs generated from our example openapi document. This will allow things to be co-located (we can locate them separately but I think we will lose some coherency with that approach), benefit from community updates and improvements.
- I am building a `speakeasy` example openapi document as an example document similar to the petstore from swagger. The speakeasy it refers to is a bar, so everything is themed around that. I think this will be a good way to showcase the documentation and SDKs.
- I imagine the `SDK Generation` sections to actually be some sort of expandable section that can be toggled open and closed. This would allow the user to see the docs related to SDK Generation without it taking up too much space on the page. I also imagine we will potentially show examples in all the supported languages, via tabs or something similar.

### TODOs

- TODO: Go through and update all examples of yaml and generated code once full documentation and example spec is complete.
- TODO: Ensure we refer to API, Endpoint, etc consistently throughout the documentation.

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
| `openapi`           |                            *string*                             | :heavy_check_mark: | The version of the OpenAPI specification that the document conforms to, this should be one of the [Supported Versions](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) of the OpenAPI specification.<br /><br />*Note:* Speakeasy tooling currently only supports versions `3.0.X` and `3.1.X` of the OpenAPI specification.                                                                                                                                                                         |
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

The named security schemes referenced ***must*** be defined in the [Components Object](#components-object) under the [`securitySchemes`](#security-schemes) field.

Security can also be made optional by providing an empty object (`{}`) in the list of security requirements. For example:

```yaml
security:
  - apiKey: []
  - {}
```

Security can also be disable for a specific operation by providing an empty array (`[]`) in the list of security requirements. For example:

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

A Security Requirement Object defines a map of security schemes names to scopes that are required to access the API. The names ***must*** match the names defined in the [Components Object](#components-object) under the [`securitySchemes`](#security-schemes) field.

| Field                  |       Type       |      Required      | Description                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | :--------------: | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{securitySchemeName}` | *list\<string\>* | :heavy_minus_sign: | A list of scopes/roles required for the security scheme. If the security scheme type is `oauth2` or `openIdConnect`, this is a list of scopes names required by the API consumer to be able to access/use the API, for any other types this could contain a list of roles or similar required for the API consumer to obtain to authenticate with the API. |

#### SDK Generation

Depending on whether global or operation level security is used the Speakeasy SDK Generator will generate the correct code to handle the security requirements.

For global security requirements the generator may generate code like the following which is used when configuring the SDK instance:

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

`TODO: once we support optional method level security add an example for that here as well`

### Tags

The document level `tags` field contains a list of [tag](#tag-object) definitions that may be used to categorize or group operations in the API. Tags can be referenced by [Operations](#operation-object) via the operations level `tags` field.

Tag definitions at the document level are completely optional even if a undefined tag is referenced within an [Operation](#operation-object). Though it is recommended that all tags used to be defined here to provide useful documentation and intent for the tags.

Tag names ***must*** be unique within the document.

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
| `name`         |                            *string*                             | :heavy_check_mark: | The name of the tag. ***must*** be unique within the document.                                                              |
| `description`  |                            *string*                             | :heavy_minus_sign: | A description of the tag. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |
| `externalDocs` | [External Documentation Object](#external-documentation-object) | :heavy_minus_sign: | Additional external documentation for this tag.                                                                             |
| `x-*`          |                    [Extensions](#extensions)                    | :heavy_minus_sign: | Any number of extension fields can be added to the tag object that can be used by tooling and vendors.                      |

#### SDK Generation

`TODO`

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

| Field         |                 Type                  |      Required      | Description                                                                                                                                                                                                   |
| ------------- | :-----------------------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$ref`        |               *string*                | :heavy_minus_sign: | Allows for referencing a [Path Item Object](#path-item-object) defined in the [Components Object](#components-object) under the [`pathItems`](#path-items) field. If used then no other fields should be set. |
| `summary`     |               *string*                | :heavy_minus_sign: | A short summary of what the path item represents. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                           |
| `description` |               *string*                | :heavy_minus_sign: | A description of the path item. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                             |
| `servers`     |          [Servers](#servers)          | :heavy_minus_sign: | A list of [Server Objects](#server-object) that override the servers defined at the document level, and applies to all operations defined on this path.                                                       |
| `parameters`  |       [Parameters](#parameters)       | :heavy_minus_sign: | A list of [Parameter Objects](#parameter-object) that are common to all operations defined on this path.                                                                                                      |
| `get`         | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`GET` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)                                                                                           |
| `put`         | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`PUT` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)                                                                                           |
| `post`        | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`POST` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)                                                                                         |
| `delete`      | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`DELETE` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)                                                                                     |
| `options`     | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`OPTIONS` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)                                                                                   |
| `head`        | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`HEAD` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)                                                                                         |
| `patch`       | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`PATCH` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)                                                                                       |
| `trace`       | [Operation Object](#operation-object) | :heavy_minus_sign: | A operation associated with the [`TRACE` HTTP method.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)                                                                                       |
| `x-*`         |       [Extensions](#extensions)       | :heavy_minus_sign: | Any number of extension fields can be added to the path item object that can be used by tooling and vendors.                                                                                                  |

The above order is a recommendation for how the fields should be ordered, but is not significant to the order in which the endpoints should be used.

### Webhooks

`TODO`

### Components Object

`TODO`

#### Security Schemes

`TODO`

#### Path Items

`TODO`

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

| Field         |        Type         |      Required      | Description                                                                                                                          |
| ------------- | :-----------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------ |
| `description` |      *string*       | :heavy_minus_sign: | A description of the request body. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |
| `content`     | [Content](#content) | :heavy_check_mark: | A map of [Media Type Objects](#media-type-object) that define the possible media types that can be used for the request body.        |
| `required`    |      *boolean*      | :heavy_minus_sign: | Whether the request body is required or not. Defaults to `false`.                                                                    |

### Responses

`TODO`

### Response Object

`TODO`

### Callbacks

`TODO`

#### Callback Object

`TODO`

### Content

`TODO`

#### Media Type Object

`TODO`

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

| Field             |                                   Type                                   |      Required      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | :----------------------------------------------------------------------: | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`            |                                 *string*                                 | :heavy_check_mark: | The **case sensitive** name of the parameter. This ***must*** be unique when combined with the `in` field.<br/><br/>If the `in` field is `path` then this field ***must*** be referenced in the owning path.                                                                                                                                                                                                                                           |
| `in`              |                                 *string*                                 | :heavy_check_mark: | The type/location of the parameter. The available types are:<br/><ul><li>`path` - a templated parameter defined within the path.</li><li>`query` - a query parameter passed via the URL.</li><li>`header` - a header parameter passed via HTTP headers.</li><li>`cookie` - a cookie parameter passed via HTTP cookies.</li></ul>                                                                                                                       |
| `description`     |                                 *string*                                 | :heavy_minus_sign: | A description of the parameter. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                                                                                                                                                                                                                                                                                                                      |
| `required`        |                                *boolean*                                 | :heavy_minus_sign: | Whether the parameter is required or not. If the `in` field is `path` then this field is **always** required and ***must*** be `true`. Defaults to `false`.                                                                                                                                                                                                                                                                                            |
| `deprecated`      |                                *boolean*                                 | :heavy_minus_sign: | Whether the parameter is deprecated or not. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `style`           |                                 *string*                                 | :heavy_minus_sign: | Describes how the parameter value will be serialized depending on the `in` field. The available styles are `matrix`, `label`, `form`, `simple`, `spaceDelimited`, `pipeDelimited`, `deepObject`.<br/><br/>The default style depends on the `in` field:<br/><ul><li>`path` - `simple`</li><li>`query` - `form`</li><li>`header` - `simple`</li><li>`cookie` - `form`</li></ul>See [Parameter Serialization](#parameter-serialization) for more details. |
| `explode`         |                                *boolean*                                 | :heavy_minus_sign: | Whether the parameter value will be exploded or not, based on the parameter type. Defaults to `true` when `style` is `form` otherwise `false`.<br><br/>See [Parameter Serialization](#parameter-serialization) for more details.                                                                                                                                                                                                                       |
| `schema`          | [Schema Object](#schema-object) or [Reference Object](#reference-object) | :heavy_minus_sign: | A schema or reference to a schema that defines the type of the parameter. This is ***required*** unless `content` is defined.                                                                                                                                                                                                                                                                                                                          |
| `content`         |                           [Content](#content)                            | :heavy_minus_sign: | A map of [Media Type Objects](#media-type-object) that define the possible media types that can be used for the parameter. This is ***required*** unless `schema` is defined.                                                                                                                                                                                                                                                                          |
| `allowEmptyValue` |                                *boolean*                                 | :heavy_minus_sign: | Whether the parameter value can be empty or not. Only used if `in` is `query`. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                    |
| `allowReserved`   |                                *boolean*                                 | :heavy_minus_sign: | Whether the parameter value can contain reserved characters or not as defined by [RFC3986](https://www.rfc-editor.org/rfc/rfc3986). Only used if `in` is `query`. Defaults to `false`.                                                                                                                                                                                                                                                                 |
| `example`         |                                  *any*                                   | :heavy_minus_sign: | An example of the parameter's value. This is ignored if the `examples` field is defined.                                                                                                                                                                                                                                                                                                                                                               |
| `examples`        |                          [Examples](#examples)                           | :heavy_minus_sign: | A map of [Example Objects](#example-object) and/or [Reference Objects](#reference-object) that define the possible examples of the parameter's value.                                                                                                                                                                                                                                                                                                  |
| `x-*`             |                        [Extensions](#extensions)                         | :heavy_minus_sign: | Any number of extension fields can be added to the parameter object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                                                                                           |

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

##### Primitive Types

For primitive types such as `string`, `number`, `integer` and `boolean` they are serialized as a string, 

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

`TODO`

### OneOf

`TODO`

## Extensions

`TODO`

## References

`TODO`

### Reference Object

`TODO`
