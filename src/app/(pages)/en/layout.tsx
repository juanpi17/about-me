import { TranslateProvider } from "@/context/translateContext";

export default async function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <TranslateProvider selectedLanguage="en">
        {children}
    </TranslateProvider>
  );
}
