<p algin="center" height="30vh">
    <img src="./static/favicon.ico"/>
</p>

<p algin="center">
</p>

# Status Guard

This is an anti-ddos script created by crossing the cloudflare api and status page.

# How to Use

> git, nodejs, npm must be installed in advance.

### Clone this repo

```console
git clone https://github.com/ThunLights/Status-Guard.git
```

### Install libs

`npm install` or `bun install`

### Set environment variables

Please write .env with reference to .env.example.

### Database

### Prisma Accelerate

Click [here](https://www.prisma.io/accelerate) to register for prisma accelerate.

Please put the url of prisma accelerate in .env's DATABASE_URL.

### Caution

You will have to pay for the prisma accelerate because it will exceed the free quota of the prisma accelerate.

If you would like to set up a database for free, please click [here](./CONTRIBUTING.md#prisma-accelerate-selfhost).

### Migration

```console
npm run db:migration
```

## For normal

```console
npm run build
npm start
```

## For cloudflare workers

Please write `ADAPTER_TYPE=cf` in .env

```console
npm run build:cf
npx wrangler deploy
```

This alone will not work, so use [trigger.dev](https://trigger.dev).

And login from cli.

```console
npx trigger.dev login
```

Please write .trigger.json with reference to .trigger.example.json.

```console
npm run trigger
```

# Contributing

We Welcome contributions.

Please see [CONTRIBUTING.md](CONTRIBUTING.md)

# Security

Please see [SECURITY.md](SECURITY.md)
