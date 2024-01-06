import * as yup from 'yup';

const voucherFormSchema = yup.object().shape({
  action: yup
    .string()
    .required()
    .matches(/(Create|Update|Delete)/, { excludeEmptyString: false }),
  category: yup
    .string()
    .required()
    .matches(/(Delivery|Dine|Pandago|Pandamart|Pickup)/, {
      excludeEmptyString: false,
    }),
  description: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s'%$-]*$/,
      'Only alphabets, numbers, $, - and % are allowed',
    )
    .min(4, 'Description must contain at least 4 characters')
    .max(30, 'Description must be less than 30 characters')
    .required(),
  discount: yup
    .number()
    .min(5, 'Discount must be 5% and above')
    .lessThan(51, 'Discount must not exceed 50%')
    .integer('Only integers are allowed')
    .required('Please enter a number')
    .typeError('Please type in a number'),
  minSpending: yup
    .number()
    .min(0, 'Minimum spending must be $0 and above')
    .max(100, 'Minimum spending must not exceed $100')
    .required('Please enter a number')
    .typeError('Please type in a number'),
  promoCode: yup
    .string()
    .matches(
      /^[A-z0-9\b]+$/,
      'Promo code should not be empty or contain special characters',
    )
    .min(4, 'Enter at least 4 characters')
    .max(10, 'Promo code should not exceed 10 characters')
    .uppercase()
    .required(),
});

export default voucherFormSchema;
