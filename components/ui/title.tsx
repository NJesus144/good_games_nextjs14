import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-4xl before:content-['-']">{children}</h1>;
};

export default Title;
