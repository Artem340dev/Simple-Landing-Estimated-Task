'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import clsx from "clsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = ({ 
  children 
}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html className="bg-backgroundColor" lang="en">
      <body
        className={clsx(
          'bg-backgroundColor',
          'antialiased'
        )}
      >
        <NextUIProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}

export default RootLayout;