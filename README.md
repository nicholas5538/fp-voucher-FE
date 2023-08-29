# 🏷️ [FP capstone project](https://fp-voucher-portal.onrender.com 'Production website')

## Table Of Contents

- [Context](#context)
- [Getting Started](#getting-started)
  - [Environment Setup](#environment-setup)
  - [Repository Setup](#repository-setup)
- [Developing](#developing)
  - [Frequently Used Scripts](#frequently-used-scripts)
- [Additional Documentations](#additional-documentations)

## Context

_**NOTE**_: Google Oauth2 does not work well with the current 3rd party React library, hence you might need to log in twice to use the app.

We decided to create an admin portal that allows user to use the following features with relative ease.

1. A data table that displays all the vouchers
2. _**Create**_ new voucher for the system
3. _**Update**_ any existing vouchers
4. _**Delete**_ any existing vouchers
5. A dummy checkout page to show that the vouchers can be applied

- [MongoDB](https://www.mongodb.com/ 'MongoDB official site') is currently our choice of database and we are calling REST API endpoints to perform CRUD operations on it.
- Click here to access the backend repository (Created by [@nicholas5538](https://github.com/nicholas5538)), built with `Node.js`, `TypeScript` and `mongoose`.

  > Backend repository is currently private as proper documentation of the API endpoints is not completed.
  

## Getting Started

### Environment Setup

- Add a new SSH key to your GitHub account. [Instructions to how to generate](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account 'Generate SSH key').

#### 2 ways to run the apps
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. With package manager **[pnpm](https://pnpm.io/installation)**

   - Install any version of node that is >= 14.0.0.
   
    >    💁 **Tip:** You can use [nvm](https://github.com/nvm-sh/nvm 'nvm repo') to easily manage multiple versions of node. Once installed, run `nvm use` in the project directory.

   - Install [pnpm](https://pnpm.io/installation)

    >    💁 `npm install -g pnpm`

### Repository Setup


Once you have your SSH key added and environment setup, you can clone the repository.

```zsh
git clone git@github.com:nicholas5538/fp-capstone.git
cd fp-capstone
```

## Developing

Once you have [set up the repo](#repository-setup), you're ready to start developing. Starting the development environment is managed by the following command(s).

- With **Docker (recommended)**
```sh
# You can either pull the image from Docker Hub or build your own image
docker pull -q nicholas5538/fp-voucher-fe-dev:latest
docker build --compress -t <image name> --target dev .
# For Windows PowerShell: ${pwd}, MacOS: $(pwd)
docker run -d -p 3000:3000 -v $(pwd):/home/node/app --name <container name> fp-voucher-fe-dev
```


- With **pnpm**

```sh
pnpm run i # Only run this when you have not installed any dependencies
pnpm run dev
```

The `dev` command will start the application in your local environment (port 5173).

### Frequently Used Scripts

In addition to the `dev` command, there are other scripts available in the package.json. Some of the most common you might get to use are:

- `pnpm run format` - Check prettier formatting through all the codes

  > 💁 **Tip:** use `pnpm run format:fix` to run auto prettier formatting across all the codes

- `pnpm run lint` - Runs TS linter through all the codes

## Additional Documentations

- [Docker documentation](https://docs.docker.com/, 'Docker documentation')
- [Framer Motion](https://www.framer.com/motion/ 'Framer Motion animation')
- [Material-UI](https://mui.com/ 'MUI documentation')
- [People API](https://developers.google.com/people 'People API documentation')
- [React Hook Form](https://react-hook-form.com/get-started/ 'React Hook Form documentation')
- [styled components](https://styled-components.com/docs 'styled-components documentation')
- [Tailwind CSS](https://tailwindcss.com/docs/installation 'Tailwindcss styling documentation')
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview 'TanStack Query documentation')
- [Vite](https://vitejs.dev/guide/ 'Vite documentation')
