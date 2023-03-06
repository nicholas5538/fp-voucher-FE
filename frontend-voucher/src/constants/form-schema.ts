import * as yup from 'yup';

export const voucherFormSchema = yup.object().shape({
  action: yup
    .string()
    .required()
    .matches(/(Create|Update|Delete)/, { excludeEmptyString: false }),
});
