# Hugo OldNew Mashup (not yet released)

[Hugo](https://gohugo.io) theme mixing old school design elements
with new-era CSS3, HTML5, etc. That is the look is a combination of
90's and postmodern.

/exampleSite contains some example content as per
[Add a theme to hugoThemes list](https://github.com/gohugoio/hugoThemes#adding-a-theme-to-the-list),
including this documentation page, and other relevant information for
the theme.  This theme has not yet been released as it needs a fair bit of
work before it's ready to really deploy.

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
