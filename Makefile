
gendiff:
	node bin/gendiff.js --help

install:
	npm ci

publish:
	npm publish --dry-run

setup: install publish

link:
	sudo npm link

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
