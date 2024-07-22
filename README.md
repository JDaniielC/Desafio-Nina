# Desafio Super NINA - Fullstack

## How to run with Docker

From the root of the project, run:

```sh
docker-compose up --build
```

The frontend will be available at `http://localhost` and Api `http://localhost/api/`.

See details in the README.md files in the `front` and `back` directories.

## Error handling

If you get the following error:

```sh
exec ./entrypoint.sh: no such file or directory
```

You need to change the line endings of the `entrypoint.sh` file to LF.
And then run the command again.
