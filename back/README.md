# Backend

## Description

This is the backend of the project.

## How to run locally

0. Set the environment variables
```bash
  cp .env.example .env 
```

1. Install the environment
```bash
python -m venv venv
```

On Windows, run:
```bash
env\Scripts\activate
```

On Linux, run:
```bash
source venv/bin/activate
```

2. Install the dependencies
```bash
pip install poetry
poetry install
```

3. Run migrations creating the database and tables in the database (SQLite)
```bash
task migrate
```

4. Run the application
```bash
task run
```

5. Run the tests
```bash
task test
```
