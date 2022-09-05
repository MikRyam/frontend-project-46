
gendiff:
	node bin/gendiff.js --help

install:
	npm ci

publish:
	npm publish --dry-run

#setup: install publish

link:
	sudo npm link

setup:
	chmod +x bin/gendiff.js
	make publish
	sudo npm link