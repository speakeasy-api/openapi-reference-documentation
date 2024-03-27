# Server Variables

Server variables are a map of variable names (string) to [Server Variable Objects](/openapi/servers/server-variables#server-variable-object) that can be used for variable substitution via Templating.

## Server Variable Object

A Server Variable Object describes a single variable that is optionally part of the URL in a [Server Object](/openapi/servers). The value of a variable can be any arbitrary string value unless a list of allowed values is provided via the `enum` field.

| Field         |           Type            | Required | Description                                                                                                                                              |
| ------------- | :-----------------------: | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` |          String           |          | A description of the variable. [CommonMark syntax](https://spec.commonmark.org/) can be used to provide a rich description.                              |
| `default`     |          String           |    ✅    | The default value of the variable. A variable is always of type _string_. If `enum` is provided this **_must_** be one of the values in the `enum` list. |
| `enum`        |      List\<string\>       |          | A list of allowed string values for the variable.                                                                                                        |
| `x-*`         | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the Server Variable Object that can be used by tooling and vendors.                                       |

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

Any variable delimited by `{}` in the `url` field declares a part of the URL that **_must_** be replaced with a value and references a variable that **_must_** be defined in the `variables` map. It is the API consumer's responsibility to replace these variables (including the delimiters) with values to create a valid URL before making a request to the API. The defined `default` should be used if no other value is provided.