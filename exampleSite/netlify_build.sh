#!/bin/sh

mkdir -p themes || exit 1
ln -s ../.. themes/oldnew-mashup || exit 1
yarn install || exit 1
gulp build && hugo || exit 1
