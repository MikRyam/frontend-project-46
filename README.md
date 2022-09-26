### Hexlet tests and linter status:
[![Actions Status](https://github.com/MikRyam/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/MikRyam/frontend-project-46/actions)
![example workflow](https://github.com/MikRyam/frontend-project-46/actions/workflows/project2-check.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/224d9c374a705ba5cc35/maintainability)](https://codeclimate.com/github/MikRyam/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/224d9c374a705ba5cc35/test_coverage)](https://codeclimate.com/github/MikRyam/frontend-project-46/test_coverage)

## Description:
**Generator of difference** is the CLI program that generate difference between two files. Supporting formats: JSON, YML, YAML.

## Install

```make install```

## Setup genDiff

```
chmod +x bin/gendiff.js

make publish

sudo npm link
```

## Run tests

```make test```


## Run lint

```make lint```


## genDiff Help

```
gendiff -h
```


### Demo: installing a package, getting help info, launching genDiff
[![asciicast](https://asciinema.org/a/nhG0khw7VAMpue3BxDDLsG2I5.svg)](https://asciinema.org/a/nhG0khw7VAMpue3BxDDLsG2I5)



## launching genDiff 


```
gendiff file1.json file2.json
```

### Demo: run genDiff with different file .formats
[![asciicast](https://asciinema.org/a/lq8eMzOipYGm4bJuGeyovnT3c.svg)](https://asciinema.org/a/lq8eMzOipYGm4bJuGeyovnT3c)


```
gendiff __fixtures__/file1.json __fixtures__/file2.json

gendiff __fixtures__/file1.yml __fixtures__/file2.yml

```


### Demo: run genDiff with nested structures files
[![asciicast](https://asciinema.org/a/UjmW2NM2VAfMxc3UhaBwImcGm.svg)](https://asciinema.org/a/UjmW2NM2VAfMxc3UhaBwImcGm)



### Demo: run genDiff with nested structures files in plain format
[![asciicast](https://asciinema.org/a/QBiS06GQoiiBTKVwzlkqshncG.svg)](https://asciinema.org/a/QBiS06GQoiiBTKVwzlkqshncG)



### Demo: run genDiff with nested structures files in json format
[![asciicast](https://asciinema.org/a/9fYK9rn63SXYO6zga9n3x7Yth.svg)](https://asciinema.org/a/9fYK9rn63SXYO6zga9n3x7Yth)

