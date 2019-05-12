#!/bin/sh

release_ctl eval --mfa "Freelytics.ReleaseTasks.migrate/1" --argv -- "$@"
