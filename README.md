# Foodpanda Capstone

## Topic

Voucher

- The food delivery process consists of users picking their meals, collecting the order into a basket and then confirming payment during the checkout process.
- Build a system that that implements Voucher functionality. The company needs to be able to create, manage vouchers (amounts, %-ages, expiry dates); and to distribute them to our users.
- Further, we also need to enable the user to later apply the voucher during the checkout process.

## Frontend

Design draft: [Figma link](https://www.figma.com/file/LH7wvGmxsn1LUdAqaVOHKS/Capstone-draft-1?node-id=0%3A1&t=UiYe1Bpx3OwKiPp0-1 "Figma Capstone draft")

<h4>To start vite build</h4>

```
cd frontend-voucher
yarn install 👉 Install all dependencies

yarn dev 👉 Development
yarn build 👉 Production
yarn preview 👉 Preview
```

## Backend

**_ TBC _**

### Version 1

Admin-only access:

1. CRUD - Voucher

Customer access:

1. Read, Delete - Voucher
2. Voucher Type (Pick-up / Delivery)

Additional feature(s):

1. Map

   [Google Maps Platform](https://www.figma.com/file/LH7wvGmxsn1LUdAqaVOHKS/Capstone-draft-1?node-id=0%3A1&t=UiYe1Bpx3OwKiPp0-1 "Google Maps Platform URL") OR [mapbox](https://www.mapbox.com "mapbox URL")

Flow of our project

1. Home page (Regardless of login status)
2. Login page (Google / Apple / Facebook login, forget password, create new account)
3. Main page (Restaurant)

   Redirect to login page if user is not logged in

4. Restaurant Page (Selected)
5. Checkout Page (Cart)

### Version 2

Additional features if time permits:

1. Separate pages for admin and customer
2. Fintech Payment
3. Map (Redirect to restaurant with markers)

### GitHub workflow

2 important branches:

1. main branch :point_right: Production

   Only **merge** to **_main branch_** when a full prototype is functional in the **_deploy branch_**.

2. deploy branch :point_right: Deployment

   Only **rebase** to **_deploy branch_** when a feature has been completed.

- Always create a new branch when implementing a new feature

```
git checkout -b <branch name> 👉 If the branch doesn't exist
git switch <branch name> 👉 If the branch exists
```

- Commit with a short message and detailed description

```
Always commit with small changes, not with large changes
git commit -m "short message" -m "detailed description"
```

- Create a new pull request when a feature is completed

  Do it via GitHub desktop website, submit a pull request for everyone to review
