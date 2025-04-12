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

### Prepare Database

Database supports two types.

**if you use cf workers, you must use prisma accelerate.**

#### Normal Postgresql

Please put the url of postgresql in .env's DATABASE_URL and DIRECT_URL.

Then edit .env as follows.

```env
OPTION_ACCELERATE="no_use"
```

#### Prisma Accelerate

Click [here](https://www.prisma.io/accelerate) to register for prisma accelerate.

Please put the url of prisma accelerate in .env's DATABASE_URL and DIRECT_URL.

> caution: You will have to pay for the prisma accelerate because it will exceed the free quota of the prisma accelerate.

### Migration

```
npm run db:migration
```

## For normal

```console
npm run build
npm start
```

## For cloudflare workers

Please write `ADAPTER_TYPE=cf` in .env

```
npm run build:cf
npx wrangler deploy
```

This alone will not work, so use [trigger.dev](https://trigger.dev).

And login from cli.

```
npx trigger.dev login
```

Please write .trigger.json with reference to .trigger.example.json.

```
npm run trigger
```

# Contributing

We Welcome contributions.

Please see [CONTRIBUTING.md](CONTRIBUTING.md)

# Security

Please see [SECURITY.md](SECURITY.md)
