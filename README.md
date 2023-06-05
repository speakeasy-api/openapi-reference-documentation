# openapi-reference-documentation

- [openapi-reference-documentation](#openapi-reference-documentation)
  - [DEVELOPMENT NOTES (REMOVE BEFORE PUBLISHING)](#development-notes-remove-before-publishing)
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
      - [Server Variables \& Templating](#server-variables--templating)
      - [Server Variable Object](#server-variable-object)
      - [SDK Generation](#sdk-generation-2)
    - [Security](#security)
      - [Security Requirement Object](#security-requirement-object)
      - [SDK Generation](#sdk-generation-3)
    - [Tags](#tags)
    - [Paths Object](#paths-object)
    - [Webhooks](#webhooks)
    - [Components Object](#components-object)
  - [References](#references)

## DEVELOPMENT NOTES (REMOVE BEFORE PUBLISHING)

- I believe this should be an open source repo that we can use to showcase the docs and example SDKs generated from our example openapi document. This will allow things to be co-located (we can locate them separately but I think we will lose some coherency with that approach), benefit from community updates and improvements.
- I am building a `speakeasy` example openapi document as an example document similar to the petstore from swagger. The speakeasy it refers to is a bar, so everything is themed around that. I think this will be a good way to showcase the documentation and SDKs.
- I imagine the `SDK Generation` sections to actually be some sort of expandable section that can be toggled open and closed. This would allow the user to see the docs related to SDK Generation without it taking up too much space on the page. I also imagine we will potentially show examples in all the supported languages, via tabs or something similar.
- TODO: Go through and update all examples of yaml and generated code one full documentation and example spec is complete.

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

| Field               |                              Type                               |      Required      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | :-------------------------------------------------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openapi`           |                            *string*                             | :heavy_check_mark: | The version of the OpenAPI specification that the document conforms to, this should be one of the [Supported Versions](https://github.com/OAI/OpenAPI-Specification/tree/main/versions) of the OpenAPI specification.<br /><br />*Note:* Speakeasy tooling currently only supports versions `3.0.X` and `3.1.X` of the OpenAPI specification.                                                                                                                                                                         |
| `jsonSchemaDialect` |                            *string*                             | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />The version of the JSON Schema specification that the document conforms to (if not provided by the `$schema` field within a [Schema Object]() <`TODO:Link`>), this is a URI to one of the [Supported Versions](https://json-schema.org/specification-links.html#published-drafts) of the JSON Schema specification.<br /><br />*Note:* Currently **not** supported by Speakeasy tooling.                                                                                   |
| `info`              |                   [Info Object](#info-object)                   | :heavy_check_mark: | Contains information about the document including fields like `title`, `version`, `description` that help to identify the purpose and owner of the document.                                                                                                                                                                                                                                                                                                                                                          |
| `externalDocs`      | [External Documentation Object](#external-documentation-object) | :heavy_minus_sign: | Optional documentation available externally about the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `x-*`               |                    [Extensions](#extensions)                    | :heavy_minus_sign: | Any number of extension fields can be added to the document (for example: [`x-speakeasy-name-overrides`](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/methods/#change-method-names) that allows the default generated method names of operations to be overridden) that can be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. When provide at the global level here the extensions generally apply to the entire document. |
| `servers`           |                       [Servers](#servers)                       | :heavy_minus_sign: | Contains an optional list of servers the API is available on, if not provided the default URL is assumed to be `/` a path relative to where the OpenAPI document is hosted.                                                                                                                                                                                                                                                                                                                                           |
| `security`          |                      [Security](#security)                      | :heavy_minus_sign: | Contains an optional list of security requirements that apply to all operations in the API. If not provided, the default security requirements are assumed to be `[]` an empty array.                                                                                                                                                                                                                                                                                                                                 |
| `tags`              |                          [Tags](#tags)                          | :heavy_minus_sign: | Contains an optional list of tags that are generally used to group or categorize a set of [Operations]()<`TODO:Link`>.                                                                                                                                                                                                                                                                                                                                                                                                |
| `paths`             |                  [Paths Object](#paths-object)                  | :heavy_minus_sign: | Contains the paths and operations available within the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `webhooks`          |                      [Webhooks](#webhooks)                      | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />Contains an optional list of incoming webhooks that the API consumer can subscribe to.                                                                                                                                                                                                                                                                                                                                                                                     |
| `components`        |             [Components Object](#components-object)             | :heavy_minus_sign: | Contains an optional list of reusable components that can be referenced from other parts of the document.                                                                                                                                                                                                                                                                                                                                                                                                             |

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

| Field            |               Type                |      Required      | Description                                                                                                                                                                       |
| ---------------- | :-------------------------------: | :----------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          |             *string*              | :heavy_check_mark: | A name for the API contained within the document.                                                                                                                                 |
| `version`        |             *string*              | :heavy_check_mark: | The version of this OpenAPI document. *Not* the version of the API or the OpenAPI specification used. This is recommend to be a [Semantic Version.](https://semver.org/)          |
| `summary`        |             *string*              | :heavy_minus_sign: | **(Available in OpenAPI 3.1.x ONLY)**<br />A short sentence summarizing the API contained with the document.                                                                      |
| `description`    |             *string*              | :heavy_minus_sign: | A longer description of the API contained within the document. This can contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description.                  |
| `contact`        | [Contact Object](#contact-object) | :heavy_minus_sign: | Contact information for the maintainer of the API.<br /><br />*Note:* Currently not supported by Speakeasy tooling.                                                               |
| `license`        | [License Object](#license-object) | :heavy_minus_sign: | The license the API is made available under.                                                                                                                                      |
| `termsOfService` |             *string*              | :heavy_minus_sign: | A URL to the terms of service for the API.                                                                                                                                        |
| `x-*`            |     [Extensions](#extensions)     | :heavy_minus_sign: | Any number of extension fields can be added to the info object that can be used by tooling and vendors to add additional metadata and functionality to the OpenAPI Specification. |

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

### External Documentation Object

Allows for providing information about external documentation available for the API, Operation, Tag, or Schema.

| Field         |           Type            |      Required      | Description                                                                                                                               |
| ------------- | :-----------------------: | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         |         *string*          | :heavy_check_mark: | A URL to the external documentation.                                                                                                      |
| `description` |         *string*          | :heavy_minus_sign: | A description of the external documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description. |
| `x-*`         | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the external documentation object that can be used by tooling and vendors.                 |

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

If a list of servers is provided at the `paths` level, the servers will override any servers provided at the document level. If a list of servers is provided at the `operation` level, the servers will override any servers provided at the `paths` & document levels.

#### Server Object

A Server Object describes a single server that is available for the API.

| Field         |                       Type                        |      Required      | Description                                                                                                                                                                                                                                                                                                                |
| ------------- | :-----------------------------------------------: | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         |                     *string*                      | :heavy_check_mark: | A URL to the server. This can either be a absolute URL or a relative URL to the hosted location of the OpenAPI document. The URL also supports variable substitutions via [Templating](#server-variables--templating)                                                                                                      |
| `description` |                     *string*                      | :heavy_minus_sign: | A description of the server. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                                                                                                                                                                                                  |
| `variables`   | [Server Variables](#server-variables--templating) | :heavy_minus_sign: | A map of variable names to [Server Variable Objects](#server-variable-object) that can be used for variable substitution via [Templating](#server-variables--templating).                                                                                                                                                  |
| `x-*`         |             [Extensions](#extensions)             | :heavy_minus_sign: | Any number of extension fields can be added to the server object (for example: [`x-speakeasy-server-id`](https://speakeasyapi.dev/docs/archive/server-urls/#speakeasy-server-extensions) that allows IDs to be assigned to each server for easier selection via Speakeasy's SDKs) that can be used by tooling and vendors. |

The URL must conform to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) ie `schema://host{:port}{/path}` not include the query string and must be URL encoded (except for the templating delimiters `{}` if not part of the URL).

The URL can contain fragments ie `https://speakeasy.bar#mocktails` and can be used to allow repeated URLs with different fragments to be defined in the same document, allowing the definition of multiple operations with the same URL and HTTP method but different operation definitions.

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

Any variable delimited by `{}` in the `url` field declares a part of the URL that must be replaced with a value and references a variable that must be defined in the `variables` map. It is the API consumer's responsibility to replace these variables (including the delimiters) with values to create a valid URL before making a request to the API. The defined `default` should be used if no other value is provided.

#### Server Variable Object

A Server Variable Object describes a single variable that is optionally part of the URL in a [Server Object](#server-object). The value of a variable can be any arbitrary *string* value unless a list of allowed values is provided via the `enum` field.

| Field         |           Type            |      Required      | Description                                                                                                                                        |
| ------------- | :-----------------------: | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` |         *string*          | :heavy_minus_sign: | A description of the variable. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                        |
| `default`     |         *string*          | :heavy_check_mark: | The default value of the variable. A variable is always of type *string*. If `enum` is provided this must be one of the values in the `enum` list. |
| `enum`        |     *list\<string\>*      | :heavy_minus_sign: | A list of allowed *string* values for the variable.                                                                                                |
| `x-*`         | [Extensions](#extensions) | :heavy_minus_sign: | Any number of extension fields can be added to the server variable object that can be used by tooling and vendors.                                 |

#### SDK Generation

The Speakeasy SDK Generator generally requires at least one absolute URL to be provided to ensure the out of the box experience is as smooth as possible for developers using the generated SDKs. If not present in the OpenAPI document this can be provided via configuration. [Click here for more details](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/servers/#declare-base-server-url)

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

`security` is a list of [Security Requirement Objects](#security-requirement-object) that apply to either all operations in the API if defined at the [document](#document-structure) level or to a specific operation if defined at the [Operation]()<`TODO:Link`> level.

Operation level security requirements override any security requirements defined at the document level.

If not provided at the document level, the default security requirements are assumed to be `[]` an empty array.

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

The named security schemes referenced must be defined in the [Components Object](#components-object) under the [`securitySchemes`]()<`TODO:Link`> field.

Security can also be made optional by providing an empty object (`{}`) in the list of security requirements. For example:

```yaml
security:
  - apiKey: []
  - {}
```

The combination of different security requirements can be used to express complex authorization scenarios. For example:

```yaml
security:
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
security:
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

A Security Requirement Object defines a map of security schemes names to scopes that are required to access the API. The names must match the names defined in the [Components Object](#components-object) under the [`securitySchemes`]()<`TODO:Link`> field.

| Field                  |       Type       |      Required      | Description                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | :--------------: | :----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{securitySchemeName}` | *list\<string\>* | :heavy_minus_sign: | A list of scopes/roles required for the security scheme. If the security scheme type is `oauth2` or `openIdConnect`, this is a list of scopes names required by the API consumer to be able to access/use the API, for any other types this could contain a list of roles or similar required for the API consumer to obtain to authenticate with the API. |

#### SDK Generation

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
