# Missing Persons

The goal of this project is to better support the resolution of missing persons cases in Canada.

## App URL

...

## Background

The project steward with journalistic experience from CBC's The Fifth Estate has brought forward the following background:

- there is a single [national RCMP database][database] for tracking both:
  1. missing persons and
  2. unidentified remains
- very scarce police resources go toward resolving these cases once they're in the system (priority for more urgent cases)
- the database does not make it easy to compare even the very data within its own system (missing persons and remains)
- the data that backs the database isn't available as open data

## The Project

1. Scrape the database regulary and save it in a more accessible format to make it more accessible for various efforts
2. Build a better front-end to support matching missing persons cases to remains, making it easier for people to identify matches and close cases

## Usage

These instructions assume using `pipenv`, but it can be done without

Requirements:
- Python 3.3+ (can be installed via `pyenv` recommendation)
- `pipenv`: A package manager for locking specific versions of dependencies
    - e.g., `brew install pipenv`
- `make`
- Chrome browser

Recommendations:
- `pyenv`: for managing/installing multiple python versions.
    - e.g., `brew install pyenv`
    - then `pyenv install --skip-existing` within this project, to install a known-good version of Python.

```
make setup
make install
```

Note: If you don't wish to use `pipenv`, just open up `Makefile` and run its commands directly.

### Web Scraping the RCMP Database with Python & Selenium

The required packages can be found in requirments.txt, bs4 and selenium are the main non-standard packages needed. 

An easy way to get started is with Anaconda. Anaconda is an open source environment and package manager for Python. Anaconda provides a GUI and CLI for creating and managing project environments easily.

A useful intro: https://medium.com/analytics-vidhya/anaconda-101-199c84ca897a

To create an environment with all the required packages you can run the following in the conda CLI.

`
  conda create --name <env_name> --file requirements.txt
`
You can run the script.py file in this virtual environment.

**Anaconda:** https://www.anaconda.com/products/distribution

## Get Involved

The following is current as of Tue, Feb 14, 2023.

- :memo: [read][notes] our **meeting notes**
  - comments are welcome!
- :speech_balloon: [join][join-slack] the Slack team hosted by [Civic Tech Toronto][ctto]
  - after that, join our **chat room**: [`#proj-missing-persons`][slack-channel]

<!-- Links -->
   [notes]: https://docs.google.com/document/d/1LISM97j4hKqJLBvnJsbshBI9uhcPqDN9P1tSlrk-KD8/edit#
   [ctto]: http://civictech.ca
   [join-slack]: http://link.civictech.ca/chat
   [slack-channel]: https://app.slack.com/client/T04TJ34BU/C03DJRS2ZRV
   [database]: https://www.services.rcmp-grc.gc.ca/missing-disparus/search-recherche.jsf?lang=en
