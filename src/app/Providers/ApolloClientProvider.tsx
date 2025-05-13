"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/libs/ApolloClient";
import React from "react";

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}