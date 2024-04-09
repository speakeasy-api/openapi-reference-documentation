# OpenAPI Workflows

The OpenAPI Workflows Specification is a proposed addition to the OpenAPI Specification that allows you to define sequences of operations for your API.

A workflows description is a separate document that references your OpenAPI document and describes how to combine operations from your OpenAPI document into step-by-step sequences.

The [OpenAPI Workflows Specification](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md) is still under active development and is therefore not considered stable. The information on this page is subject to change.

Workflows are useful for:

- Defining complex sequences of operations that involve multiple API calls.
- Documenting the expected behavior of your API in a more structured way than a narrative description.
- Generating code to execute the sequences of operations.
- Generating tests to verify that the sequences of operations behave as expected.
- Generating documentation that explains how to use the sequences of operations.

## Workflows Description Structure

A workflows description is a JSON or YAML document that follows the structure defined by the Workflows Specification.


`workflowsSpec`

| Field Name | Type   | Required |
|------------|--------|----------|
| `workflowsSpec` | String | ✅        |

The version of the Workflows Specification that the document uses. The value must be a supported [version number](#workflows-specification-versions).

```yaml workflows.yaml
workflowsSpec: 1.0.0-prerelease
info:
  title: Speakeasy Bar Workflows
  summary: Workflows for managing the Speakeasy Bar API
  description: >
    This document defines workflows for managing the [Speakeasy Bar API](https://bar.example.com), including
    creating new drinks, managing inventory, and processing orders.
  version: 4.6.3
sourceDescriptions:
  - name: speakeasyBar
    url: https://bar.example.com/openapi.yaml
    type: openapi
  - name: printsAndBeeps
    url: https://output.example.com/workflows.yaml
    type: workflowsSpec
workflows:
  - workflowId: createDrink
    summary: Create a new drink in the bar's menu
    inputs:
      allOf:
        - $ref: '#/components/inputs/authenticate'
        - type: object
          properties:
            drink_name:
              type: string
            drink_type:
              type: string
            drink_price_usd_cent:
              type: integer
            ingredients:
              type: array
              items:
                type: string
    steps:
      - stepId: authenticate
        operationId: authenticate
        parameters:
          - name: $components.parameters.username
          - name: $components.parameters.password
      - stepId: createDrink
        operationId: createDrink
        parameters:
          - name: $components.parameters.authorization
          - name: name
            in: query
            value: $inputs.drink_name
          - name: type
            in: query
            value: $inputs.drink_type
          - name: price
            in: query
            value: $inputs.drink_price_usd_cent
          - name: ingredients
            in: query
            value: $inputs.ingredients
  - workflowId: makeDrink
    summary: Order a drink and check the order status
    inputs:
      - name: orderType
        description: The type of order
        type: string
        required: true
      - name: productCode
        description: The product code of the drink
        type: string
        required: true
      - name: quantity
        description: The quantity of the drink
        type: integer
        required: true
    steps:
      - stepId: orderDrink
        operationId: createOrder
        parameters:
          - name: orderType
            in: body
            value: $inputs.orderType
          - name: productCode
            in: body
            value: $inputs.productCode
          - name: quantity
            in: body
            value: $inputs.quantity
      - stepId: checkStatus
        operationId: getOrder
        parameters:
          - name: orderNumber
            in: path
            value: $orderDrink.orderNumber
        successCriteria:
          - type: simple
            condition: $checkStatus.status == 'completed'
        onSuccess:
          - name: printReceipt
            type: goto
            workflowId: $sourceDescriptions.printsAndBeeps.printReceipt
            criteria:
              - type: simple
                condition: $checkStatus.status == 'completed'
        onFailure:
          - name: beepLoudly
            type: goto
            workflowId: $sourceDescriptions.printsAndBeeps.beepLoudly
            criteria:
              - type: simple
                condition: $checkStatus.status == 'failed'
  - workflowId: addIngredient
    summary: Add a new ingredient to the bar's inventory
    inputs:
      - name: username
        description: The username of the manager
        type: string
        required: true
      - name: password
        description: The password of the manager
        type: string
        required: true
      - name: ingredient_name
        description: The name of the ingredient
        type: string
        required: true
      - name: ingredient_type
        description: The type of the ingredient
        type: string
        required: true
      - name: ingredient_stock
        description: The stock of the ingredient
        type: integer
        required: true
      - name: productCode
        description: The product code of the ingredient
        type: string
        required: true
    steps:
      - stepId: authenticate
        operationId: authenticate
        parameters:
          - name: $components.parameters.username
            value: admin
          - name: $components.parameters.password
      - stepId: addIngredient
        operationId: createIngredient
        parameters:
          - name: $components.parameters.authorization
          - name: name
            in: query
            value: $inputs.ingredient_name
          - name: type
            in: query
            value: $inputs.ingredient_type
          - name: stock
            in: query
            value: $inputs.ingredient_stock
          - name: productCode
            in: query
            value: $inputs.productCode
components:
  inputs:
    authenticate:
      type: object
      properties:
        username:
          type: string
        password:
          type: string
  parameters:
    authorization:
      name: Authorization
      in: header
      value: $authenticate.outputs.token
    username:
      name: username
      in: body
      value: $inputs.username
    password:
      name: password
      in: body
      value: $inputs.password
```

---

`info`

| Field Name | Type                        | Required |
|------------|----------------------------| ----------|
| `info`     | [Info Object](#info-object) | ✅         |

Provides metadata about the workflows description.

```yaml workflows.yaml
info:
  title: Speakeasy Bar Workflows
  summary: Workflows for managing the Speakeasy Bar API
  description: >
    This document defines workflows for managing the [Speakeasy Bar API](https://bar.example.com), including
    creating new drinks, managing inventory, and processing orders.
  version: 4.6.3
```

---

`sourceDescriptions`

| Field Name          | Type                                             | Required |
|---------------------|--------------------------------------------------|----------|
| `sourceDescriptions` | [[Source Description Object](#source-description-object)] | ✅        |

An array of [source description objects](#source-description-object) defining the OpenAPI or other documents containing the operations referenced by the workflows. The array must contain at least one source.

```yaml workflows.yaml
sourceDescriptions:
  - name: speakeasyBar
    url: https://bar.example.com/openapi.yaml
    type: openapi
  - name: printsAndBeeps
    url: https://output.example.com/workflows.yaml
    type: workflowsSpec
```

---

`workflows`

| Field Name | Type                          | Required |
|------------|-------------------------------|----------|
| `workflows` | [[Workflow Object](#workflow-object)] | ✅        |

An array of [workflow objects](#workflow-object) defining the workflows. The array must contain at least one workflow.

```yaml workflows.yaml
workflows:
  - workflowId: createDrink
    summary: Create a new drink in the bar's menu
    inputs:
      allOf:
        - $ref: '#/components/inputs/authenticate'
        - type: object
          properties:
            drink_name:
              type: string
            drink_type:
              type: string
            drink_price_usd_cent:
              type: integer
            ingredients:
              type: array
              items:
                type: string
    steps:
      - stepId: authenticate
        operationId: authenticate
        parameters:
          - name: $components.parameters.username
          - name: $components.parameters.password
      - stepId: createDrink
        operationId: createDrink
        parameters:
          - name: $components.parameters.authorization
          - name: name
            in: query
            value: $inputs.drink_name
          - name: type
            in: query
            value: $inputs.drink_type
          - name: price
            in: query
            value: $inputs.drink_price_usd_cent
          - name: ingredients
            in: query
            value: $inputs.ingredients
  - workflowId: makeDrink
    summary: Order a drink and check the order status
    inputs:
      - name: orderType
        description: The type of order
        type: string
        required: true
      - name: productCode
        description: The product code of the drink
        type: string
        required: true
      - name: quantity
        description: The quantity of the drink
        type: integer
        required: true
    steps:
      - stepId: orderDrink
        operationId: createOrder
        parameters:
          - name: orderType
            in: body
            value: $inputs.orderType
          - name: productCode
            in: body
            value: $inputs.productCode
          - name: quantity
            in: body
            value: $inputs.quantity
      - stepId: checkStatus
        operationId: getOrder
        parameters:
          - name: orderNumber
            in: path
            value: $orderDrink.orderNumber
        successCriteria:
          - type: simple
            condition: $checkStatus.status == 'completed'
        onSuccess:
          - name: printReceipt
            type: goto
            workflowId: $sourceDescriptions.printsAndBeeps.printReceipt
            criteria:
              - type: simple
                condition: $checkStatus.status == 'completed'
        onFailure:
          - name: beepLoudly
            type: goto
            workflowId: $sourceDescriptions.printsAndBeeps.beepLoudly
            criteria:
              - type: simple
                condition: $checkStatus.status == 'failed'
  - workflowId: addIngredient
    summary: Add a new ingredient to the bar's inventory
    inputs:
      - name: username
        description: The username of the manager
        type: string
        required: true
      - name: password
        description: The password of the manager
        type: string
        required: true
      - name: ingredient_name
        description: The name of the ingredient
        type: string
        required: true
      - name: ingredient_type
        description: The type of the ingredient
        type: string
        required: true
      - name: ingredient_stock
        description: The stock of the ingredient
        type: integer
        required: true
      - name: productCode
        description: The product code of the ingredient
        type: string
        required: true
    steps:
      - stepId: authenticate
        operationId: authenticate
        parameters:
          - name: $components.parameters.username
            value: admin
          - name: $components.parameters.password
      - stepId: addIngredient
        operationId: createIngredient
        parameters:
          - name: $components.parameters.authorization
          - name: name
            in: query
            value: $inputs.ingredient_name
          - name: type
            in: query
            value: $inputs.ingredient_type
          - name: stock
            in: query
            value: $inputs.ingredient_stock
          - name: productCode
            in: query
            value: $inputs.productCode
```

This table shows all fields at the root of the OpenAPI Workflows Specification:

| Field Name          | Type                                                       | Required | Description                                                                                                                                                                      |
|---------------------|------------------------------------------------------------| ----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `workflowsSpec`     | String                                                     | ✅         | The version of the Workflows Specification that the document uses. The value must be a supported [version number](#workflows-specification-versions).                            |
| `info`              | [Info Object](#info-object)                                | ✅         | Provides metadata about the workflows description.                                                                                                                               |
| `sourceDescriptions` | [[Source Description Object](#source-description-object)] | ✅         | An array of [source description objects](#source-description-object) defining the OpenAPI or other documents containing the operations referenced by the workflows. The array must contain at least one source. |
| `workflows`         | [[Workflow Object](#workflow-object)]                      | ✅         | An array of [workflow objects](#workflow-object) defining the workflows. The array must contain at least one workflow.                                                                                        |
| `components`        | [Components Object](#components-object)                    |  | An element to hold reusable schemas for the workflow, for example, inputs and parameters.                                                                                                                            |
| `x-*`               | [Extensions](#specification-extensions)                                  |  | Any number of extension fields can be added to the workflows document that can be used by tooling and vendors. When provided at this level, the extensions generally apply to the entire document.                                                                                                                                                          |

## Workflows Specification Versions

The `workflowsSpec` field contains the version number of the Workflows Specification that the document conforms to. Tooling should use this value to interpret the document correctly.

The current version of the Workflows Specification is 1.0.0-prerelease, but keep in mind that the specification is still under development.

## Info Object

Provides metadata about the workflows description.

| Field Name | Type   | Required | Description                                                                          |
|------------|--------|----------|--------------------------------------------------------------------------------------|
| `title`    | String | ✅        | A human-readable title for the set of workflows.                                     |
| `summary`  | String |  | A short summary of the workflows description.                                         |
| `description` | String |  | A longer description of the workflows description. [CommonMark syntax](https://spec.commonmark.org/) may be used for rich text representation. |
| `version`  | String | ✅        | A version string indicating the version of the workflows description document. |
| `x-*`      | [Extensions](#specification-extensions)    |  | Any number of extension fields can be added that can be used by tooling and vendors. |

Below is an example of an `info` object in a workflows description document:

```yaml workflows.yaml
info:
  title: Speakeasy Bar Workflows
  summary: Workflows for managing the Speakeasy Bar API
  description: >
    This document defines workflows for managing the [Speakeasy Bar API](https://bar.example.com), including
    creating new drinks, managing inventory, and processing orders.
  version: 4.6.3
```

## Source Description Object

A source description points to an OpenAPI document containing the operations referenced by the workflows in this document. It may also reference other workflows descriptions.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                  |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`     | String | ✅        | A name for the source document, used to reference it from other parts of the workflows description. The name must be unique within the `sourceDescriptions` array and may only contain alphanumeric characters, underscores, and dashes.                                                                                                            |
| `url`      | String | ✅        | The URL of the source document. This identifier must conform to [RFC 3986 section 4.1](https://datatracker.ietf.org/doc/html/rfc3986#section-4.1) for absolute URLs or [section 4.2](https://datatracker.ietf.org/doc/html/rfc3986#section-4.2) for relative URIs.                                                                                                                                                                                 |
| `type`     | String |          | The type of the source document. Supported values are `openapi`, indicating an OpenAPI document, or `workflowsSpec` indicating another workflows description. Additional values may be supported in future versions of the specification.                                       |
| `x-*`      | [Extensions](#specification-extensions)    |          | Any number of extension fields can be added to the source description object that can be used by tooling and vendors.                                                                                                                                                       |

Below is an example of two source description objects in a workflows description document:

```yaml workflows.yaml
sourceDescriptions:
  - name: speakeasyBar
    url: https://bar.example.com/openapi.yaml
    type: openapi
  - name: printsAndBeeps
    url: https://output.example.com/workflows.yaml
    type: workflowsSpec
```

## Workflow Object

A workflow object defines a sequence of operations.

| Field Name | Type   | Required | Description                                                                                                                                                                                                             |
|------------|--------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `workflowId` | String | ✅        | A unique identifier for the workflow. This is used to reference the workflow from other parts of the workflows description. May contain only alphanumeric characters, underscores, and dashes.                                                                                              |
| `summary`    | String |  | A short summary of what the workflow does.                                                                                                                                                                              |
| `description` | String |  | A longer description of the workflow. [CommonMark syntax](https://spec.commonmark.org/) may be used for rich text representation.                                                                                       |
| `inputs`      | [JSON Schema](https://json-schema.org/) |  | A schema defining the input parameters for the workflow.                                                                                                                                                                |
| `dependsOn` | [String] |  | An array of workflow IDs that this workflow depends on. The workflows in the array must be executed before this workflow.                                                                                               |
| `steps`       | [[Step Object](#step-object)] | ✅        | An ordered array of [step objects](#step-object) defining the steps of the workflow. The array must contain at least one step.                                                                                                   |
| `successActions` | [[Success Action Object](#success-action-object)] |  | An array of [success action objects](#success-action-object) specifying actions to take for each step of this workflow that completes successfully. Individual steps may override the workflow object's success actions.                                                                                                                        |
| `failureActions` | [[Failure Action Object](#failure-action-object)] |  | An array of [failure action objects](#failure-action-object) specifying actions to take for each step of this workflow that fails. Individual steps may override the workflow object's failure actions.                                                                                                                        |
| `outputs`     | Map[`string`, \{[Runtime Expression](#runtime-expressions)}] |  | A map of output values produced by the workflow. The keys are the names of the outputs, and the values are [runtime expressions](#runtime-expressions) that extract the output values from the results of the workflow steps. |
| `parameters` | [[Parameter Object](#parameter-object)\|[Reusable Parameter Object](#reusable-parameter-object)] |  | An array of parameters applicable to all steps in this workflow. Individual steps may override the workflow object's parameters.                                                                                         |
| `x-*`         | [Extensions](#specification-extensions)    |  | Any number of extension fields can be added to the workflow object that can be used by tooling and vendors.                                                                                                             |

Below is an example of a workflow object:

```yaml workflows.yaml
- workflowId: createDrink
  summary: Create a new drink in the bar's menu
  inputs:
    allOf:
      - $ref: '#/components/inputs/authenticate'
      - type: object
        properties:
          drink_name:
            type: string
          drink_type:
            type: string
          drink_price_usd_cent:
            type: integer
          ingredients:
            type: array
            items:
              type: string
  steps:
    - stepId: authenticate
      operationId: authenticate
      parameters:
        - name: $components.parameters.username
        - name: $components.parameters.password
    - stepId: createDrink
      operationId: createDrink
      parameters:
        - name: $components.parameters.authorization
        - name: name
          in: query
          value: $inputs.drink_name
        - name: type
          in: query
          value: $inputs.drink_type
        - name: price
          in: query
          value: $inputs.drink_price_usd_cent
        - name: ingredients
          in: query
          value: $inputs.ingredients
```

## Step Object

A step object defines a single operation to perform as part of a workflow.

| Field Name | Type   | Required | Description                                                                                                                                                                                                             |
|------------|--------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stepId`   | String | ✅        | A unique identifier for the step within the workflow. Used to reference the step's outputs from other parts of the workflow. May contain only alphanumeric characters, underscores, and dashes.                          |
| `description` | String |        | A description of what the step does. [CommonMark syntax](https://spec.commonmark.org/) may be used for rich text representation.                                                                                        |
| `operationId` | String |        | The `operationId` of the operation to execute for this step. Must match an `operationId` in one of the `sourceDescriptions`. This field is mutually exclusive with `operationPath` and `workflowId`.                               |
| `operationPath` | String |      | A JSON Pointer to the operation to execute for this step, relative to one of the `sourceDescriptions`. This field is mutually exclusive with `operationId` and `workflowId`.                                            |
| `workflowId` | String |          | The ID of a workflow in this document to execute as a sub-workflow. This field is mutually exclusive with `operationId` and `operationPath`.                                                                            |
| `parameters` | [[Parameter Object](#parameter-object)\|[Reusable Parameter Object](#reusable-parameter-object)] |  | An array of parameters to pass to the operation for this step. Overrides any parameters defined at the workflow level.                 |
| `requestBody` | [Request Body Object](#request-body-object) |  | The request body to send for the operation.                                                                                                                                                                             |
| `successCriteria` | [[Criterion Object](#criterion-object)] |  | An array of criteria for determining if the step succeeded. All criteria must be met for the step to be considered successful. Individual criteria are defined using [criterion objects](#criterion-object).             |
| `onSuccess` | [[Success Action Object](#success-action-object)\|[Reusable Object](#reusable-object)] |  | An array of actions to take if the step succeeds. Overrides any success actions defined at the workflow level. Individual actions are defined using [success action objects](#success-action-object).                   |
| `onFailure` | [[Failure Action Object](#failure-action-object)\|[Reusable Object](#reusable-object)] |  | An array of actions to take if the step fails. Overrides any failure actions defined at the workflow level. Individual actions are defined using [failure action objects](#failure-action-object).                       |
| `outputs` | Map[`string`, \{[Runtime Expression](#runtime-expressions)}] |  | A map of output values produced by the step. The keys are the names of the outputs, and the values are [runtime expressions](#runtime-expressions) that extract the output values from the result of the operation.       |
| `x-*`      | [Extensions](#specification-extensions) |  | Any number of extension fields can be added to the step object that can be used by tooling and vendors.                                                                                                               |

Below is an example of step objects in a workflows description document:

```yaml workflows.yaml
steps:
  - stepId: authenticate
    operationId: authenticate
    parameters:
      - name: $components.parameters.username
      - name: $components.parameters.password
  - stepId: createDrink
    operationId: createDrink
    parameters:
      - name: $components.parameters.authorization
      - name: name
        in: query
        value: $inputs.drink_name
      - name: type
        in: query
        value: $inputs.drink_type
      - name: price
        in: query
        value: $inputs.drink_price_usd_cent
      - name: ingredients
        in: query
        value: $inputs.ingredients
```

## Parameter Object

A parameter object defines a single parameter to pass to an operation in a workflow step.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`     | String | ✅        | The name of the parameter.                                                                                                                                                                                                                                                                                                   |
| `in`       | String | ✅        | The location of the parameter. Possible values are `path`, `query`, `header`, `cookie`. Required for parameters passed to an operation. Must be omitted for parameters passed to a workflow, where the parameter is always passed in the workflow's `inputs` object. See [Parameter Location](#parameter-location).                                                                                                                                                                           |
| `value`    | Any\|\{[Runtime Expression](#runtime-expressions)}    |          | The value of the parameter. Can be a literal value, or a [runtime expression](#runtime-expressions) that will be evaluated and passed to the operation or workflow.
| `x-*`      | [Extensions](#specification-extensions)     |  | Any number of extension fields can be added to the parameter object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                                                                                                                               |

### Parameter Location

For parameters passed to an operation, the `in` field specifies the location of the parameter. The possible values are:

- `path` - The parameter is part of the operation's URL path.
- `query` - The parameter is appended to the operation's URL as a query parameter.
- `header` - The parameter is sent in the request headers.
- `cookie` - The parameter is sent in a cookie.

For parameters passed to a workflow, the `in` field must be omitted. Workflow parameters are always passed in the workflow's `inputs` object.

### Parameter Object Examples

```yaml workflows.yaml
parameters:
  - name: $components.parameters.authorization
  - name: name
    in: query
    value: $inputs.drink_name
  - name: type
    in: query
    value: $inputs.drink_type
  - name: price
    in: query
    value: $inputs.drink_price_usd_cent
  - name: ingredients
    in: query
    value: $inputs.ingredients
```

## Success Action Object

A success action object defines an action to take when a workflow step succeeds.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`      | String | ✅       | The name of the action. Names are case-sensitive and must be unique within the `successActions` array of a step or workflow. |
| `type`      | String | ✅       | The type of action to take. Possible values are:<br/>`end` - End the workflow.<br/>`goto` - Move to another step in the workflow. Requires either `stepId` or `workflowId` to be specified.                                                                                                                                                                                                                                                                                                                                                                         |
| `stepId`    | String |          | The `stepId` of the step to execute next if `type` is `goto`. Mutually exclusive with `workflowId`.                                                                                                                                                                                                                                                                                      |
| `workflowId` | String |          | The `workflowId` of the workflow to execute if `type` is `goto`. Mutually exclusive with `stepId`.                                                                                                                                                                                                                                                                                      |
| `criteria`  | [[Criterion Object](#criterion-object)] |  | An array of criteria that determine whether the action should be executed. All criteria must be met for the action to execute. If not provided, the action will always execute.                                                                                                                                                                                                          |
| `x-*`       | [Extensions](#specification-extensions)     |          | Any number of extension fields can be added to the success action object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                         |

Below is an example of a success action object:

```yaml workflows.yaml
onSuccess:
  - name: printReceipt
    type: goto
    workflowId: $sourceDescriptions.printsAndBeeps.printReceipt
    criteria:
      - type: simple
        condition: $checkStatus.status == 'completed'
```

## Failure Action Object

A failure action object defines an action to take when a workflow step fails.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`      | String | ✅       | The name of the action. Names are case-sensitive and must be unique within the `failureActions` array of a step or workflow. |
| `type`      | String | ✅       | The type of action to take. Possible values are:<br/>`end` - End the workflow, returning the specified `outputs` if provided.<br/>`goto` - Move to another step in the workflow. Requires either `stepId` or `workflowId` to be specified.<br/>`retry` - Retry the failed step. Requires `retryAfter` and optionally `retryLimit` to be specified.  |
| `stepId`    | String |          | The `stepId` of the step to execute next if `type` is `goto`. Mutually exclusive with `workflowId`.                                                                                                                                                                                                                                                                                      |
| `workflowId` | String |          | The `workflowId` of the workflow to execute if `type` is `goto`. Mutually exclusive with `stepId`.                                                                                                                                                                                                                                                                                      |
| `retryAfter` | Number |          | The number of seconds to wait before retrying the failed step if `type` is `retry`. Must be a non-negative integer. The specification is ambiguous about whether this field also applies when `type` is `goto`.                                                                                                                                                                                                                                                                     |
| `retryLimit` | Integer |         | The maximum number of times to retry the failed step if `type` is `retry`. Must be a non-negative integer. If not provided, the step will be retried indefinitely until it succeeds or the workflow is canceled.                                                                                                                                                                      |
| `criteria`  | [[Criterion Object](#criterion-object)] |  | An array of criteria that determine whether the action should be executed. All criteria must be met for the action to execute.                                                                                                                                                                                                          |
| `x-*`       | [Extensions](#specification-extensions)     |          | Any number of extension fields can be added to the failure action object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                         |

Below is an example of a failure action object:

```yaml workflows.yaml
onFailure:
  - name: beepLoudly
    type: goto
    workflowId: $sourceDescriptions.printsAndBeeps.beepLoudly
    criteria:
      - type: simple
        condition: $checkStatus.status == 'failed'
```

## Components Object

The `components` object holds reusable objects that can be referenced from other parts of the workflows description.

| Field Name | Type | Description |
|------------|------|-------------|
| `inputs` | Map[`string`, `JSON Schema`] | An object containing reusable [JSON Schemas](https://json-schema.org/) that can be referenced from workflow `inputs`. |
| `parameters` | Map[`string`, [Parameter Object](#parameter-object)] | An object containing reusable [parameter objects](#parameter-object). |
| `successActions` | Map[`string`, [Success Action Object](#success-action-object)] | An object containing reusable [success action objects](#success-action-object). |
| `failureActions` | Map[`string`, [Failure Action Object](#failure-action-object)] | An object containing reusable [failure action objects](#failure-action-object). |
| `x-*` | [Extensions](#specification-extensions) | Any number of extension fields can be added to the components object that can be used by tooling and vendors. |

The keys in the `components` object may only contain alphanumeric characters, underscores, and dashes.

### Components Object Example

```yaml workflows.yaml
components:
  inputs:
    authenticate:
      type: object
      properties:
        username:
          type: string
        password:
          type: string
  parameters:
    authorization:
      name: Authorization
      in: header
      value: $authenticate.outputs.token
    username:
      name: username
      in: body
      value: $inputs.username
    password:
      name: password
      in: body
      value: $inputs.password
```

The components defined in a workflows description are scoped to that document. Components defined in one workflows description cannot be referenced from another workflows description.

## Reusable Parameter Object

A reusable parameter object allows you to reference a parameter defined in the `components/parameters` object from multiple steps in a workflow.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`     | \{[Runtime Expression](#runtime-expressions)} | ✅        | A [runtime expression](#runtime-expressions) used to reference the desired parameter from the `components/parameters` object. |
| `value`    | Any     |          | A default value for the parameter that overrides the value of the referenced parameter.                                                                                                                                                                                                                                                                                                   |

Reusable parameter objects cannot be extended with additional fields. Any additional fields will be ignored.

### Reusable Parameter Object Example

```yaml workflows.yaml
- name: $components.parameters.username
  value: admin
```

## Reusable Object

A reusable object allows you to reference objects like success actions and failure actions defined in the `components` object from locations within steps or workflows.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`     | \{[Runtime Expression](#runtime-expressions)} | ✅        | A [runtime expression](#runtime-expressions) used to reference the desired object from the `components` object. |

**Note:** To reference parameters, use the [reusable parameter object](#reusable-parameter-object). To reference inputs, use standard JSON Schema referencing with the `$ref` keyword.

### Reusable Object Example

```yaml workflows.yaml
- name: $components.parameters.password
```

## Criterion Object

A criterion object is used to specify assertions in the `successCriteria` field of a [step object](#step-object), or the `criteria` field of a [success action object](#success-action-object) or [failure action object](#failure-action-object).

Criterion objects support three types of assertions:
- `simple` - Basic comparisons using literals, operators, and [runtime expressions](#runtime-expressions). This is the default if no `type` is specified.
- `regex` - Applies a regular expression pattern to a context defined by a [runtime expression](#runtime-expressions).
- `JSONPath` - Applies a [JSONPath](https://goessner.net/articles/JsonPath/) expression to a context defined by a [runtime expression](#runtime-expressions). The root node of the JSONPath is the context.

### Literals

Literals are constant values that can be used in `simple` conditions. The following data types are supported:

| Type | Literal Value |
|------|---------------|
| `boolean` | `true` or `false` |
| `null` | `null` |
| `number` | A number of type `int32`, `int64`, `float`, or `double`. |
| `string` | Strings must be enclosed in single quotes ('). To include a literal single quote, escape it with another single quote (''). |

### Operators

Simple conditions support the following operators:

| Operator | Description |
|----------|-------------|
| `<` | Less than |
| `<=` | Less than or equal |
| `>` | Greater than |
| `>=` | Greater than or equal |
| `==` | Equal |
| `!=` | Not equal |
| `!` | Not |
| `&&` | And |
| `\|\|` | Or |
| `()` | Grouping |
| `[]` | Array index (0-based) |
| `.` | Property dereference |

String comparisons are case-insensitive.

A criterion object consists of the following fields:

| Field Name  | Type | Required | Description |
|-------------|------|----------|-------------|
| `context` | \{[Runtime Expression](#runtime-expressions)} | | A [runtime expression](#runtime-expressions) that defines the context for `regex` and `JSONPath` conditions. Must be provided if `type` is specified. |
| `condition` | `string` | ✅ | The assertion to evaluate. For `simple` conditions, combines literals, operators, and runtime expressions. For `regex` and `JSONPath` conditions, provides the expression to evaluate against the `context`. |
| `type` | `string` | | The type of assertion. Allowed values are `simple`, `regex`, or `JSONPath`. Defaults to `simple` if not provided. |
| `x-*` | [Extensions](#specification-extensions) | | Any number of extension fields can be added to the criterion object that can be used by tooling and vendors. |

### Criterion Object Examples

**Simple Condition - Check if a drink was successfully created**

```yaml workflows.yaml
- condition: $statusCode == 201
```

**Simple Condition - Check if the bar is open**

```yaml
- condition: $response.body.isOpen == true
```

**Regex Condition - Check if the drink name matches a pattern**

```yaml workflows.yaml
- context: $response.body.drinkName
  condition: '^Sazerac'
  type: regex
```

**JSONPath Condition - Check if the ingredient list contains "whiskey"**

```yaml workflows.yaml
- context: $response.body
  condition: $..ingredients[?(@.name == 'whiskey')]
  type: JSONPath
```

**Simple Condition - Check if the customer is over 21**

```yaml workflows.yaml
- condition: $response.body.customer.age >= 21
```

**JSONPath Condition - Check if there are any available tables**

```yaml workflows.yaml
- context: $response.body
  condition: $[?length(@.tables[?(@.available == true)]) > 0]
  type: JSONPath
```

## Request Body Object

The request body object describes the payload and `Content-Type` to send with the request when executing an operation in a workflow step.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `contentType` | String | | The `Content-Type` header for the request payload. If omitted, defaults to the `Content-Type` of the referenced operation. |
| `payload` | Any | | The literal payload value to send in the request body. Can contain [runtime expressions](#runtime-expressions) which will be evaluated before sending the request. This field is mutually exclusive with `pointers`. |
| `pointers` | [[Payload Pointer Object](#payload-pointer-object)] | | An array of [payload pointer objects](#payload-pointer-object) specifying values to insert into specific locations in the payload. This field is mutually exclusive with `payload`. |
| `x-*` | [Extensions](#specification-extensions) | | Any number of extension fields can be added to the request body object that can be used by tooling and vendors. |

### Request Body Object Examples

**JSON Payload (Template)**

```yaml workflows.yaml
contentType: application/json
payload: |
  {
    "order": {
      "drinkId": "{$inputs.drink_id}",
      "customerId": "{$inputs.customer_id}",
      "quantity": {$inputs.quantity}
    }
  }
```

**JSON Payload (Object)**

```yaml workflows.yaml
contentType: application/json
payload:
  order:
    drinkId: $inputs.drink_id
    customerId: $inputs.customer_id
    quantity: $inputs.quantity
```

**JSON Payload (Runtime Expression)**

```yaml workflows.yaml
contentType: application/json
payload: $inputs.orderPayload
```

**XML Payload (Template)**

```yaml workflows.yaml
contentType: application/xml
payload: |
  <order>
    <drinkId>{$inputs.drink_id}</drinkId>
    <customerId>{$inputs.customer_id}</customerId>
    <quantity>{$inputs.quantity}</quantity>
  </order>
```

**Form Data Payload (Object)**

```yaml workflows.yaml
contentType: application/x-www-form-urlencoded
payload:
  drinkId: $inputs.drink_id
  customerId: $inputs.customer_id
  quantity: $inputs.quantity
```

**Form Data Payload (String)**

```yaml workflows.yaml
contentType: application/x-www-form-urlencoded
payload: "drinkId={$inputs.drink_id}&customerId={$inputs.customer_id}&quantity={$inputs.quantity}"
```

## Payload Pointer Object

A payload pointer object specifies a location within the request payload and the value to insert at that location.

| Field Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                              |
|------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `target`   | String | ✅        | A [JSON Pointer](https://tools.ietf.org/html/rfc6901) or [XPath](https://www.w3.org/TR/xpath-31/#id-expressions) expression that identifies the location in the payload to insert the `value`. For JSON payloads, use JSON Pointer. For XML payloads, use XPath.  |
| `value`    | Any    | ✅        | The value to insert at the specified `target` location. Can be a literal or a [runtime expression](#runtime-expressions) that will be evaluated before sending the request.                                                                                                                                                                                                                                                                                                  |
| `x-*`      | [Extensions](#specification-extensions)    |          | Any number of extension fields can be added to the payload pointer object that can be used by tooling and vendors.                                                                                                                                                                                                                                                                         |

### Payload Pointer Object Examples

**Runtime Expression Value**

```yaml
target: /drinkId
value: $inputs.drink_id
```

**Literal Value**

```yaml
target: /quantity
value: 2
```

## Runtime Expressions

Runtime expressions allow you to reference values that will be available when a workflow is executed, such as values from the HTTP request or response, the event that triggered the workflow, or outputs from previous workflow steps.

The syntax for runtime expressions is `{expression}`, where `expression` is one of the following:

| Expression | Description |
|------------|-------------|
| `$url` | The full URL of the request |
| `$method` | The HTTP method of the request |
| `$statusCode` | The HTTP status code of the response |
| `$request.header.{name}` | The value of the specified request header |
| `$request.query.{name}` | The value of the specified query parameter from the request URL |
| `$request.path.{name}` | The value of the specified path parameter from the request URL |
| `$request.body` | The entire request body |
| `$request.body#/path/to/property` | The value of the specified JSON pointer path from the request body |
| `$response.header.{name}` | The value of the specified response header |
| `$response.body` | The entire response body |
| `$response.body#/path/to/property` | The value of the specified JSON pointer path from the response body |
| `$inputs.{name}` | The value of the specified workflow input |
| `$outputs.{name}` | The value of the specified workflow output |
| `$steps.{stepId}.{outputName}` | The value of the specified output from the step with ID `{stepId}` |
| `$workflows.{id}.{inputName}` | The value of the specified input from the workflow with ID `{id}` |
| `$workflows.{id}.{outputName}` | The value of the specified output from the workflow with ID `{id}` |

### Runtime Expression Examples

| Expression | Example Value |
|------------|---------------|
| `$request.header.Authorization` | `Bearer abc123`|
| `$request.query.drinkId` | `12345` |
| `$response.body#/drinks/0/name` | `"Negroni"` |
| `$inputs.orderType` | `"pickup"` |
| `$steps.submitOrder.outputs.orderId` | `"a8b9c6d4e5f001"` |

## Specification Extensions

The workflows specification allows custom properties to be added at certain points using specification extensions.

Extension properties are always prefixed by `"x-"` and can have any valid JSON value.

For example:

```yaml
x-internal-id: abc123
x-vendor-parameter:
  vendorId: 123
  channelId: abc
```

The extensions defined by the workflows specification are:

| Context | Description |
|---------|-------------|
| [Workflows Description](#workflows-description-structure) | Applies to the entire workflows description document |
| [Info Object](#info-object)  | Applies to the `info` object |
| [Source Description Object](#source-description-object)  | Applies to all the source description objects |
| [Workflow Object](#workflow-object) | Applies to all workflow objects |
| [Step Object](#step-object) | Applies to all step objects |
| [Parameter Object](#parameter-object) | Applies to all parameter objects |
| [Success Action Object](#success-action-object) | Applies to all success action objects |
| [Failure Action Object](#failure-action-object) | Applies to all failure action objects |
| [Criterion Object](#criterion-object) | Applies to all criterion objects |
| [Request Body Object](#request-body-object) | Applies to all request body objects |
| [Payload Pointer Object](#payload-pointer-object) | Applies to all payload pointer objects |
| [Reusable Object](#reusable-object) | Applies to all reusable objects |
| [Components Object](#components-object) | Applies to the components object |

The specification extension key formats `^x-oai-` and `^x-oas-` are reserved for extensions defined by the [OpenAPI Initiative](https://www.openapis.org/).

Extension properties can be used to add additional features, metadata, or configuration options to the workflows description that are not directly supported by the current version of the specification. However, additional tooling may be required to process custom extensions.
