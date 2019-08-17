---
title: "Accessibility Statement"
date: 2019-08-14T06:19:45-04:00
copyright: 2019 Daniel F. Dickinson
license: CC-BY-4.0
draft: false
---

# Accessibility Statement

## When located at primary location

The following statements apply to this site when hosted at [https://hugo-oldnew-mashup.thecshore.com](https://hugo-oldnew-mashup.thecshore.com)

## Font Size

Where possible the font size is responsibive; on devices with higher resolutions the font size is automatically increased to compensate
for what is often a higher DPI.

## Avoiding Flicker

This site has dropped a 'smooth font scaling' Javascript from use because it's tendency to causes
screen redraw, which results in flicker

## Validation

All pages are run through the `Tidy` HTML 'linter' which provides fairly good validation of the the
page HTML (after conversion from Markdown) during Travis CI 'builds' (or manually).  In addition, the
live pages have been validated against the W3C's (Web standards organization) page validator.  Having
valid HTML and CSS helps screenreaders and magnifiers properly parse the pages.

Further Tidy's validations checks for WCAG guidelines have been performed and acted upon.

## If You Find A Barrier to Accessibility

Please do not hesitate to <a href="{{ "/siteentry/contactform" | relURL }}">contact the site operator</a> in the event you find some barrier to accessibility on this site.  The site operator strives to keep the site accessible.
