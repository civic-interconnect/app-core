"""
app_core.__main__

Entrypoint for running the CLI with:

py -m app_core
python -m app_core
python3 -m app_core

Usage depends on your operating system and Python installation.
"""

from app_core.cli.cli import app

if __name__ == "__main__":
    app()
