import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./overrides.css";
import "./globals.css";
import { Provider } from "@/components/Provider";
import { Box } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prop List",
  description: "Find your place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Box m="6">{children}</Box>
        </Provider>
      </body>
    </html>
  );
}
