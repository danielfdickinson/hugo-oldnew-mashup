#!/bin/sh

TS=PASS

hugo --ignoreCache || TS=FAIL

if [ "$TS" = "FAIL" ]; then
	OTS=FAIL
	exit 3
fi

exit 0
