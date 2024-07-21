FROM python:3.11-slim AS install-step
WORKDIR /app

COPY . ./
RUN pip install poetry
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-interaction --no-ansi

FROM python:3.11-slim AS run-step

WORKDIR /app
COPY --from=install-step /app .

RUN pip install poetry
RUN poetry config virtualenvs.in-project true

EXPOSE 8000
CMD poetry run uvicorn --host 0.0.0.0 api.app:app