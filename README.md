<!--
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
-->

# Mood: Full-Stack Journal App

Mood is a full-stack journal app that allows the user to create journal entries, harnessing the power of AI for the analysis and enabling users to ask questions about their entries. The app also includes a sentiment graph to visualize the emotional tone of the entries.

> **Note**
> The app is mostly complete but may have some pending features yet to be displayed. Nevertheless, it is fully functional, offering a preview of the final product.

## Built With

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma and PlanetScale (Serverless SQL)
- **AI Integration:** OpenAI
- **Data Validation:** Zod
- **Charting:** Recharts

## Setup

- Start by installing dependencies, running `npm install` in the project directory.

### Install Clerk

```bash
npm i @clerk/nextjs
```

- Add Clerk secrets to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXX
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/journal
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
```

### PlanetScale Serverless SQL Database

1. Create a [PlanetScale Database](https://planetscale.com/)
2. Install [pscale CLI](https://github.com/planetscale/cli#installation)
3. Use the CLI to connect to the database: `pscale auth login`
4. Create a `dev` database branch: `pscale branch create mood dev`
5. Start the connection: `pscale connect mood dev --port 3309`

### Prisma ORM

1. Install Prisma Client: `npm i @prisma/client`
2. Install Prisma as dev dependency: `npm i prisma --save-dev`
3. Initialize Prisma: `npx prisma init`

### OpenAI API Account Setup

1. Create an [OpenAI](https://openai.com/) account
2. Select the `API` App
3. Create an [API Key](https://platform.openai.com/account/api-keys)
4. Copy-paste your API key into the `.env.local` file using the variable `OPENAI_API_KEY`

## Development

In order to start the project, please run `npm run dev` in the terminal. You should be able to see the app in `localhost:3000`.
