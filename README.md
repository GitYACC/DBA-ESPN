# READ
## Important

When cloning, a template `.env` will be provided. After setting your respective custom environment variables, you **should** uncomment the `.env.local` and `.env` in the `.gitignore` before publishing or pushing to any future git repositories

Once you have set your Prisma PostgreSQL url to your desired database, you can run `npx prisma db pull` to pull your database, then run `npx prisma generate` to set up your Prisma Client

