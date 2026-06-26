#!/bin/bash
# install-dependencies.sh
# Bash script to install project dependencies
# Usage: ./install-dependencies.sh -p /path/to/project -l javascript

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Parse arguments
while getopts "p:l:s:" opt; do
    case $opt in
        p) PROJECT_PATH="$OPTARG" ;;
        l) LANGUAGE="$OPTARG" ;;
        s) STRATEGY="$OPTARG" ;;
    esac
done

STRATEGY=${STRATEGY:-"recommended"}

if [ -z "$PROJECT_PATH" ] || [ -z "$LANGUAGE" ]; then
    echo -e "${RED}✗${NC} Usage: $0 -p /path/to/project -l language [-s strategy]"
    exit 1
fi

write_success() {
    echo -e "${GREEN}✓${NC} $1"
}

write_error() {
    echo -e "${RED}✗${NC} $1"
}

cd "$PROJECT_PATH"

case "${LANGUAGE,,}" in
    javascript)
        if [ ! -f "package.json" ]; then
            write_error "package.json not found"
            exit 1
        fi
        
        if [ "$STRATEGY" = "minimal" ]; then
            npm ci --omit=dev
        else
            npm ci
        fi
        write_success "JavaScript dependencies installed"
        ;;
    
    python)
        if [ ! -f "requirements.txt" ]; then
            write_error "requirements.txt not found"
            exit 1
        fi
        
        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        write_success "Python dependencies installed"
        ;;
    
    java)
        if [ -f "pom.xml" ]; then
            mvn clean install
        elif [ -f "build.gradle" ]; then
            gradle build
        else
            write_error "No pom.xml or build.gradle found"
            exit 1
        fi
        write_success "Java dependencies installed"
        ;;
    
    go)
        go mod download
        write_success "Go dependencies installed"
        ;;
    
    rust)
        cargo fetch
        write_success "Rust dependencies installed"
        ;;
    
    *)
        write_error "Unsupported language: $LANGUAGE"
        exit 1
        ;;
esac
