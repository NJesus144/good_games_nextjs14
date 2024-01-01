import {
  isValidCPF,
  isValidPhone,
} from "@brazilian-utils/brazilian-utils";

import * as yup from "yup";

export const schema = yup
  .object({
    fullName: yup
      .string()
      .required("O nome é obrigatório.")
      .min(3, "O nome deve ser completo.")
      .matches(/(\w.+\s).+/gi, "O nome deve conter o sobrenome."),
    mobile: yup
      .string()
      .required("O celular é obrigatório.")
      .transform((value) => value.replace(/[^\d]/g, ""))
      .test("validateMobile", "O celular inválido.", (value) =>
        isValidPhone(value)
      ),
    document: yup
      .string()
      .required('O CPF é obrigatório.')
      .transform(value => value.replace(/[^\d]/g, ''))
      .test(
        'validateDocument',
        'O CPF é inválido.',
        value => isValidCPF(value)
      ),
  })
  .required();
export type FieldValues = yup.InferType<typeof schema>;
