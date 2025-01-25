import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import Providers from "./providers";
import { api, HydrateClient } from "@/trpc/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { env } from "@/env";
import generateMetadata from "@/lib/generate-metadata";

export const metadata = generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  void api.seminar.getList.prefetch();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {env.REACT_SCAN && (
          <script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        )}
        {/* rest of your scripts go under */}
      </head>
      <body>
        <Providers>
          <TRPCReactProvider>
            <NuqsAdapter>
              <HydrateClient>{children}</HydrateClient>
            </NuqsAdapter>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
