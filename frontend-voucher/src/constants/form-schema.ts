import * as yup from 'yup';

const voucherFormSchema = yup.object().shape({
  action: yup
    .string()
    .required()
    .matches(/(Create|Update|Delete)/, { excludeEmptyString: false }),
  category: yup
    .string()
    .required()
    .matches(/(Delivery|Dine-in|Pandago|Pandamart|Pick-up)/, {
      excludeEmptyString: false,
    }),
  description: yup
    .string()
    .min(4, 'Description must contain at least 4 characters')
    .max(30, 'Description must be less than 30 characters')
    .required(),
  discount: yup
    .number()
    .min(5, 'Discount must be 5% and above')
    .required('Please enter a number')
    .typeError('Please type in a number'),
  minSpending: yup
    .number()
    .min(0, 'Minimum spending must be $0 and above')
    .required('Please enter a number')
    .typeError('Please type in a number'),
  promoCode: yup
    .string()
    .matches(
      /^[A-z0-9\b]+$/,
      'Promo code should not be empty or contain special characters'
    )
    .min(4, 'Enter at least 4 characters')
    .max(10, 'Promo code should not exceed 10 characters')
    .uppercase()
    .required(),
  startDate: yup.date().required(),
  expiryDate: yup
    .date()
    .min(yup.ref('startDate'), "Expiry Date can't be before the starting date")
    .required(),
});

export default voucherFormSchema;
