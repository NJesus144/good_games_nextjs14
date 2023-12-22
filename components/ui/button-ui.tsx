import React from "react";
import { Button } from "@nextui-org/react";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
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
  isLoading,
  onClick
}: Props) {
  return (
    <Button
      variant={variant}
      color={color}
      isLoading={isLoading}
      className={`rounded-md uppercase text-white ${otherStyle}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
