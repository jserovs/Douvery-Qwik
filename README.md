# README

![logo](https://res.cloudinary.com/dul3tpj2d/image/upload/v1675632563/dou/douvery_dpopvl.png)

## Introduction

Welcome to Douvery, a project focused on the sales environment for all audiences. This project is under development and is expected to launch soon.

## Development Progress

- The web application and server are in their final stages of development.
- The web project was already in operation, but I decided to switch to QWIK because of its speed and my enthusiasm for its technology.

## Douvery Pages

Explore our various pages designed to enhance your shopping experience:

- [Home](https://douvery-qwik.vercel.app/).
- [Login](https://douvery-qwik.vercel.app/a/login/?rr=/v/AirPods-Pro/D589022/).
- [Product details](https://douvery-qwik.vercel.app/v/AirPods-Pro/D589022/).
- [Store in Douvery](https://douvery-qwik.vercel.app/Douvery/STORE-3465460B-51D47297-87C20FED/products-all/).
- [Douvery search page](https://douvery-qwik.vercel.app/s/?q=appl&or-c=all).
- [Douvery profile page](https://douvery-qwik.vercel.app/a/user/profile/Germys/).

## Features

- Focus on user comfort and security while navigating our services.
- Wide variety of products for all audiences.
- Intuitive and easy-to-use interface.
- Secure and hassle-free purchase process.

## Available Positions for Collaboration

We are looking for individuals interested in collaborating in the following areas:

- Assistance and support in responsive web design.
- Help with SEO and website optimization.
- Aid in the reorganization of colors and platform functions.
- Collaboration in backend development and maintenance.

If you are interested in collaborating in any of these areas, feel free to contact me via email or send a message through GitHub. Together, we can improve the online shopping experience for all users.

## ❤️❤️❤️ Qwik | Builder.io

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
