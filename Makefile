setup:
	pipenv install

open-viewer: setup ## Open the notebook in an interactive viewer
	pipenv run jupyter notebook MissingPersons_DataExtract_Tom_May10.ipynb --config jupyter_notebook_config.py

run-code: setup ## Run the notebook's code in terminal (without viewer)
	pipenv run jupyter nbconvert --to notebook --execute MissingPersons_DataExtract_Tom_May10.ipynb

%:
	@true

.PHONY: help

help:
	@echo 'Usage: make <command>'
	@echo
	@echo 'where <command> is one of the following:'
	@echo
	@grep -E '^[a-z0-9A-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
