# Hugo OldNew Mashup

Version 0.3.1

[Hugo](https://gohugo.io) theme mixing old school design elements
with new-era CSS3, HTML5, etc. That is the look is a combination of
90's and postmodern.

/exampleSite contains some example content as per
[Add a theme to hugoThemes list](https://github.com/gohugoio/hugoThemes#adding-a-theme-to-the-list),
including this documentation page, and other relevant information for
the theme.  This theme has now been released since it's already useful for
simple sites, but has quite a bit more work to be done to be what I want
it to be.

## Required partial per-site

Due to limiations in the way the default baseof & blocks mechanism works,
it is necessary to copy <themedir>/exampleSite/layouts/partials/head.html
to your site and modify as appropriate.

## Required link or copy

Due to limitations in the readFile function and the lack of a
$.Site.Theme variable, it is necessary to either make a
symlink from \<your-site-root\>/oldnew-licenses pointing at
\<oldnew-mashup-theme-dir\>/licenses OR to copy
\<oldnew-mashup-them-dir\>/licences to \<your-site-root\>

## Even Lazier Blogger Menus and Navigation

This theme automatically creates the top nav bar based on the top level
sections and their sibling pages and sub-sections.  Furthermore on each
page it generates buttons for linear traveral (Previous|Next) as well
up a level.  And finally on each page on which you don't suppress
(unless one site-wide suppresses) the right sidebar, the right sidebar
will contain a navigation menu for the current section and one level
of subsections.

## A note on navigation and display order

This theme comes with the option to do a linear
traversal from the main page (the one you get by pressing
'Enter Site') to the last page in the sitemap, without missing
any pages.  To ensure this is ordered the way you wish, you may
set the 'weight' metadata in the frontmatter of pages that are not
naturally in the order you wish (basic ordering is by date).  Lower
weight sorts earlier.

Further if top-level sections (subdirectories of `content`) are not
in the correct order, or you want to use a different name for the
section than subdir name, you need to create an \_index.md in the
appropriate subdir (for example to rename `content/lorem1` as
`Lorem`, under `content/lorem1` add a content file `_index.md`
with front matter such as:

```
---
date: 2018-05-20T01:21:20-04:00
title: "Lorem"
copyright: 2018 Daniel F. Dickinson and Expired
license: Expired&CC0-1.0
weight: 100
---
```

Note that the above information also applies to the automatically
created floating navbar.  Submenus are for sub-sections (that is,
nested sections aka `topsection1/subsection1/_index.md`).  **NB**
with Hugo, subsections *must* have an \_index.md.


## A note on licenses

This theme has an archetype and layouts that make it easy to indicate
the copyright and licensing for your pages.  In the frontmatter add
the license (or licenses, separated by &) in a license field.

E.g. for yaml:

    ---
    date: (some date)
    title: An Essay
    copyright: 2018 Joe Smith and 1818 John Smith (expired)
    license: CC-BY-SA-4.0&Expired
    ---

Then in a directory named 'licenses' in your site's source root
create a file name 'Expired' which contains the license, e.g.:

    Copyright expires after a certain number of years in each jurisdiction.
    This work's copyright has expired in all known jurisdictions.

Likewise create a file CC-BY-SA-4.0 with the
content of [CC-BY-SA-4.0 Plaintext](https://raw.githubusercontent.com/cshoredaniel/hugo-oldnew-mashup/master/licenses/CC-BY-SA-4.0)

Then issue the command ```hugo new licenses/Expired.md``` and
```hugo new licenses/CC-BY-SA-4.0.md```.

(This presumes that the CC-BY-SA-4.0 license is being applied to the
overall page and look and Expired applies to the primary content).

You can mix and match licenses as you wish (in terms of the above scheme,
whether the licenses can actually work together is another story).

-------
This theme Copyright (C) 2018 Daniel F. Dickinson and released under the
Creative Commons BY (Attribution) 4.0 License.
See [CC-BY-4.0 Plaintext](https://github.com/cshoredaniel/hugo-oldnew-mashup/blob/master/licenses/CC-BY-4.0)
for terms.
