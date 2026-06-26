# Language Detection Configuration

This configuration defines how the application detects programming languages in a project.

## Detection Priority

1. **File Extensions** (Weight: 50%)
   - Scans for language-specific file extensions
   - Examples: .js, .py, .cs, .java

2. **Configuration Files** (Weight: 75%)
   - Looks for language-specific config files
   - Examples: package.json, requirements.txt, pom.xml

3. **Content Analysis** (Weight: 90%)
   - Analyzes file content for language keywords
   - Most reliable but slower

## Confidence Thresholds

- **High Confidence**: 80-100%
- **Medium Confidence**: 50-79%
- **Low Confidence**: 0-49%

Only languages with at least 30% confidence are reported.

## Supported Languages

- C#
- JavaScript/TypeScript
- Python
- Java
- C++
- Go
- Rust
- More coming soon...
