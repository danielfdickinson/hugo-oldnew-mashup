#!/bin/sh

mkdir -p exampleSite/themes || exit 1
ln -s ../.. exampleSite/themes/oldnew-mashup || exit 1
gulp build && hugo || exit 1
