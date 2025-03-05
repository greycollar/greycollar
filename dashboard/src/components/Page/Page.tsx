import PageHelmet from "./PageHelmet";
import { Stack } from "@mui/material";

function Page({ name, links, children }: { name: string; links?: any; children?: any }) {
  return (
    <Stack margin={2}>
      <PageHelmet name={name} links={links} />
      {children}
    </Stack>
  );
}

export default Page;
