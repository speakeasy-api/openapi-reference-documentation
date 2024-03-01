# DEVELOPMENT NOTES (REMOVE BEFORE PUBLISHING)

- I believe this should be an open source repo that we can use to showcase the docs and example SDKs generated from our example openapi document. This will allow things to be co-located (we can locate them separately but I think we will lose some coherency with that approach), benefit from community updates and improvements.
- I am building a `speakeasy` example openapi document as an example document similar to the petstore from swagger. The speakeasy it refers to is a bar, so everything is themed around that. I think this will be a good way to showcase the documentation and SDKs.
- I imagine the `SDK Generation` sections to actually be some sort of expandable section that can be toggled open and closed. This would allow the user to see the docs related to SDK Generation without it taking up too much space on the page. I also imagine we will potentially show examples in all the supported languages, via tabs or something similar.

## TODOs

- TODO: Go through and update all examples of yaml and generated code once full documentation and example spec is complete.
- TODO: Ensure we refer to API, Endpoint, etc consistently throughout the documentation.
- TODO: Determine the best way to link back to the generator? Should we talk directly about it in this documentation, or leave it to links and/or expandable sections that go into more detail?
- ~~TODO~~DONE: make the difference between OpenAPI references and JSON Schema references clear. I think this is a common point of confusion for people.
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