#!/bin/bash
# mkdir -p prisma/migrations/init
# npx prisma migrate diff --preview-feature --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/init/migration.sql
# npx prisma migrate resolve --applied init
# npx prisma migrate dev --name init && npm run start
npx prisma migrate deploy
npx prisma db seed
npm run start
export seeded=success
