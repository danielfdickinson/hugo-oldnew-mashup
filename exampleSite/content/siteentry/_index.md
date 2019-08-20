---
title: Home
date: 2018-02-04T10:41:55-05:00
copyright: 2018 Daniel F. Dickinson
license: CC-BY-4.0
weight: -1000
layout: siteentry
---
# Hugo OldNew Mashup

Version 0.8.0

[![Travis CI results](https://travis-ci.org/cshoredaniel/hugo-oldnew-mashup.svg?branch=master)](https://travis-ci.org/cshoredaniel/hugo-oldnew-mashup?branch=master)

## Overview

[Hugo](https://gohugo.io) theme mixing old school design elements
with new-era CSS3, HTML5, etc. That is the look is a combination of
90's and postmodern.

Jump to [Reference Guide](/siteentry/#referenceguide)

## Example Site

``/exampleSite`` contains some example content as per
"[Add a theme to hugoThemes list](https://github.com/gohugoio/hugoThemes#adding-a-theme-to-the-list)",
including this documentation page and a sample of how to use this theme.
The theme is in early release form in that while it is usable for
simple sites, there is quite a bit of  work to do before it's truly
ready for full scale launch.

## Interesting Features

### Even Lazier Blogger Menus and Navigation

This theme automatically creates the top nav bar based on the top level
sections and their sibling pages and sub-sections.  On each page we
generate buttons for linear traversal (Previous|Next) and Up.
Finally the right sidebar will contain a navigation menu for the
current section and one level of subsections.

If you want pages to not appear in the navigation, menus, and
human-readable sitemap, you can add ``notinmenu: true`` to the
front-matter for the page.

### A note on navigation and display order

The linear traversal mentioned above uses Hugo's default Page ordering,
which means you can set the 'weight' metadata in the front-matter of
pages that are not naturally in the order you wish (basic ordering
is by date).  Lower weight sorts earlier.

For top-level sections (sub-directories of `content`) are not
in the correct order, or you want to use a different name for the
section than subdir name, you need to create a &#95;index.md in the
appropriate subdir (for example to rename `content/lorem1` as
`Lorem`, under `content/lorem1` add a content file `index.md`
with front matter such as:

```yaml
---
date: 2018-05-20T01:21:20-04:00
title: "Lorem"
copyright: © 2018 Daniel F. Dickinson and Expired
license: Expired&CC0-1.0
weight: 100
---
```

Note that the above information also applies to the automatically
created floating navbar.  Sub-menus are for sub-sections (that is,
nested sections aka `topsection1/subsection1/index.md`).
**NB** for Hugo, subsections *must* have an &#95;index.md.

### A note on licenses {#notelicenses}

This theme has an archetype and layouts that make it easy to indicate
the copyright and licensing for your pages.  In the front-matter add
the license (or licenses, separated by &amp;) in a license field.

E.g. for YAML:

```yaml
---
date: (some date)
title: An Essay
copyright: © 2018 Joe Smith and © 1818 John Smith (expired)
license: CC-BY-SA-4.0&Expired
---
```

Plaintext license files are store in the `assets/licenses` folder(s).
E.g. create 'assets/Expired' which contains the license:

```txt
Copyright expires after a certain number of years in each jurisdiction.
This work's copyright has expired in all known jurisdictions.
```

Likewise create a file assets/CC-BY-SA-4.0 with the
content of [CC-BY-SA-4.0 Plaintext](https://raw.githubusercontent.com/cshoredaniel/hugo-oldnew-mashup/master/assets/licenses/CC-BY-SA-4.0)

Then issue the command ``hugo new licenses/Expired.md`` and
``hugo new licenses/CC-BY-SA-4.0.md``.

(This presumes that the CC-BY-SA-4.0 license is being applied to the
overall page and look and Expired applies to the primary content).

You can mix and match licenses as you wish (in terms of the above scheme,
whether the licenses can actually work together is another story).

## Reference Guide {#referenceguide}

### Organization and Knobs

#### Footer

* contains 'footerlinks' and 'footercolophon' blocks
    * for each of these, you may omit the section with a no&lt;block&gt;
      Site or Page Param (e.g. ``nofooterlinks`` would omit the
      footerlinks block in footer
    * 'footerlinks'
        * just references 'footer/links' partial
        * contains 'contact', 'sitemap', 'privacy', 'accessibility',
          'feed-link', and 'validator' blocks
        * for each of these, you may omit the section with by setting
          a parameter of the same name with a 'no' prefix (e.g.
          ``nositemap = true``) in the site configuration file, or by
          setting 'no_block_: true' (e.g ``nositemap: true``) in the
          front-matter of the page (for per-page) settings.
        * for 'contact', 'sitemap', 'privacy', and 'accessibility'
          blocks
            * The default section expected for these pages is
              ``/siteentry``.
            * The default section can be overridden by setting a
              parameter named ``footersection`` in the site config file,
              or by setting ``footersection: desired-section`` in the
              front-matter of the page (for per-page definitions).
            * The default partial only displays the link if a
              content pages with the same name exists in the section
              as defined above.  E.g. the privacy page is only displayed
               if ``/contents/siteentry/privacy.md`` exists in the site,
               when using the default settings.  '.md' can be any page
               type supported by [Hugo](https://gohugo.io)).
        * 'feed-link' displays a links for the RSS feed for the current
          section (for sections) or is not displayed (for pages).  The
          link can be suppressed with a ``nofeedlink`` parameter set to
          true in either the site config file, or in the front-matter of
          the page (for per-page suppression).
        * 'validator' likewise can be suppressed with ``novalidator``.
          When present there will be a link to the the
          [W3C Unicorn Validator](https://valdator.w3.org/unicorn/) set
          to automatically validate the page on which it appears.
    * 'footercolophon'
        * just references 'footer/colophon' partial
            * contains 'docdate' and 'license' blocks
              * for each of these, you may omit the section with by
                setting a parameter of the same name with a 'no' prefix
                (e.g.``nodocdate = true``) in the site configuration
                file, or by setting 'no_block_: true' (e.g
                ``nodocdate: true``) in the front-matter of the page
                (for per-page) settings.
              * See [A note on Licenses](/siteentry/#notelicenses) above
                for information on setting the copyright and license
                information to appear in the colophon.


### Styling

#### Footer

* Style name is 'footer'
    * Smaller font size
    * Uses entire width of page
    * Is a flex item (``order: 999`` so that it normally appears last on
      the page, but can be overridden by having order greater than 999
      on elements under the 'default-body-wrapper' or 'homepage'
      top-level container (div)).
    * Contains 'footer-links' and 'colophon'
        * 'footer-links'
            * has a top border (2px grey) that acts a separator from the
            previous sections
            * is slightly padded on all sides
            * Text (contents) are centred within the 'footer-links' div.
            * Contains 'contact', 'sitemap', 'privacy', 'accessibility',
              'feed-link', and 'validator' spans.  By default these are
              styled via the combination of the footer-links followed by
              a span, but the above classes may be used to override the
              default styling on a per-section basis.
        * 'colophon'

##### Colophon

  * Style name is 'colophon'
  * has a top border (2px grey) that acts a separator from the
    previous sections
  * is slightly padded on all sides
  * Text (contents) is left-justified within the 'colophon'
     div.
  * Contains 'doc-date' and 'license-block' classed divs
      * 'doc-date' contains 'doc-date-hoversite' and 'doc-date-block'
          * 'doc-date-hoversite' controls whether 'doc-date-block' is
            visible, when using the default styling (when
            'doc-date-hoversite' is hovered over, or is clicked, then
            'doc-date-block' gets ``display: block`` style, otherwise
            it is ``display: none``)
      * 'license-block' contains 'page-license' and 'site-license'
          * Each of these is a div containing a span with class 'label',
            some text, and an unordered lists of licenses (generated
            from the parameters mentioned in
            [A note on Licenses](/siteentry/#notelicenses) above).
          * The unordered list has been styled to appear as a
            comma-separated list as one line (i.e. as inline
            rather than block level elements) with wrapping.  It
            consists of a 'license-list' with 'license-item's.


## Home Section Contents
