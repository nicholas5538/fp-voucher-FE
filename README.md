# 🏷️ [FP capstone project](https://fp-capstone-voucher-78842.web.app/ 'Production website')

## Table Of Contents

- [Context](#context)
- [Quick Links](#quick-link)
- [Getting Started](#getting-started)
  - [Environment Setup](#environment-setup)
  - [Repository Setup](#repository-setup)
- [Developing](#developing)
  - [Frequently Used Scripts](#frequently-used-scripts)
- [Additional Documentations](#additional-documentations)

## Context

We decided to create an admin portal that allows user to use the following features with relative ease.

1. A data table that displays all the vouchers
2. **Create** new voucher for the system
3. **Update** any existing vouchers
4. **Delete** any existing vouchers
5. A dummy checkout page to show that the vouchers can be applied

We will be using google sheets as the 'database' and use REST API to perform CRUD operations on it. This is achieved with [SheetDB](https://sheetdb.io/ 'SheetDB documentation').

## Quick Link

- [Production Deployment](https://fp-capstone-voucher-78842.web.app/ 'Production deployment URL')

  > Any changes that are merged / pushed to the `main` branch, will be deployed to **_Production_**.

## Getting Started

### Environment Setup

- Add a new SSH key to your GitHub account. [Instructions to how to generate](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account 'Generate SSH key').

- Install any version of node that is >= 14.0.0.

  > 💁 **Tip:** You can use [nvm](https://github.com/nvm-sh/nvm 'nvm repo') to easily manage multiple versions of node. Once installed, run `nvm use` in the project directory.

- Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (We're currently using yarn [v3.5.0](https://github.com/nicholas5538/fp-capstone/blob/main/.yarn/releases/yarn-3.5.0.cjs) for this project)

  > 💁 `npm install --global yarn`

### Repository Setup

Once you have your SSH key added and environment setup, you can clone the repository and install the dependencies.

```zsh
git clone git@github.com:nicholas5538/fp-capstone.git
cd fp-capstone
yarn install
```

Once the dependencies have been installed, you are required create a `.env` file **on the root folder** and insert the following codes.
**_TAKE NOTE: please request for tokens either from [@nicholas5538](https://github.com/nicholas5538 'nicholas5538 profile') or [@Rychua002](https://github.com/Rychua002 'Rychua002 profile')._**

```
VITE_SHEET_DB_ID=<insert voucher sheet token here>
VITE_SHEET_DB_TOKEN=<insert voucher sheet bearer token here>
VITE_SHEET_ARCHIVE_ID=<insert archive sheet token here>
VITE_SHEET_ARCHIVE_TOKEN=<insert archive sheet api bearer token here>
```

## Developing

Once you have [set up the repo](#repository-setup), you're ready to start developing. Starting the development environment is managed by the following command.

```sh
yarn dev
```

The `dev` command will start the application in your local environment (port 5173).

### Frequently Used Scripts

In addition to the `dev` command, there are other scripts available in the package.json. Some of the most common you might get to use are:

- `yarn format` - Check prettier formatting through all the codes

  > 💁 **Tip:** use `yarn format:fix` to run auto prettier formatting across all the codes

- `yarn lint` - Runs TS linter through all the codes

## Additional Documentations

- [Vite](https://vitejs.dev/guide/ 'Vite documentation')
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview 'TanStack Query documentation')
- [React Hook Form](https://react-hook-form.com/get-started/ 'React Hook Form documentation')
- [Material-UI](https://mui.com/ 'MUI documentation')
- [styled-components](https://styled-components.com/docs 'styled-components documentation')
- [Tailwindcss](https://tailwindcss.com/docs/installation 'Tailwindcss styling documentation')
- [Framer Motion](https://www.framer.com/motion/ 'Framer Motion animation')
- [People API](https://developers.google.com/people 'People API documentation')
- [SheetDB API](https://sheetdb.io/ 'SheetDB documentation')
