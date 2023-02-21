# Foodpanda Capstone

## Topic
Voucher
* The food delivery process consists of users picking their meals, collecting the order into a basket and then confirming payment during the checkout process.
* Build a system that that implements Voucher functionality. The company needs to be able to create, manage vouchers (amounts, %-ages, expiry dates); and to distribute them to our users.
* Further, we also need to enable the user to later apply the voucher during the checkout process.

### Frontend
Design draft: [Figma link](https://www.figma.com/file/LH7wvGmxsn1LUdAqaVOHKS/Capstone-draft-1?node-id=0%3A1&t=UiYe1Bpx3OwKiPp0-1 "Figma Capstone draft")

#### Test scripts that are used:
```
npm run dev 👉 Development
```

### Backend
**_ TBC _**

### Version 1
Admin-only access: 
- CRUD - Voucher

Customer access:
1. Read, Delete - Voucher
2. Voucher Type (Pick-up / Delivery)

Additional feature(s):

Flow of our project
1. A page for admins to perform create, read, update or delete vouchers
2. Dummy checkout page (visible to both admin and customer)
> Just to show that voucher can be selected and applied from the customer perspective
> Might want to add filtering either on the frontend or backend side

### Version 2
Additional features if time permits:
- Separate pages for admin and customer
