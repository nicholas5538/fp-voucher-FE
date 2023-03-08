import * as yup from 'yup';

export type voucherFormValues = {
  action: string;
  category: string;
};

export const voucherFormSchema = yup.object().shape({
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
  startDate: yup.date().required(),
  expiryDate: yup
    .date()
    .min(yup.ref('startDate'), "Expiry Date can't be before the starting date")
    .required(),
});
