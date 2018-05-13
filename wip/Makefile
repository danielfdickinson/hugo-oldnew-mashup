htmlstylesheet := /usr/share/xml/docbook/custom/slides/3.3.1/xsl/html/tables.xsl

sources := mpl-makes-arduino-pi-6-week.xml

html:
	$(MAKE) html.done

xmllint:
	xmllint --noout --valid $(sources)

html.done: $(sources)
	xsltproc -o html.out/ $(htmlstylesheet) $(sources)
