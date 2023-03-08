# README

![logo](https://res.cloudinary.com/dul3tpj2d/image/upload/v1675632563/dou/douvery_dpopvl.png)

## Introduction

Welcome to Douvery, a project focused on the sales environment for all audiences. This project is under development and is expected to launch soon.

## Development Progress

- The web application and server are in their final stages of development.
- The web project was already in operation, but I decided to switch to QWIK because of its speed and my enthusiasm for its technology.

## Features

- Focus on user comfort and security while navigating our services.
- Wide variety of products for all audiences.
- Intuitive and easy-to-use interface.
- Secure and hassle-free purchase process.

## How to Collaborate

If you are interested in collaborating on this project, you can contact me via email or send a message through GitHub. Together, we can improve the online shopping experience for all users.

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `npm run build.server` and `npm run build.client`:

```shell
npm run build
```

[Read the full guide here](https://github.com/BuilderIO/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
npm run deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.
