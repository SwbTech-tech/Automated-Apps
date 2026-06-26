# Error Solutions Database

## Common Errors and Solutions

### JavaScript/Node.js

#### ERR_MODULE_NOT_FOUND
**Pattern**: `Cannot find module`
**Solution**: Run `npm install` to install missing dependencies
**Prevention**: Commit package-lock.json to version control

#### ERR_PORT_ALREADY_IN_USE
**Pattern**: `EADDRINUSE: address already in use`
**Solution**: Kill process using the port or use a different port
**Prevention**: Make port configurable via environment variables

### Python

#### ModuleNotFoundError
**Pattern**: `ModuleNotFoundError: No module named`
**Solution**: Install missing package with `pip install [package-name]`
**Prevention**: Keep requirements.txt updated

#### venv activation failed
**Pattern**: Script not found or activate failed
**Solution**: Recreate virtual environment with `python -m venv venv`
**Prevention**: Add venv to .gitignore

### C#

#### Build failed
**Pattern**: `error CS`
**Solution**: Check .csproj file and ensure all dependencies are restored
**Prevention**: Run `dotnet restore` before building

### Java

#### Maven dependency not found
**Pattern**: `Could not find artifact`
**Solution**: Update Maven settings or check internet connection
**Prevention**: Use Maven Central with proper proxy settings

### General

#### Permission Denied
**Pattern**: `EACCES: permission denied`
**Solution**: Fix file permissions or run with elevated privileges
**Prevention**: Ensure scripts have execute permissions

#### Network Connection Failed
**Pattern**: `ENOTFOUND` or `ECONNREFUSED`
**Solution**: Check internet connection and firewall settings
**Prevention**: Configure proxy settings if behind corporate firewall
