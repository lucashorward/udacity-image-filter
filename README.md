# Udacity Assignment as I've done it

## Deviations:
The `filterImageFromURL` function always threw an error, even with the provided example URLs. Therefore I've rewritten it.

## Rubric requirement on HTTP error codes:

- HTTP status 400 is returned when a request is sent without an image url.
- HTTP status 500 is returned when looking up or processing the image fails.