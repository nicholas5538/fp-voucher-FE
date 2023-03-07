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
    .when('startDate', (startDate: any, schema) => {
      if (startDate) {
        const dayAfter = new Date(startDate.getTime() + 86400000);
        return schema.min(dayAfter, 'End date has to be later than start date');
      }
      return schema;
    })
    .required(),
});
