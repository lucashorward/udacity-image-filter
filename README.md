# Udacity Assignment as I've done it
Initial code from: https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code

Elastic beanstalk link:
http://udagram-lucashorward-dev.us-west-2.elasticbeanstalk.com/

## Deviations:

- The `filterImageFromURL` function always threw an error, even with the provided example URLs. Therefore I've rewritten it.
- The rewrite required Axios, and therefore a version bump in Typescript. Which was heavily outdated anyways.
- I attempted to use eu-central-1 (as in the video the instructor mentioned using a node nearby), however this gave me permission errors when running `eb init`. Finally I used the default region, and it magically worked. Would be nice to have mentioned that in the course.

## Rubric requirement on HTTP error codes:

- HTTP status 400 is returned when a request is sent without an image url.
- HTTP status 500 is returned when looking up or processing the image fails.