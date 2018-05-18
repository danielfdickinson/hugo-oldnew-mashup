htmlstylesheet := /usr/share/xml/docbook/custom/slides/3.4.0/xsl/html/default.xsl

sources := mpl-makes-arduino-pi-6-week.xml

html:
	$(MAKE) html.done

xmllint:
	xmllint --noout --valid $(sources)

html.done: $(sources)
	xsltproc -o html.out/ $(htmlstylesheet) $(sources)
