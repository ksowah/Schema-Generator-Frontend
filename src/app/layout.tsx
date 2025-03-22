import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import theme from "./theme";
import "./globals.css";
import ApolloProvider from "@/apollo";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Schema Creator AI",
  description: "Generate your schemas with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased text-gray-700">
        <MantineProvider theme={theme}>
          <ApolloProvider>
            <ToastContainer />
            {children}
          </ApolloProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
