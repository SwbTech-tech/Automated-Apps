# Install-Dependencies.ps1
# PowerShell script to install project dependencies
# Usage: .\Install-Dependencies.ps1 -ProjectPath "C:\path\to\project" -Language "javascript"

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectPath,
    
    [Parameter(Mandatory=$true)]
    [string]$Language,
    
    [Parameter(Mandatory=$false)]
    [string]$Strategy = "recommended"
)

$ErrorActionPreference = "Stop"

# Colors for output
$Green = '\033[0;32m'
$Yellow = '\033[1;33m'
$Red = '\033[0;31m'
$NC = '\033[0m'

function Write-Success {
    param([string]$Message)
    Write-Host "${Green}✓${NC} $Message"
}

function Write-Warning {
    param([string]$Message)
    Write-Host "${Yellow}⚠${NC} $Message"
}

function Write-Error {
    param([string]$Message)
    Write-Host "${Red}✗${NC} $Message"
}

try {
    Write-Host "Installing dependencies for $Language project..."
    
    switch ($Language.ToLower()) {
        "javascript" {
            if (-not (Test-Path "$ProjectPath\package.json")) {
                throw "package.json not found in $ProjectPath"
            }
            
            Push-Location $ProjectPath
            
            if ($Strategy -eq "minimal") {
                Write-Host "Using minimal strategy..."
                npm ci --omit=dev
            } else {
                Write-Host "Using recommended strategy..."
                npm ci
            }
            
            Pop-Location
            Write-Success "JavaScript dependencies installed"
        }
        
        "python" {
            if (-not (Test-Path "$ProjectPath\requirements.txt")) {
                throw "requirements.txt not found in $ProjectPath"
            }
            
            Push-Location $ProjectPath
            
            python -m venv venv
            .\venv\Scripts\Activate.ps1
            pip install -r requirements.txt
            
            Pop-Location
            Write-Success "Python dependencies installed"
        }
        
        "csharp" {
            Push-Location $ProjectPath
            
            # Find .csproj or .sln file
            $projectFile = Get-ChildItem -Filter "*.csproj" -ErrorAction SilentlyContinue | Select-Object -First 1
            $slnFile = Get-ChildItem -Filter "*.sln" -ErrorAction SilentlyContinue | Select-Object -First 1
            
            if ($projectFile) {
                dotnet restore $projectFile.FullName
                Write-Success "C# dependencies installed"
            } elseif ($slnFile) {
                dotnet restore $slnFile.FullName
                Write-Success "C# dependencies installed"
            } else {
                throw "No .csproj or .sln file found"
            }
            
            Pop-Location
        }
        
        "java" {
            Push-Location $ProjectPath
            
            if (Test-Path "pom.xml") {
                mvn clean install
                Write-Success "Java dependencies installed"
            } elseif (Test-Path "build.gradle") {
                gradle build
                Write-Success "Java dependencies installed"
            } else {
                throw "No pom.xml or build.gradle found"
            }
            
            Pop-Location
        }
        
        default {
            throw "Unsupported language: $Language"
        }
    }
}
catch {
    Write-Error $_.Exception.Message
    exit 1
}
