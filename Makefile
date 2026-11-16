.DEFAULT_GOAL := help

# Configuration variables
ENV ?= leonardo
BAUD ?= 9600

.PHONY: all build upload monitor run clean compiledb check web help

all: build ## Build firmware for target board

build: ## Compile firmware using PlatformIO
	pio run -e $(ENV)

upload: ## Flash firmware to connected Arduino Leonardo
	pio run -e $(ENV) -t upload

monitor: ## Open serial monitor at specified baud rate
	pio device monitor -b $(BAUD)

run: upload monitor ## Flash firmware and immediately open serial monitor

clean: ## Remove compiled artifacts
	pio run -e $(ENV) -t clean
	rm -rf .pio/build

compiledb: ## Generate compile_commands.json for IDEs and LSP
	pio run -t compiledb

check: ## Run PlatformIO static code analysis
	pio check

web: ## Serve the web flasher and documentation website locally
	@echo "Serving web app at http://localhost:8080 ..."
	@python3 -m http.server --directory web 8080

help: ## Display this help message
	@echo "RemoteStation Build and Deployment Utility"
	@echo ""
	@echo "Usage: make [target] [ENV=leonardo] [BAUD=9600]"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
