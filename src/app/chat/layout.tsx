import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "../globals.css";
import AppLayout from "@/layouts/AppLayout";
import theme from "../theme";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "Schema Creator AI - Manage",
  description: "Manage your schemas with ease",
};

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = (await cookies()).has("schema-creator-token");

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme}>
          <Nav />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
