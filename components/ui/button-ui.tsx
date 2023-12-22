import React from "react";
import { Button } from "@nextui-org/react";

interface Props {
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  children: React.ReactNode;
  otherStyle?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}

export default function ButtonUi({
  variant,
  children,
  otherStyle,
  color,
}: Props) {
  return (
    <Button variant={variant} color={color} className={`uppercase text-white rounded-md ${otherStyle}`}>
      {children}
    </Button>
  );
}
