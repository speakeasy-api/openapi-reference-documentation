# Request Body Object

The request body is used to describe the body of the request for operations that support a request body.

| Field         |           Type            | Required | Description                                                                                                                          |
| ------------- | :-----------------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------ |
| `description` |          String           |          | A description of the request body. This may contain [CommonMark syntax](https://spec.commonmark.org/) to provide a rich description. |
| `content`     |    [Content](/openapi/paths/operations/content)    |    ✅    | A map of [Media Type Objects](/openapi/paths/operations/content#media-type-object) that defines the possible media types that can be used for the request body.       |
| `required`    |          Boolean          |          | Whether the request body is required. Defaults to `false`.                                                                           |
| `x-*`         | [Extensions](/openapi/extensions) |          | Any number of extension fields can be added to the Request Body Object that can be used by tooling and vendors.                      |

## Encoding Object

Only applicable to `requestBody` where the media type is `multipart` or `application/x-www-form-urlencoded`. An encoding object describes the encoding of a single property in the request schema.

| Field           | Type                                                                                          | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentType`   | String                                                                                        |          | The content type of the field. If the field is an `object`, the default is `application/json`. If the field is an array, the default is based on the inner type. Otherwise, the default is `application/octet-stream`. Valid values are either a media type (for example, `application/json`), a wildcard media type (for example, `image/*`), or a comma-separated list of media types and wildcard media types (for example, `image/png, application/*`).                      |
| `headers`       | Map[string, [Header Object](/openapi/paths/operations/responses/headers) \| [Reference Object](/openapi/references#openapi-reference-object)] |          | Only applies to `multipart` requests. Allows additional headers related to the field. For example, if the client needs to add a `Content-Disposition` for an uploaded file. A `Content-Type` header in this map will be ignored, in favor of the `contentType` field of the encoding object.                                                                                                                                                                                     |
| `style`         | String                                                                                        |          | Can take one of the following values: `form`, `spaceDelimited`, `pipeDelimited`, or `deepObject`. Specifies the style of the field's serialization only in requests with media type `multipart/form-data` or `application/x-www-form-urlencoded`. See the description of `style` under [Query Parameters](/openapi/paths/parameters/query-parameters).                                                                                                                                                    |
| `explode`       | Boolean                                                                                       |          | Only applies to requests with media type `multipart/form-data` or `application/x-www-form-urlencoded` and fields with `array` or `object` types. If `style` is `form`, the default is `true`, otherwise the default is `false`.                                                                                                                                                                                                                                                  |
| `allowReserved` | Boolean                                                                                       |          | Only applies to requests with media type `application/x-www-form-urlencoded`. Determines whether reserved characters (those allowed in literals but with reserved meanings) are allowed in the parameter's content. The default is `false`. When `true`, it allows reserved characters as defined by [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-2.2) to be included without percent-encoding. This can be useful for parameters with content such as URLs. |

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