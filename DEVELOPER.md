# DEVELOPER.md

## Setup

First, fork the repo. Git clone your repo to your machine. Open project repo in VS Code.
Open a terminal (commands are for PowerShell).

```powershell
git clone https://github.com/civic-interconnect/app-core.git
cd app-core
py -m venv .venv
.\.venv\Scripts\activate
py src\setup\init_venv.py
app-core prep-code
app-core serve-app
```

or serve with:

```powershell
cd docs
py -m http.server 8000
```

Visit: <http://localhost:8000>

## Releasing New Version

After verifying changes:

```powershell
app-core bump-version 1.0.4 0.0.1
app-core release
```

## Test Web App Locally

```powershell
cd docs
py -m http.server 8000
```

Visit: <http://localhost:8000>
