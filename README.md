# Passkey Demo

## To migrate the database

Generate the migrations

```bash
DATABASE_URL="postgres://..." npx @better-auth/cli@latest generate --config './src/lib/auth/index.ts'
```

Migrate the database

```bash
DATABASE_URL="postgres://..." npx @better-auth/cli@latest migrate --config './src/lib/auth/index.ts'
```
