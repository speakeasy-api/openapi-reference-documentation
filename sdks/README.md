# OpenAPI in SDKs

## The Info Object in Generated SDKs

The Speakeasy SDK Generator uses the `info` object to produce code comments and documentation for the generated SDKs. If [external documentation](#external-documentation-object) is also provided at the document level, this will be included in the generated comments, too.

For example:

```go
// Speakeasy - A bar that serves drinks
// A secret underground bar that serves drinks to those in the know.
type Speakeasy struct {
```

## External Documentation in Generated SDKs

The Speakeasy SDK Generator uses the `externalDocs` object to produce code comments and documentation for the generated SDKs. These will be included alongside comments for any of the Methods ([Operations](#operation-object)), Classes or Enums ([Object Schemas](#schema-object)), or SDK ([Tags](#tags)) that reference the `externalDocs` object.

For example:

```go
// Speakeasy - A bar that serves drinks
// A secret underground bar that serves drinks to those in the know.
// https://docs.speakeasy.bar - The Speakeasy Bar Documentation
type Speakeasy struct {
```

## Servers in Generated SDKs

The Speakeasy SDK Generator generally requires at least one absolute URL to be provided to ensure the out-of-the-box experience is as smooth as possible for developers using the generated SDKs. If not present in the OpenAPI document, an absolute URL can be provided via configuration. [Click here for more details](https://speakeasyapi.dev/docs/using-speakeasy/create-client-sdks/customize-sdks/servers/#declare-base-server-url).

Generated SDKs will contain a list of available servers that can be used with the SDK. The first server in the list is considered to be the default server to use and will be used if no other server is provided when initializing the SDK (in the case of global servers) or when using a method (in the case of path or operation servers).

For global servers, some of the generated code will look like this:

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

The code above is used like this:

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

For path and operation servers, the default server will be used when using a method if no other URL is provided. For example:

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

The developer experience of SDKs can be improved when providing multiple servers that can be selected by using [`x-speakeasy-server-id`](https://speakeasyapi.dev/docs/archive/server-urls/#speakeasy-server-extensions) to assign IDs to each server. This allows the generator to generate a map of servers and provide methods for selecting a server by ID. For example:

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

The code above is used like this:

```go
// Create a new Speakeasy SDK Instance using the staging server via ID
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
    speakeasy.WithServer(speakeasy.ServerStaging),
)
```

When server variables are used, the SDK Generator will generate methods for setting the values of the variables. For example:

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

This code is used as follows:

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

## Security Schemes in Generated SDKs

Speakeasy does not support `mutualTLS`, the HTTP digest security type, and some programming languages and flows for OAuth. For details, please see this [article](https://www.speakeasyapi.dev/docs/customize-sdks/authentication). Using OAuth requires you to [write your own callback function](https://www.speakeasyapi.dev/docs/customize-sdks/authentication#step-2-add-your-callback-function-to-your-sdks).

Below is a list showing how to call each supported authentication type illustrated in the previous section's example schema once Speakeasy has created an SDK:

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

Depending on whether global- or operation-level security is used, the Speakeasy SDK Generator will generate the correct code to handle the security requirements.

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

The above is used like this:

```go
// Create a new Speakeasy SDK Instance
s := speakeasy.New(
    speakeasy.WithSecurity(shared.Security{
        APIKey: "YOUR_API_KEY_HERE",
    }),
)
```

For operation-level security requirements, the generator may generate code like the following, which is used when calling a method:

```go
// drinks.go

// GetDrink - Get a drink by name.
func (s *drinks) GetDrink(ctx context.Context, request operations.GetDrinkRequest, security operations.GetDrinkSecurity) (*operations.GetDrinkResponse, error) {
  // implementation...
}
```

The above is used like this:

```go
// Create a new Speakeasy SDK Instance
s := speakeasy.New()

res := s.Drinks.GetDrink(ctx, operations.GetDrinkRequest{Name: "Long Island Ice Tea"}, operations.GetDrinkSecurity{APIKey: "YOUR_API_KEY_HERE"})
```

[//]: # "TODO: once we support optional method level security add an example for that here as well"

## SDK Creation

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

### Define Multi-Level Namespaces

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

## Operation Objects in Generated SDKs

The Speakeasy SDK generator creates a complete self-contained file per operation.

For our Speakeasy Bar example, this modular approach would lead to the following TypeScript files.

```bash
src/models/operations/
├── authenticate.ts
├── createorder.ts
├── deletedrink.ts
├── getdrink.ts
├── index.ts
├── listdrinks.ts
├── searchdrinks.ts
├── subscribetowebhooks.ts
├── updatedrinkjson.ts
├── updatedrinkmultipart.ts
├── updatedrinkraw.ts
└── updatedrinkstring.ts
```

Each operation is presented as a function with the `operationId` as the function name. When using tags to structure the SDK, each operation function is bundled in a module named after its tag.

Speakeasy generates the following usage example as part of the TypeScript SDK:

```typescript
import { SDK } from "openapi";

async function run() {
  const sdk = new SDK();

  const productCode = "NAC-3F2D1";
  const operationSecurity = "<YOUR_API_KEY_HERE>";
  
  const result = await sdk.drinks.getDrink(operationSecurity, productCode);

  // Handle the result
  console.log(result)
}

run();
```