import { TranslateProvider } from "@/context/translateContext";

export default async function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <TranslateProvider selectedLanguage="es">
      {children}
    </TranslateProvider>
  );
}
