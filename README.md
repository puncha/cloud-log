CloudLog
========

A logging system in the cloud

You can access the system here: http://cloudlog.aws.af.cm/

It was designed for Cloud Seed Program, but I think it is useful to other projects.
It is simple and only exposes two REST APIs:

1. To post a log: POST /log?title={title}&body={body}
2. To clear all the logs: GET /clear


TODO:
1. Add category support.
2. Better UI. (e.g. tab pages)
