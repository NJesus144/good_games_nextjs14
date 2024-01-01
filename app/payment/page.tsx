"use client";
import { CreditCardIcon } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import PayOrder from "@/components/shared/orderCloseAction/PayOrder";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter no mínimo 5 caracteres"),
    mobile: yup.string().required(),
  })
  .required();
type FieldValues = yup.InferType<typeof schema>;

const Page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) =>
    console.log("data", data);

  return (
    <>
      <section className="flex min-h-screen w-full  flex-col  items-center bg-[#202020] pt-12  ">
        <div className="flex w-full items-center justify-center gap-4 bg-[#000] p-4 text-2xl uppercase text-white">
          <CreditCardIcon size={30} />
          Credit Card
        </div>
        <section className="mx-auto flex max-w-7xl flex-col gap-4   p-12 pb-20 text-white max-sm:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-xl font-bold">Dados do Titular do cartão</h4>

            <div className="mt-4 flex flex-col">
              <label htmlFor="creditCardNumber">Número do cartão</label>
              <Input
                type="text"
                id="creditCardNumber"
                name="creditCardNumber"
                className="p-2 text-black"
              />
            </div>
            <div className="flex gap-4 max-sm:flex-col">
              <div className="mt-4 flex flex-col">
                <label htmlFor="creditCardExpiration">Validade (MM/AA)</label>
                <Input
                  type="text"
                  id="creditCardExpiration"
                  name="creditCardExpiration"
                  className="p-2 text-black"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label htmlFor="creditCardSecurityCode">
                  Código de segurança (CVV)
                </label>
                <Input
                  type="text"
                  id="creditCardSecurityCode"
                  name="creditCardSecurityCode"
                  className="p-2 text-black"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col">
              <label htmlFor="full-name">Nome completo</label>

              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="fullName"
                    className="p-2 text-black"
                    autoComplete="name"
                    {...field}
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="mt-4 flex flex-col">
              <label htmlFor="full-name">CPF</label>
              <Input
                type="text"
                id="document"
                className="p-2 text-black"
                autoComplete="document"
              />
            </div>
            <div className="flex gap-4 max-sm:flex-col">
              <div className="mt-4 flex flex-col">
                <label htmlFor="mobile">Telefone</label>

                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    // <Input type="text" id="mobile" className="p-2 text-black" autoComplete="phone" {...field}/>
                    <IMaskInput
                      type="tel"
                      id="mobile"
                      autoComplete="phone"
                      mask={"(00) 00000-0000"}
                      className="rounded-md border-0 p-2 text-black outline-none"
                      {...field}
                    />
                  )}
                />

                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile.message}</p>
                )}
              </div>
              <div className="mt-4 flex flex-col">
                <label htmlFor="dateofbirth">Data de nascimento</label>
                <Input
                  type="text"
                  id="dateofbirth"
                  name="dateofbirth"
                  className="p-2 text-black"
                />
              </div>
            </div>
            <PayOrder />
          </form>
        </section>
      </section>
    </>
  );
};

export default Page;
