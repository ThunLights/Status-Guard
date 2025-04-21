# Contribution Guide

## Install dependencies

This repo uses bun as its package manager.

```console
bun install
```

## Prepare .env

Please write .env and .env.dev from .env.example.

## Pull Requests

If you send pull request, please pass the tests with the following commands.

```console
npm run ci
npm run lint
npm run check
```

## Useful tools

#### Formatter

```console
npm run format
```

#### Prisma Accelerate selfhost

```console
npm run database
cloudflared tunnel --url http://localhost:4000
```
