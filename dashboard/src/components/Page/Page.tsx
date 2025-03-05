import PageHelmet from "./PageHelmet";
import { ReactNode } from "react";
import { Stack } from "@mui/material";

function Page({
  name,
  links,
  children,
}: {
  name: string;
  links?: Array<{ name: string; href: string }>;
  children?: ReactNode;
}) {
  return (
    <Stack margin={2}>
      <PageHelmet name={name} links={links} />
      {children}
    </Stack>
  );
}

export default Page;
