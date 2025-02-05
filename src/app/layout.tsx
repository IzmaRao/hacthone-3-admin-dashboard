import "./globals.css";
import React, { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Furnisful</title>
        </head>
        <body>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
