"use client";
import { CreditCardIcon } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import PayOrder from "@/components/shared/orderCloseAction/PayOrder";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMask, IMaskInput } from "react-imask";

import { schema, FieldValues } from "./validationSchema";
import { useCart } from "@/providers/useCart";

const Page = () => {
  const { payOrder } = useCart();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => payOrder(data);

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

              <Controller
                name="creditCardNumber"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IMaskInput
                    type="text"
                    id="creditCardNumber"
                    mask={[
                      {
                        mask: "0000 000000 0000",
                        maxLength: 14,
                      },
                      {
                        mask: "0000 000000 00000",
                        maxLength: 15,
                      },
                      {
                        mask: "0000 0000 0000 0000",
                      },
                    ]}
                    className="rounded-md border-0 p-2 text-black outline-none"
                    {...{ onChange, onBlur, value }}
                  />
                )}
              />
              {errors.creditCardNumber && (
                <p className="text-red-500">
                  {errors.creditCardNumber.message}
                </p>
              )}
            </div>
            <div className="flex gap-4 max-sm:flex-col">
              <div className="mt-4 flex flex-col">
                <label htmlFor="creditCardExpiration">Validade (MM/AA)</label>

                <Controller
                  name="creditCardExpiration"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IMaskInput
                      type="text"
                      id="creditCardExpiration"
                      mask={[
                        {
                          mask: "MM/YY",
                          blocks: {
                            MM: {
                              mask: IMask.MaskedRange,
                              from: 1,
                              to: 12,
                            },
                            YY: {
                              mask: IMask.MaskedRange,
                              from: new Date().getFullYear() - 2000,
                              to: 99,
                            },
                          },
                        },
                      ]}
                      className="rounded-md border-0 p-2 text-black outline-none"
                      {...{ onChange, onBlur, value }}
                    />
                  )}
                />
                {errors.creditCardExpiration && (
                  <p className="text-red-500">
                    {errors.creditCardExpiration.message}
                  </p>
                )}
              </div>
              <div className="mt-4 flex flex-col">
                <label htmlFor="creditCardSecurityCode">
                  Código de segurança (CVV)
                </label>
                <Controller
                  name="creditCardSecurityCode"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IMaskInput
                      type="text"
                      id="creditCardSecurityCode"
                      mask={"0000"}
                      className="rounded-md border-0 p-2 text-black outline-none"
                      {...{ onChange, onBlur, value }}
                    />
                  )}
                />
                {errors.creditCardSecurityCode && (
                  <p className="text-red-500">
                    {errors.creditCardSecurityCode.message}
                  </p>
                )}
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

              <Controller
                name="document"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    type="text"
                    id="document"
                    mask={"000.000.000-00"}
                    className="rounded-md border-0 p-2 text-black outline-none"
                    {...field}
                  />
                )}
              />
              {errors.document && (
                <p className="text-red-500">{errors.document.message}</p>
              )}
            </div>

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
                    mask={"(00) 90000-0000"}
                    className="rounded-md border-0 p-2 text-black outline-none"
                    {...field}
                  />
                )}
              />

              {errors.mobile && (
                <p className="text-red-500">{errors.mobile.message}</p>
              )}
            </div>

            <PayOrder />
          </form>
        </section>
      </section>
    </>
  );
};

export default Page;
