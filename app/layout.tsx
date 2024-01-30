import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <ToastContainer
          position="top-center"
          theme={"dark"}
          bodyStyle={{ width: "400px" }}
          autoClose={4000}
          closeOnClick
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
