# Error Solutions Database Schema

## Error Entry Format

```json
{
  "id": "err_001",
  "errorCode": "ERR_MODULE_NOT_FOUND",
  "patterns": [
    "Cannot find module",
    "ModuleNotFoundError",
    "No such file or directory"
  ],
  "language": "javascript",
  "category": "dependency",
  "severity": "error",
  "message": "A required module cannot be found",
  "solutions": [
    {
      "step": 1,
      "title": "Install Missing Package",
      "command": "npm install [package-name]",
      "description": "Install the missing package using npm"
    },
    {
      "step": 2,
      "title": "Clear Node Modules",
      "command": "rm -rf node_modules && npm install",
      "description": "Clear node_modules and reinstall all dependencies"
    }
  ],
  "preventionTips": [
    "Always commit package-lock.json to version control",
    "Use npm ci instead of npm install in CI/CD",
    "Regularly update dependencies"
  ],
  "relatedDocumentation": [
    "https://docs.npmjs.com/cli/install",
    "https://docs.npmjs.com/cli/ci"
  ]
}
```

## Categories

- `dependency` - Missing or broken dependencies
- `syntax` - Code syntax errors
- `runtime` - Runtime execution errors
- `build` - Build system errors
- `environment` - Environment configuration issues
- `network` - Network-related errors
- `permission` - Permission/access errors
- `unknown` - Uncategorized errors

## Severity Levels

- `info` - Informational message
- `warning` - Non-critical issue
- `error` - Critical issue preventing build
- `critical` - System-level critical error
