import ApolloClientProvider from "./Providers/ApolloClientProvider";
import "./globals.css";

export const metadata = {
  title: "Pokedex",
  description: "A website to showcase the use of the pokedex.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased bg-background text-white"}
      >
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </body>
    </html>
  );
}
